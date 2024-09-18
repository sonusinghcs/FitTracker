const Workout = require('../models/WorkoutModel')
const mongoose = require('mongoose');

//get all workouts
const getAllWorkouts = async (req, res) =>{
    const user_id = req.user._id
    try{
        const workouts = await Workout.find({user_id}).sort({createdAt:-1})
        res.status(200).json(workouts)
    }catch(e){
        res.status(404).json({error:"Couldn't fin"})
    }
}


//get a single workout
const getOneWorkout = async (req, res) =>{
    const {id} = req.params;
    try{
        const workout = await Workout.findById(id)
        if(!workout){
            return res.status(404).json({message: 'Workout not found'})
        }
        res.status(200).json(workout)
    }catch(e){
        res.status(404).json({error:'Couldnt find workout'})
    }
}


//create a new workout
const createWorkout = async (req, res) => {
    const {title,load,reps} = req.body

    let emptyFiled = [];
    
    if(!title){
        emptyFiled.push('title')
    }
    if(!load){
        emptyFiled.push('load')
    }
    if(!reps){
        emptyFiled.push('reps')
    }

    if(emptyFiled.length > 0){
        return res.status(400).json({error:'please provide all required',emptyFiled})
    }


    try{
    const user_id = req.user._id
    const workout = await Workout.create({title,load,reps,user_id})
    res.status(200).json(workout)
    
    }catch(e){
        res.status(404).json({error:e.message})
    }
}

//delete a workout
const deleteWorkout = async(req,res)=>{
        const {id} = req.params;
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({message: 'Workout not found'})
        }
      const workout = await Workout.findByIdAndDelete({_id:id})

      if(!workout){
          return res.status(404).json({message: 'Workout not found'})
      }
      res.status(200).json(workout)
            
}

//update a workout
const updateWorkout = async(req,res)=>{
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({message: 'Workout not found'})
    }
    const workout = await Workout.findByIdAndUpdate({_id:id},{
        ...req.body
    },{ new: true })
    if(!workout){
        return res.status(404).json({message: 'Workout not found'})
    }
    res.status(200).json(workout)
}


module.exports = {
    createWorkout,
    getAllWorkouts,
    getOneWorkout,
    deleteWorkout,
    updateWorkout
    
 
}