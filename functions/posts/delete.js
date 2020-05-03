const repository = require('./repository');

module.exports = async (pk) => {
  const deletePost = await repository.delete(pk);
  if (deletePost) {
    return {
      success: true,
      message: 'deleted',
      data: null,
    };
  }

  return {
    success: false,
    message: 'deleteFailed',
    data: null,
  };
};
