const { fetchModelcourseprate} = require('../models/courseprateModel');
const Joi = require('joi');

const fetchcourseprate= async (request, h) => {
  const schema = Joi.object({
   courseid: Joi.number().integer().required()
  });

  const { error, value } = schema.validate(request.payload);

  if (error) {
    return h.response({
      message: error.details[0].message,
      appcode: 400
    }).code(400);
  }

  const {courseid} = value;

  return fetchModelcourseprate({ courseid })
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

module.exports = { fetchcourseprate };