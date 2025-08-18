const { fetchData } = require('../models/announcementModel');
const Joi = require('joi');

// The mapper object to convert string status to integer
const statusmapper = {
  'published': 0,
  'draft': 1
};

const fetchAll = async (request, h) => {
  const schema = Joi.object({
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(10),
    status: Joi.string().valid('published', 'draft').optional()
  });

  const { error, value } = schema.validate(request.payload);

  if (error) {
    return h.response({
      message: error.details[0].message,
      appcode: 400
    }).code(400);
  }

  const { page, limit, status } = value;

  // **1. Map the string status to its integer value.**
  // If `status` is undefined, `statusValue` will also be undefined.
  const statusValue = status !== undefined ? statusmapper[status] : undefined; //mapped

  // **2. Pass the mapped integer value (`statusValue`) to the model.**
  return fetchData({ page, limit, status: statusValue })
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
