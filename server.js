// Importing Hapi framework
const Hapi = require('@hapi/hapi');

// Importing all route definitions from the 'routes' file
const routes = require('./routes');

/**
 * Function: init
 * --------------
 * Initializes and starts the Hapi.js server.
 * 
 * What it does:
 * - Creates a new Hapi server instance on localhost and port 4001.
 * - Registers all routes to the server.
 * - Starts the server.
 * 
 * On Success:
 * - Logs the server URI (e.g., http://localhost:4001).
 * 
 * On Failure:
 * - Logs an error message if the server fails to start.
 */
const init = () => {
  // Create a new Hapi server instance with specified host and port
  const server = Hapi.server({
    port: 4001,
    host: 'localhost'
  });

  // Registering routes to the server
  server.route(routes);

  // Start the server and handle success or failure
  return server.start()
    .then(() => {
      // If server starts successfully, print the running URI
      console.log('Server running on', server.info.uri);
    })
    .catch((err) => {
      // If there is an error during server startup, log it
      console.error('Server failed to start:', err);
    });
};

// Call the init function to start the server
init();
