const http = require('http');
const mongoose = require('mongoose');

const app = require('./app');

const { loadPlanetData } = require('./models/planets.model');

const PORT = process.env.PORT || 8000;

const MONGO_URL = 'mongodb+srv://aladdin:626893@devcampscluster.xnruf.mongodb.net/nasa?retryWrites=true&w=majority';

const server = http.createServer(app);

mongoose.connection.once('open', () => {
  console.info('MongoDB connection ready!');
});

mongoose.connection.on('error', err => {
  console.error(err);
});

const startServer = async () => {
  await mongoose.connect(MONGO_URL);
  await loadPlanetData();

  server.listen(PORT, () => {
    console.info(`Listening on port ${PORT}`);
  });
};

startServer();
