const express = require('express');
const cors = require ('cors');
const helmet = require ('helmet');
const dotenv = require ('dotenv');

dotenv.config();

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

// Default route 
app.get('/', (req, res) => {
    res.send('PulseVote is Running!');
});

// JSON test route
app.get('/test', (req, res) => {
    res.json({ message: 'PulseVote is Running from backend!' });
});

module.exports = app;