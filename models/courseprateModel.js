const db_iet = require('../config/mySqldb');

const fetchModelcourseprate = function ({ courseid }) {
  return new Promise((resolve, reject) => {
    let query = `
SELECT 
    u.id AS userid,
    u.email,
    u.firstname,
    u.lastname,
    c.id AS courseid,
    c.fullname AS course_name,
    cc.timecompleted,
    uca.timeaccess AS lastaccess,
    CASE 
        WHEN cc.timecompleted IS NOT NULL AND cc.timecompleted > 0 THEN '100%'
        WHEN cc.timecompleted IS NULL AND uca.timeaccess IS NOT NULL THEN 'In Progress'
        ELSE 'Not Started'
    END AS progress_status
FROM courses c
JOIN enrol e 
    ON e.courseid = c.id
JOIN enrolments en 
    ON en.enrolid = e.id
JOIN users_data u 
    ON u.id = en.userid
LEFT JOIN course_completions cc 
    ON cc.course = c.id AND cc.userid = u.id
LEFT JOIN user_course_access uca
    ON uca.courseid = c.id AND uca.userid = u.id
WHERE c.id = ?;
    `;

    db_iet.query(query, [courseid])
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

module.exports = { fetchModelcourseprate };