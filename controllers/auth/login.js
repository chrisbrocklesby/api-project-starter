const auth = require('../../functions/auth');

module.exports = async (request, response) => {
  try {
    const body = {
      email: request.body.email || null,
      password: request.body.password || null,
    };

    const login = await auth.login(body.email, body.password);

    if (login.success) {
      return response
        .status(200)
        .json({
          success: true,
          message: 'loginSuccess',
          data: login.data.token,
        });
    }
    return response
      .status(400)
      .json({
        success: false,
        message: login.message,
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
