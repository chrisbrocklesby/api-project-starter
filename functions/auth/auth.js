const { jwt } = require('../../helpers');

module.exports = async (data) => {
  const token = data || null;

  if (!token) {
    return {
      success: false,
      message: 'unauthorized',
      data: null,
    };
  }

  try {
    const decoded = jwt.verify(
      token.replace('Bearer ', ''),
      process.env.JWT_KEY || '',
    );

    return {
      success: true,
      message: 'authorized',
      data: decoded,
    };
  } catch (error) {
    return {
      success: false,
      message: 'unauthorized',
      data: null,
    };
  }
};
