const Annoucement = require('../models/annoucementModel');

async function fetchAll(request, h) {
  try {
    const data = await Annoucement.getAllAnnouncements();
    return h.response(data).code(200);
  } catch (err) {
    console.error(err);
    return h.response({ error: 'Server Error' }).code(500);
  }
}

module.exports = { fetchAll };