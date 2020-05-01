const repository = require('./repository');
const { bcrypt, jwt, validator } = require('../../helpers');

module.exports = async (email, password) => {
  const rules = [{
    test: (rule) => rule.email && /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(rule.email),
    message: 'emailInvalid',
  }, {
    test: (rule) => !!rule.email,
    message: 'emailRequired',
  }, {
    test: (rule) => !!rule.password,
    message: 'passwordRequired',
  }];

  const validate = validator.validate({ email, password }, rules);

  if (!validate.isValid) {
    return {
      success: false,
      message: validate.errors,
      data: null,
    };
  }

  const user = await repository.queryByEmail(email);
  if (!user) {
    return {
      success: false,
      message: 'userNotFound',
      data: null,
    };
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (passwordMatch) {
    const token = jwt.sign({
      pk: user.pk,
      email: user.email,
      role: user.role,
    }, process.env.JWT_KEY, { expiresIn: process.env.JWT_EXPIRES || '1h' });

    return {
      success: true,
      message: 'loginSuccess',
      data: { token },
    };
  }

  return {
    success: false,
    message: 'passwordInvalid',
    data: null,
  };
};
