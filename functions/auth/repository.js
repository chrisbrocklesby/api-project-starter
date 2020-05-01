const database = require('../../database');

module.exports = {
  insert(data) {
    return database.promise()
      .query('INSERT INTO users set ?', [data])
      .then(([rows]) => rows)
      .catch((error) => { throw new Error(error); });
  },

  queryByPk(pk) {
    return database.promise()
      .query('SELECT * FROM users WHERE pk = ?', [pk])
      .then(([rows]) => rows[0] || null)
      .catch((error) => { throw new Error(error); });
  },

  queryByEmail(email) {
    return database.promise()
      .query('SELECT * FROM users WHERE email = ?', [email])
      .then(([rows]) => rows[0] || null)
      .catch((error) => { throw new Error(error); });
  },
};
