const form = document.getElementById("flight-search-form");
const flightNo = document.getElementById("FlightNumber");
const Airline = document.getElementById("Airline");
const DepartureTime = document.getElementById("DepartureTime");
const DepartureAirport = document.getElementById("DepartureAirport");
const ArrivalAirport = document.getElementById("ArrivalAirport");
const ArrivalTime = document.getElementById("ArrivalTime");
const Duration = document.getElementById("Duration");
const AirlineImg = document.getElementById("AirlineImg");

form.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent form submission
  document.getElementById("flightDetails").style.display = "block"; // Change the display to show the element

  const airportCode = document.getElementById("airportCode").value;
  if (airportCode) {
    fetch(`/api/search?departure_id=${airportCode}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Data from backend:", data);

        // Extract flights from the response
        const flights = data.best_flights || data.other_flights || [];

        if (flights.length > 0) {
          flights.forEach((flight, flightIndex) => {
            flight.flights.forEach((flightDetail, detailIndex) => {
              AirlineImg.src = flightDetail.airline_logo; // Use the image URL from the API
              flightNo.innerHTML = flightDetail.flight_number;
              Airline.innerHTML = flightDetail.airline;
              DepartureTime.innerHTML = flightDetail.departure_airport.time;
              DepartureAirport.innerHTML = `${flightDetail.departure_airport.name} (${flightDetail.departure_airport.id})`;
              ArrivalAirport.innerHTML = `${flightDetail.arrival_airport.name} (${flightDetail.arrival_airport.id})`;
              ArrivalTime.innerHTML = flightDetail.arrival_airport.time;
              Duration.innerHTML = convertTime(flightDetail.duration);
            });
          });
        } else {
          flightDetails.innerHTML = "No flights found";
        }
      })
      .catch((error) => {
        console.error("Error fetching from backend:", error);
      });
  }
});

function convertTime(minutes) {
  let hours = Math.floor(minutes / 60);
  let min = minutes % 60;
  return `${hours} hours ${min} minutes`;
}
