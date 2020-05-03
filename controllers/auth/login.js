const auth = require('../../functions/auth');

module.exports = async (request, response) => {
  try {
    const login = await auth.login(request.body);

    if (login.success) {
      return response
        .status(200)
        .json({
          success: true,
          message: 'loginSuccess',
          data: login.data,
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
