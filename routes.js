const { fetchAll } = require('./controller/announcementController');
const {fetchPController}=require("./controller/progressController");

const routes = [
  {
    method: 'POST',
    path: '/announcement',
    handler: fetchAll
  },
  {
    method: 'POST',
    path: '/checkProgress',
    handler: fetchPController
  }
];

module.exports = routes;

