const posts = require('../../functions/posts');

module.exports = async (request, response) => {
  try {
    const post = await posts.create(request.body);

    if (post.success) {
      return response
        .status(200)
        .json({
          success: true,
          message: 'postSuccess',
          data: null,
        });
    }

    return response
      .status(400)
      .json({
        success: false,
        message: post.message,
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
