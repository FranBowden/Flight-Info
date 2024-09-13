import express from 'express';
import dotenv from 'dotenv';
import { getJson } from 'serpapi';

dotenv.config();
const app = express();
const apikey = process.env.API_KEY;

app.get('/api/search', async (req, res) => {
  try {
    const response = await getJson({
      engine: 'google_flights',
      api_key: apikey,
      departure_id: 'CDG',
      arrival_id: 'AUS',
      gl: 'us',
      hl: 'en',
      currency: 'USD',
      outbound_date: '2024-09-14',
      return_date: '2024-09-20'
    });

    res.json(response);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});


app.use(express.static('public'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
