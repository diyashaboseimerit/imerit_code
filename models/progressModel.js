const db_iet = require('../config/mySqldb');
/**
 * Fetches enrollment details for a given user.
 * * This function queries the database to retrieve a user's enrollment information,
 * including the enrollment ID, course ID, status, and the user ID itself,
 * by performing a JOIN operation on the 'enrolments' and 'enrol' tables.
 * It returns a Promise that resolves with the query results or rejects with an error.
 * * @param {object} param0 - The function parameters.
 * @param {number} param0.userid - The ID of the user whose enrollment progress is to be fetched.
 * @returns {Promise<object>} A Promise that resolves with an object containing the query results,
 * a success message, and an application code.
 * @throws {object} An object containing an error message and an application code if the query fails.
 */
const fetchModelProgress = function ({ userid }) {
  return new Promise((resolve, reject) => {
    let query = `
  SELECT 
    c.id as course_id,
    c.fullname as course_name,            
    -- Enrollment information
    CASE 
        WHEN e.timestart IS NOT NULL AND e.timestart != 0 
        THEN FROM_UNIXTIME(e.timestart)
        ELSE 'NA'
    END as enrollment_date,
    CASE 
        WHEN e.timeend = 0 OR e.timeend IS NULL THEN 'NA'
        ELSE FROM_UNIXTIME(e.timeend)
    END as enrollment_end_date,
    
    -- Completion status and dates
    CASE 
        WHEN cc.timecompleted IS NOT NULL 
        THEN 'Completed'
        WHEN cc.timestarted IS NOT NULL 
        THEN 'In Progress'
        WHEN cc.timeenrolled IS NOT NULL 
        THEN 'Enrolled'
        ELSE 'Not Started'
    END as completion_status,
    CASE 
        WHEN cc.timestarted IS NOT NULL AND cc.timestarted!=0
        THEN FROM_UNIXTIME(cc.timestarted)
        ELSE 'NA'
    END as time_started,
    
    CASE 
        WHEN cc.timecompleted IS NOT NULL AND cc.timecompleted!=0
        THEN FROM_UNIXTIME(cc.timecompleted)
        ELSE 'NA'
    END as time_completed


FROM enrolments e
INNER JOIN enrol en ON e.enrolid = en.id
INNER JOIN courses c ON en.courseid = c.id
LEFT JOIN course_completions cc ON e.userid = cc.userid AND c.id = cc.course

WHERE e.userid = ?
ORDER BY e.timecreate DESC;
    `;

    db_iet.query(query, [userid])
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

module.exports = { fetchModelProgress };