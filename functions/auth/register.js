const repository = require('./repository');
const { bcrypt, validator, uuid } = require('../../helpers');

module.exports = async (data) => {
  const userData = {
    pk: data.pk || uuid(),
    email: data.email || null,
    password: data.password || null,
    role: 1,
    created: new Date(),
  };

  const rules = [{
    test: (rule) => rule.pk && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/.test(rule.pk),
    message: 'pkFormat',
  }, {
    test: (rule) => rule.email && /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(rule.email),
    message: 'emailInvalid',
  }, {
    test: (rule) => !!rule.email,
    message: 'emailRequired',
  }, {
    test: (rule) => !!rule.password,
    message: 'passwordRequired',
  }, {
    test: (rule) => rule.password && /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/.test(rule.password),
    message: 'passwordFormat',
  }];

  const validate = validator.validate(userData, rules);

  if (!validate.success) {
    return {
      success: false,
      message: validate.message,
      data: null,
    };
  }

  const userCheck = await repository.queryByEmail(userData.email);
  if (userCheck) {
    return {
      success: false,
      message: 'userExists',
      data: null,
    };
  }

  userData.password = await bcrypt.hash(userData.password, 10);

  const userRegister = await repository.insert(userData);

  if (userRegister) {
    return {
      success: true,
      message: 'registerSuccess',
      data: null,
    };
  }

  return {
    success: false,
    message: 'registerFailed',
    data: null,
  };
};
