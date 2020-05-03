const auth = require('../../functions/auth');

module.exports = async (request, response, next) => {
  try {
    const token = await auth.auth(request.headers.authorization || null);

    if (token.success) {
      request.user = token.data;
      return next();
    }

    request.user = null;
    return response
      .status(401)
      .json({
        success: false,
        message: 'unauthorized',
        data: null,
      });
  } catch (error) {
    request.user = null;
    return response
      .status(401)
      .json({
        success: false,
        message: 'unauthorized',
        data: null,
      });
  }
};
