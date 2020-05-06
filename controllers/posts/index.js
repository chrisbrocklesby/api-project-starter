const posts = require('../../functions/posts');

module.exports = async (request, response, next) => {
  try {
    const getPosts = await posts.read(request.query.limit, request.query.offset);

    if (getPosts.success) {
      return response
        .status(200)
        .json({
          status: 'success',
          message: null,
          data: getPosts.data,
        });
    }
    return next();
  } catch (error) {
    return next(error);
  }
};
