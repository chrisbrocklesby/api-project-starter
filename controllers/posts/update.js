const posts = require('../../functions/posts');

module.exports = async (request, response, next) => {
  try {
    const updatePost = await posts.update(request.params.pk, request.body);

    if (updatePost.success) {
      return response
        .status(200)
        .json({
          status: 'success',
          message: 'updated',
          data: updatePost.data,
        });
    }
    return next({ statusCode: 400, status: 'fail', message: updatePost.message });
  } catch (error) {
    return next(error);
  }
};
