const express = require('express');
const Workout = require('../models/workout-model');
const {getWorkouts,getWorkout,createWorkout,updateWorkout,deleteWorkout} = require('../controllers/workout-controller');

const router = express.Router();

router.get('/',getWorkouts);

router.get('/:id',getWorkout);

router.post('/',createWorkout);

router.delete('/:id',deleteWorkout);

router.put('/:id',updateWorkout);


module.exports = router;