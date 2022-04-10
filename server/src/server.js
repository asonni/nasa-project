const http = require('http');

const app = require('./app');

const { loadPlanetData } = require('./models/planets.model');

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

const startServer = async () => {
  await loadPlanetData();

  server.listen(PORT, () => {
    console.info(`Listening on port ${PORT}`);
  });
};

startServer();
