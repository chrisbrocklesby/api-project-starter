const database = require('../../database');

module.exports = {
  insert(data) {
    return database.promise()
      .query('INSERT INTO posts set ?', [data])
      .then(([rows]) => rows)
      .catch((error) => { throw new Error(error); });
  },

  queryAll() {
    return database.promise()
      .query('SELECT * FROM posts')
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
