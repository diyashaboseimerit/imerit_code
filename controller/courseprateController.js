const { fetchModelcourseprate} = require('../models/courseprateModel');
const Joi = require('joi');
/**
 * Controller to fetch a user's enrollment progress.
 *
 * This function validates the incoming request payload using Joi to ensure
 * a valid 'userid' is provided. It then calls the 'fetchModelProgress'
 * model function to retrieve the user's data from the database.
 * The function handles both successful data retrieval and potential errors,
 * returning an appropriate Hapi response.
 *
 * @param {object} request - The Hapi request object, containing the payload.
 * @param {object} h - The Hapi response toolkit for creating responses.
 * @returns {Promise<Hapi.ResponseObject>} A Promise that resolves with a Hapi response object.
 * - On success, returns the fetched data with a 200 status code.
 * - On validation failure, returns an error message with a 400 status code.
 * - On a model-level error, returns an error message with a 500 status code.
 */
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