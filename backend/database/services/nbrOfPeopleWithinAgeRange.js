/**
 * Number of visitors within a range age given a destination and a day
 * @param {MongooseModel} travelerModel
 * @param {string} date - Day of the trips
 * @param {string} date - Destination of the trip
 * @see {@link https://mongoosejs.com/docs/models.html}
 */
function nbrOfPeopleWithinAgeRange(travelerModel, date, destination) {
  return Promise.all([
    travelerModel.find({
      date: new Date(`${date}`),
      destination,
      age: {
        $lt: 35,
        $gt: 17
      }
    }),
    travelerModel.find({
      date: new Date(`${date}`),
      destination,
      age: {
        $lt: 51,
        $gt: 34
      }
    }),
    travelerModel.find({
      date: new Date(`${date}`),
      destination,
      age: {
        $lt: 76,
        $gt: 50
      }
    }),
    travelerModel.find({
      date: new Date(`${date}`),
      destination,
      age: {
        $gt: 75
      }
    })
  ]).then(nbrOfPeopleWithinAgeRanges => {
    return {
      "18-34": nbrOfPeopleWithinAgeRanges[0].length,
      "35-50": nbrOfPeopleWithinAgeRanges[1].length,
      "51-75": nbrOfPeopleWithinAgeRanges[2].length,
      "+75": nbrOfPeopleWithinAgeRanges[3].length
    };
  });
}

module.exports = nbrOfPeopleWithinAgeRange;
