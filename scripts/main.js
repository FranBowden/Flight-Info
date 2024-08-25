// main.js

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('flight-search-form');
    const dataContainer = document.getElementById('data-container');
    //const apiKey = 'YOUR-API-KEY'; // Replace with your actual API key

    // Handle form submission
    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent form from submitting the default way

        // Get the flight number from the form input
        const flightNumber = document.getElementById('flight-number').value.trim();

        // Validate the flight number
        if (!flightNumber) {
            alert('Please enter a flight number.');
            return;
        }

        // API endpoint with flight number query
        const apiUrl = `https://airlabs.co/api/v9/flights?api_key=${apiKey}&flight_iata=${encodeURIComponent(flightNumber)}`;

        try {
            // Fetch data from the API
            const response = await fetch(apiUrl);
            const data = await response.json();

            // Clear previous data
            dataContainer.innerHTML = '';

            // Check if data is returned
            if (!data || !data.response || data.response.length === 0) {
                dataContainer.innerHTML = '<p>No flight data found.</p>';
                return;
            }

            // Create HTML content based on the API data
            data.response.forEach(flight => {
                const flightElement = document.createElement('div');
                flightElement.className = 'data-item';
                flightElement.innerHTML = `
                    <h2>Flight Number: ${flight.flight_iata || 'N/A'}</h2>
                    <p><strong>Aircraft ICAO:</strong> ${flight.aircraft_icao || 'N/A'}</p>
                    <p><strong>Departure ICAO:</strong> ${flight.dep_icao || 'N/A'}</p>
                    <p><strong>Arrival ICAO:</strong> ${flight.arr_icao || 'N/A'}</p>
                    <p><strong>Speed:</strong> ${flight.speed || 'N/A'} km/h</p>
                    <p><strong>Altitude:</strong> ${flight.alt || 'N/A'} feet</p>
                    <p><strong>Status:</strong> ${flight.status || 'N/A'}</p>
                    <p><strong>Latitude:</strong> ${flight.lat || 'N/A'}</p>
                    <p><strong>Longitude:</strong> ${flight.lng || 'N/A'}</p>
                `;
                dataContainer.appendChild(flightElement);
            });
        } catch (error) {
            console.error('Error fetching flight data:', error);
            dataContainer.innerHTML = '<p>Error fetching flight data. Please try again later.</p>';
        }
    });
});
