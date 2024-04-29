const express = require('express');
const app = express();
const fs = require('fs');

// Load environment variables
require('dotenv').config();

// Serve the HTML file
app.get('/', (req, res) => {
    // Read the HTML template file
    fs.readFile('index.html', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading HTML file:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        
        // Replace environment variable placeholder with its value
        const htmlContent = data.replace('<%= process.env.ENV %>', process.env.ENV);

        // Send the modified HTML content to the client
        res.send(htmlContent);
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

