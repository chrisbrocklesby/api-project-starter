const posts = require('../../models/posts');

module.exports = async (request, response) => {
  try {
    const postIndex = await posts.get();
    return response
      .status(200)
      .json({
        status: 'success',
        data: postIndex,
        message: null,
      });
  } catch (error) {
    return response
      .status(500)
      .json({
        status: 'error',
        data: null,
        message: 'serverError',
      });
  }
};
