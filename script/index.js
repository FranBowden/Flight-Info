
require('dotenv').config();

const apikey = process.env.API_KEY;

const { getJson } = require("serpapi");

getJson({
  api_key: apikey,
  engine: "google_flights",
  hl: "en",
  gl: "us",
  departure_id: "LHR",
  arrival_id: "AUS",
  outbound_date: "2024-09-13",
  return_date: "2024-09-19",
  currency: "USD"
}, (json) => {
  console.log(json);
});