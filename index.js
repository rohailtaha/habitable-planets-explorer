const { parse } = require('csv-parse');
const fs = require('fs');

function isHabitablePlanet(planet) {
  return (
    planet.koi_disposition === 'CONFIRMED' &&
    planet.koi_insol > 0.36 &&
    planet.koi_insol < 1.11 &&
    planet.koi_prad < 1.6
  );
}

const habitablePlanets = [];

fs.createReadStream('./kepler-planets.csv')
  .pipe(
    parse({
      comment: '#',
      columns: true,
    })
  )
  .on('data', data => {
    if (isHabitablePlanet(data)) {
      habitablePlanets.push(data);
    }
  })
  .on('error', error => {
    console.error(error);
  })
  .on('end', () => {
    console.log('Habitable planets: ');
    console.log(habitablePlanets.map(planet => planet.kepler_name));
  });
