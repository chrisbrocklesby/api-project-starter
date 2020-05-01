const { jwt } = require('../../helpers');

module.exports = async (request, response, next) => {
  const token = request.headers.authorization || '';
  if (!token) {
    request.user = null;
    return response
      .status(401)
      .json({
        status: 'error',
        data: null,
        message: 'unauthorized',
      });
  }

  try {
    const decoded = jwt.verify(
      token.replace('Bearer ', ''),
      process.env.JWT_KEY || '',
    );
    request.user = decoded;
    return next();
  } catch (error) {
    request.user = null;
    return response
      .status(401)
      .json({
        status: 'error',
        data: null,
        message: 'unauthorized',
      });
  }
};
