const repository = require('./repository');

module.exports = async (limit, offset) => {
  const queryLimit = (Number(limit) <= 100) ? Number(limit) : 100;
  const queryOffset = Number(offset) || 0;

  const posts = await repository.queryAll(queryLimit, queryOffset);
  if (posts.length) {
    return {
      success: true,
      message: null,
      data: posts,
    };
  }

  return {
    success: false,
    message: 'notFound',
    data: null,
  };
};
