const { fetchAll } = require('./controller/announcementController');

const routes = [
  {
    method: 'POST',
    path: '/announcement',
    handler: fetchAll
  }
];

module.exports = routes;
