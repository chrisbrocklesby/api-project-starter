const repository = require('./repository');
const { validator, uuid } = require('../../helpers');

module.exports = {
  async create(data) {
    const post = {
      pk: data.pk || uuid(),
      title: data.title,
      body: data.body,
      created: new Date(),
    };

    const rules = [{
      test: (rule) => rule.pk && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/.test(rule.pk),
      message: 'pkFormat',
    }, {
      test: (rule) => !!rule.title,
      message: 'titleRequired',
    }, {
      test: (rule) => !!rule.body,
      message: 'bodyRequired',
    }];

    const validate = validator.validate(post, rules);

    if (!validate.isValid) {
      return {
        success: false,
        message: validate.errors,
        data: null,
      };
    }

    const create = repository.insert(post);

    if (create) {
      return {
        success: true,
        message: 'postCreated',
        data: null,
      };
    }

    return {
      success: false,
      message: 'postFailed',
      data: null,
    };
  },
};
