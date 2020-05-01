const repository = require('./repository');
const { bcrypt, validator, uuid } = require('../../helpers');

module.exports = async (pk, email, password) => {
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

  const validate = validator.validate({ pk, email, password }, rules);

  if (!validate.isValid) {
    return {
      success: false,
      message: validate.errors,
      data: null,
    };
  }

  const user = await repository.queryByEmail(email);
  if (user) {
    return {
      success: false,
      message: 'userExists',
      data: null,
    };
  }

  const register = await repository.insert({
    pk: pk || uuid(),
    email,
    password: await bcrypt.hash(password, 10),
    role: 1,
    created: new Date(),
  });

  if (register) {
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
