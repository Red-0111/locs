const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(bodyParser.json());


// Temporary storage for locations
let locations = [];

// Endpoint to receive location data
app.post('/api/location', (req, res) => {
    const { latitude, longitude } = req.body;
    if (latitude && longitude) {
        locations.push({ latitude, longitude, timestamp: new Date() });
        console.log('Location received:', { latitude, longitude });
        res.status(200).send({ message: "Location saved successfully!" });
    } else {
        res.status(400).send({ error: "Invalid data" });
    }
});

// Endpoint to view all stored locations
app.get('/api/locations', (req, res) => {
    res.status(200).json(locations);
});

app.get('/', (req, res) => {
    res.send('<h1>Welcome to the Location Server</h1><p>Use <code>/api/location</code> to POST location data, and <code>/api/locations</code> to view stored locations.</p>');
});


// Start the server
const PORT = 3000; // You can change the port if needed
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
