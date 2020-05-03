const repository = require('./repository');
const { validator } = require('../../helpers');

module.exports = async (pk, data) => {
  const postData = {
    title: data.title,
    body: data.body,
    updated: new Date(),
  };
  Object.keys(postData).forEach((key) => postData[key] === undefined && delete postData[key]);

  const rules = [{
    test: (rule) => !!(rule.title !== '' && rule.title !== null),
    message: 'titleEmpty',
  }, {
    test: (rule) => !!(rule.body !== '' && rule.body !== null),
    message: 'bodyEmpty',
  }];

  const validate = validator.validate(postData, rules);

  if (!validate.success) {
    return {
      success: false,
      message: validate.message,
      data: null,
    };
  }

  const update = await repository.update(pk, postData);

  if (update) {
    return {
      success: true,
      message: 'updated',
      data: null,
    };
  }


  return {
    success: false,
    message: 'updateFailed',
    data: null,
  };
};
