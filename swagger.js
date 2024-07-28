const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Discussion Project (With NODE JS)',
    description: 'Backend Assignment '
  },
  host: 'localhost:5000'
};

const outputFile = './swagger-output.json';
const routes = ['./server.js'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as server.js, app.js, routes.js, etc ... */
swaggerAutogen(outputFile, routes, doc).then(() => {
    require('./server.js'); 
  });