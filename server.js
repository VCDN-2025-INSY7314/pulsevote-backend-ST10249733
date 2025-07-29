const mongoose = require('mongoose'); //this library is used ot connect and intereact with MongoDB database
const app = require('./app'); // this imports the Express app and contains all the middleware, routtes, etc. 
const https = require('https'); // this is a built-in Node.js module for create HTTPS severs 
const fs = require('fs');  // this is a File System model, used here to read the cert and key files from disk 
require('dotenv').config(); // Loads the environment variables from .env

const PORT = process.env.PORT || 5000; // sets the port of teh server 

// the 'options' object provides the SSL certificate and PK to the server 
const options = {
    // 'fs.readFileSync' reads the self-assigned cert and key from the ssl folder
    key: fs.readFileSync('ssl/key.pem'),
    cert: fs.readFileSync('ssl/cert.pem'),
};

// 'https.createServer' creates a secure server using the cert and key 
// 'app' the Express app is passed in, so all routing/middleware logic still works 
https.createServer(options, app).listen(PORT, () => {
    console.log('Server running at https://localhost: + PORT');
});


