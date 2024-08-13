require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const workoutRoutes = require('./routes/workoutRoutes');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');  // Import CORS

// express app
const app = express();

// CORS configuration
const corsOptions = {
    origin: ['https://workout-app-three-navy.vercel.app', 'http://localhost:3000'],  // Include your frontend's URL here
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,  // Allow cookies and headers
};

app.use(cors(corsOptions));  // Apply CORS

app.use(express.json());
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// routes
app.use('/api/workouts', workoutRoutes);
app.use('/api/user', userRoutes);

// connection to database
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        // listening on port
        app.listen(process.env.PORT, () => {
            console.log("connected on port ", process.env.PORT);
        });
    })
    .catch((err) => {
        console.log(err);
    });
