const posts = require('../../functions/posts');

module.exports = async (request, response, next) => {
  try {
    const deletePost = await posts.deleted(request.params.pk);

    if (deletePost.success) {
      return response
        .status(200)
        .json({
          status: 'success',
          message: 'deleted',
          data: null,
        });
    }
    return next({ statusCode: 400, status: 'fail', message: deletePost.message });
  } catch (error) {
    return next(error);
  }
};
