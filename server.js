const Hapi = require('@hapi/hapi');
const routes = require('./routes');

const init = () => {
  const server = Hapi.server({
    port: 4001,
    host: 'localhost'
  });

  server.route(routes);

  return server.start()
    .then(() => {
      console.log('Server running on', server.info.uri);
    })
    .catch((err) => {
      console.error('Server failed to start:', err);
    });
};

init();
