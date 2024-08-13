const mongoose = require('mongoose');
const Workout = require('../models/workout-model');

//get all workouts

const getWorkouts = async (req,res)=>{

    const user_id = req.user._id;    
    const workouts = await Workout.find({user_id}).sort({createdAt:-1});
    res.status(200).json(workouts);
}

 
//get a single workout

const getWorkout = async (req,res) =>{

    const {id} = req.params;
    
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"No such Workout !!"});
    }

    const workout = await Workout.findById(id);

    if(!workout){
        return res.status(404).json({error:"No such workout !!"});
    }

    return res.status(200).json(workout);
}


//create a workout

const createWorkout = async (req,res)=>{
    const {title,reps,load} = req.body;
    

    let emptyFields = [];

    if(!title) emptyFields.push(title);
    if(!reps) emptyFields.push(reps);
    if(!load) emptyFields.push(load);

    if(emptyFields.length > 0 ){
        return res.status(400).json({error:"Please fill all fields" ,emptyFields})
    }

    try {
        const user_id = req.user._id;
        const workout = await Workout.create({title,reps,load , user_id});
        return res.status(200).json(workout);

    } catch (error) {
        return res.json({error:error.message});
    }
    return res.status(400).json({msg:'create a workout'})
}


//update a workout

const updateWorkout = async (req,res) =>{

    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"No such Workout !!"});
    }

    const workout = await Workout.findByIdAndUpdate({_id:id},{
        ... req.body
    });

    if(!workout){
        return res.status(404).json({error:"No such workout !!"});
    }

    res.status(200).json(workout);
}


//delete a workout

const deleteWorkout = async (req,res) =>{

    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"No such Workout !!"});
    }

    const workout = await Workout.findByIdAndDelete({_id:id});

    if(!workout){
        return res.status(404).json({error:"No such workout !!"});
    }

    res.status(200).json(workout);
}


module.exports = {getWorkouts,getWorkout,createWorkout,updateWorkout,deleteWorkout}
