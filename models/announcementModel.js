const db_iet = require('../config/mySqldb');

const fetchData = function () {
  return new Promise((resolve, reject) => {
    db_iet.query('SELECT * FROM announcement')
      .then(([rows]) => {
        return resolve({
          result: rows,
          message: "Solved"
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
