require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const workoutRoutes = require('./routes/workoutRoutes')

//express app
const app = express();



app.use(express.json());
app.use((req,res,next)=>{
    console.log(req.path , req.method);
    next();
})


//routes

app.use('/api/workouts',workoutRoutes);


//connection to database

mongoose.connect(process.env.MONGODB_URI)
    .then(()=>{
        //listening on port
        app.listen(process.env.PORT,(req,res)=>{
            console.log("connected on port " , process.env.PORT);
        });
    })
    .catch((err)=>{
        console.log(err)
    })



