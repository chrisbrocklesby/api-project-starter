const database = require('../../database');

module.exports = {
  insert(data) {
    return database.promise()
      .query('INSERT INTO posts SET ?', [data])
      .then(([rows]) => rows)
      .catch((error) => { throw new Error(error); });
  },

  update(pk, data) {
    return database.promise()
      .query('UPDATE posts SET ? WHERE pk = ?', [data, pk])
      .then(([rows]) => rows)
      .catch((error) => { throw new Error(error); });
  },

  delete(pk) {
    return database.promise()
      .query('DELETE FROM posts WHERE pk = ?', [pk])
      .then(([rows]) => rows)
      .catch((error) => { throw new Error(error); });
  },


  queryAll(limit, offset) {
    return database.promise()
      .query('SELECT * FROM posts LIMIT ? OFFSET ?', [limit || 100, offset || 0])
      .then(([rows]) => rows)
      .catch((error) => { throw new Error(error); });
  },

  queryByPk(pk) {
    return database.promise()
      .query('SELECT * FROM posts WHERE pk = ?', [pk])
      .then(([rows]) => rows[0] || null)
      .catch((error) => { throw new Error(error); });
  },
};
