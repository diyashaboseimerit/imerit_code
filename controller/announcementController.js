const { fetchData } = require('../models/announcementModel');

const fetchAll = (request, h) => {
  return fetchData()
    .then((data) => {
      return h.response(data).code(200);
    })
    .catch((err) => {
      return h.response({
        message: err.message || "Unknown error",
        appcode: err.appcode || 500
      }).code(500);
    });
};

module.exports = { fetchAll };
