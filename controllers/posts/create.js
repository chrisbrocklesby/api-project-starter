const posts = require('../../functions/posts');

module.exports = async (request, response) => {
  console.log(request.body);
  try {
    const post = await posts.create({
      pk: request.body.pk || null,
      title: request.body.title || null,
      body: request.body.body || null,
    });

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
