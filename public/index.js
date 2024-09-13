fetch('/api/search')
  .then(response => response.json())
  .then(data => {
    console.log('Data from backend:', data);  

    const resultsDiv = document.getElementById('airlineName');
    resultsDiv.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
  })
  .catch(error => {
    console.error('Error fetching from backend:', error);  
  });
