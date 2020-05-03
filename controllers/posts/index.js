const posts = require('../../functions/posts');

module.exports = async (request, response) => {
  try {
    const getPosts = await posts.read(request.query.limit, request.query.offset);

    if (getPosts.success) {
      return response
        .status(200)
        .json({
          success: true,
          message: null,
          data: getPosts.data,
        });
    }
    return response
      .status(404)
      .json({
        success: false,
        message: 'notFound',
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
