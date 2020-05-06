const posts = require('../../functions/posts');

module.exports = async (request, response, next) => {
  try {
    const post = await posts.create(request.body);

    if (post.success) {
      return response
        .status(200)
        .json({
          status: 'success',
          message: 'created',
          data: null,
        });
    }
    return next({ statusCode: 400, status: 'fail', message: post.message });
  } catch (error) {
    return next(error);
  }
};
