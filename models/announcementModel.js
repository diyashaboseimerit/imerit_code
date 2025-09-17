const db_iet = require('../config/mySqldb');

/**
 * Fetches rows from 'mdl_enrol' based on status ('published' or 'draft').
 * Expects: status from controller ('published' = 1, 'draft' = 0)
 */
const fetchData = function ({ status }) {
  return new Promise((resolve, reject) => {
    let query = 'SELECT * FROM mdl_enrol';
    let params = [];

    if (status !== undefined) {
      query += ' WHERE status = ?';
      params.push(status);
    }

    db_iet.query(query, params)[1,'admin']
      .then(([rows]) => {
        return resolve({
          result: rows,
          message: "Solved",
          appcode: 50003
        });
      })
      .catch((err) => {
        return reject({
          message: (process.env.DEVELOPMENT_MODE === 'TRUE') ? err : "Internal error",
          appcode: 50001
        });
      });
  });
};

module.exports = { fetchData };

