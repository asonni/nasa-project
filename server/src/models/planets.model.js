const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse');

const planets = require('./planets.mongo');

const isHabitablePlanet = planet => {
  return (
    planet['koi_disposition'] === 'CONFIRMED' &&
    planet['koi_insol'] > 0.36 &&
    planet['koi_insol'] < 1.11 &&
    planet['koi_prad'] < 1.6
  );
};

const loadPlanetData = () => {
  return new Promise((resolve, reject) => {
    fs.createReadStream(
      path.join(__dirname, '..', '..', 'data', 'kepler_data.csv')
    )
      .pipe(
        parse({
          comment: '#',
          columns: true
        })
      )
      .on('data', async data => {
        if (isHabitablePlanet(data)) {
          await savePlanet(data);
        }
      })
      .on('error', err => {
        console.log(err);
        reject(err);
      })
      .on('end', async () => {
        const countPlanetsFound = (await getAllPlanets()).length;
        console.log(`${countPlanetsFound} habitable planets found!`);
        resolve();
      });
  });
};

const getAllPlanets = async () => await planets.find({});

const savePlanet = async ({ keplerName }) => {
  try {
    await planets.updateOne({ keplerName }, { keplerName }, { upsert: true });
  } catch (err) {
    console.error(`Could not save planet ${err}`);
  }
};

module.exports = {
  loadPlanetData,
  getAllPlanets
};
