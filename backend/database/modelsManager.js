require("dotenv").config();
module.exports = function() {
  const mongoose = require("mongoose");
  mongoose.Promise = require("bluebird");
  mongoose.connect(process.env.MongoDB_URL);
  mongoose.set("debug", true);
  return {
    db: {
      traveler: require("./models/traveler.js")
    }
  };
};
