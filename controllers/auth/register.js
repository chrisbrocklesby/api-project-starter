const auth = require('../../functions/auth');

module.exports = async (request, response) => {
  try {
    const register = await auth.register({
      pk: request.body.pk || null,
      email: request.body.email || null,
      password: request.body.password || null,
    });

    if (register.success) {
      return response
        .status(200)
        .json({
          success: true,
          message: 'registerSuccess',
          data: null,
        });
    }
    return response
      .status(400)
      .json({
        success: false,
        message: register.message,
        data: null,
      });
  } catch (error) {
    return response
      .status(500)
      .json({
        success: false,
        message: 'serverError',
        data: null,
      });
  }
};
