// Generate travelers collection
const modelsManager = require("./modelsManager.js")();
const Traveler = modelsManager.db.traveler;
// Travelers native countries
const nativeCountries = ["USA", "Spain", "Italy", "Morocco", "China"];
// Travelers destinations
const destinations = ["France", "Egypt", "Japan", "Russia", "Turkey"];

function persistTraveler(index) {
  return new Traveler({
    gender: Math.floor(Math.random() * 2) + 1 === 1 ? "M" : "F", // Random gender
    nativeCountry: nativeCountries[Math.floor(Math.random() * 5)], // Random native country
    age: Math.floor(Math.random() * (100 - 18 + 1)) + 18, // Random age between 18 and 100
    destination: destinations[Math.floor(Math.random() * 5)], // Random destination
    date: Date.parse(`2018-08-${index < 10 ? "0" : ""}${index}`)
  }).save();
}

async function genereateTravelersCollection() {
  for (let i = 1; i <= 31; i++) {
    for (let j = 1; j <= 1000; j++) {
      await persistTraveler(i);
    }
    console.log(i);
  }
  process.exit();
}

genereateTravelersCollection();
