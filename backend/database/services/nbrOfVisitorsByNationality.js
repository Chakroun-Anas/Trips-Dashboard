/**
 * Number of visitors by nationality given a destination and a day
 * @param {MongooseModel} travelerModel
 * @param {string} date - Day of the trips
 * @param {string} date - Destination of the trip
 * @see {@link https://mongoosejs.com/docs/models.html}
 */
function nbrOfVisitorsByNationality(travelerModel, date, destination) {
  const nativeCountries = ["USA", "Spain", "Italy", "Morocco", "China"];
  return Promise.all(
    nativeCountries.map(nativeCountry => {
      return travelerModel.find({
        date: new Date(`${date}`),
        destination,
        nativeCountry
      });
    })
  ).then(countriesVisitors => {
    const nbrOfVisitorsByNationality = {};
    countriesVisitors.forEach((countryVisitors, index) => {
      nbrOfVisitorsByNationality[nativeCountries[index]] =
        countryVisitors.length;
    });
    console.log(
      "~: module.exports -> nbrOfVisitorsByNationality",
      nbrOfVisitorsByNationality
    );
    return nbrOfVisitorsByNationality;
  });
}

module.exports = nbrOfVisitorsByNationality;
