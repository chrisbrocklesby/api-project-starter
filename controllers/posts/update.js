const posts = require('../../functions/posts');

module.exports = async (request, response) => {
  try {
    const updatePost = await posts.update(request.params.pk, request.body);

    if (updatePost.success) {
      return response
        .status(200)
        .json({
          success: true,
          message: 'updated',
          data: updatePost.data,
        });
    }
    return response
      .status(400)
      .json({
        success: false,
        message: updatePost.message,
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
