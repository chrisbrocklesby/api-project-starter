const posts = require('../../functions/posts');

module.exports = async (request, response) => {
  try {
    const deletePost = await posts.deleted(request.params.pk);

    if (deletePost.success) {
      return response
        .status(200)
        .json({
          success: true,
          message: 'deleted',
          data: deletePost.data,
        });
    }
    return response
      .status(400)
      .json({
        success: false,
        message: deletePost.message,
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
