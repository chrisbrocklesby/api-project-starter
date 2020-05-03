const repository = require('./repository');
const { bcrypt, jwt, validator } = require('../../helpers');

module.exports = async (data) => {
  const userData = {
    email: data.email || null,
    password: data.password || null,
  };

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

  const validate = validator.validate(userData, rules);

  if (!validate.success) {
    return {
      success: false,
      message: validate.message,
      data: null,
    };
  }

  const user = await repository.queryByEmail(userData.email);
  if (!user) {
    return {
      success: false,
      message: 'userNotFound',
      data: null,
    };
  }

  const passwordMatch = await bcrypt.compare(userData.password, user.password);
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
