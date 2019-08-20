/**
 * Percentage of gender's visitors given a destination and a day
 * @param {MongooseModel} travelerModel
 * @param {string} date - Day of the trips
 * @param {string} date - Destination of the trip
 * @see {@link https://mongoosejs.com/docs/models.html}
 */
function percentageOfGenders(travelerModel, date, destination) {
  return Promise.all([
    travelerModel.find({
      date: new Date(`${date}`),
      destination,
      gender: "M"
    }),
    travelerModel.find({
      date: new Date(`${date}`),
      destination,
      gender: "F"
    })
  ]).then(nbrOfMalesFemales => {
    let percentageOfMales =
      (nbrOfMalesFemales[0].length /
        (nbrOfMalesFemales[0].length + nbrOfMalesFemales[1].length)) *
      100;
    let percentageOfFemales =
      (nbrOfMalesFemales[1].length /
        (nbrOfMalesFemales[0].length + nbrOfMalesFemales[1].length)) *
      100;
    if (percentageOfMales % 1 > 0.5) {
      percentageOfMales = Math.floor(percentageOfMales) + 1;
    } else {
      percentageOfMales = Math.floor(percentageOfMales);
    }
    if (percentageOfFemales % 1 > 0.5) {
      percentageOfFemales = Math.floor(percentageOfFemales) + 1;
    } else {
      percentageOfFemales = Math.floor(percentageOfFemales);
    }
    console.log(percentageOfMales);
    console.log(percentageOfFemales);
    return {
      males: percentageOfMales,
      females: percentageOfFemales
    };
  });
}

module.exports = percentageOfGenders;
