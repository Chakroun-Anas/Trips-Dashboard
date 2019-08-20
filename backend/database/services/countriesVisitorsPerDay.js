/**
 * Number of visitors for each destination country in a given day
 * @param {MongooseModel} travelerModel
 * @param {string} date - Day of the trips
 * @see {@link https://mongoosejs.com/docs/models.html}
 */
module.exports = function(travelerModel, date) {
  const destinations = ["France", "Egypt", "Japan", "Russia", "Turkey"];
  return Promise.all(
    destinations.map(destination => {
      return travelerModel.find({
        date: new Date(`${date}`),
        destination
      });
    })
  ).then(countriesVisits => {
    const countriesVisitorsPerDay = {};
    countriesVisits.forEach((countryVisits, index) => {
      countriesVisitorsPerDay[destinations[index]] = countryVisits.length;
    });
    return countriesVisitorsPerDay;
  });
};
