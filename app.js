const express = require('express');
const cors = require ('cors');
const helmet = require ('helmet');
const dotenv = require ('dotenv');
const authRoutes = require("./routes/authRoutes");
const { protect } = require("./middleware/authMiddleware"); // Adding protected endpoint

dotenv.config();

const app = express();

app.use(cors({
    origin: "https://localhost:5173",
    credentials: true
}));

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);

// Default route 
app.get('/', (req, res) => {
    res.send('PulseVote is Running!');
});

// JSON test route
app.get('/test', (req, res) => {
    res.json({ message: 'PulseVote is Running from backend!' });
});

// Adding protected endpoint 
app.get("/api/protected", protect, (req, res) => {
    res.json({
        message: `Welcome, user ${req.user.id}! You have accessed protected data`,
        timestamp: new Date()
    });
});



module.exports = app;