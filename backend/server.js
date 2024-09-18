const express = require('express');

const mongoose = require('mongoose');


require('dotenv').config()
const app = express();
const workoutRoutes = require('./routes/workout')
const userRoutes = require('./routes/user')

app.use(express.json())

app.use((req,res,next)=>{
    console.log(req.path,req.method)
    next();
})

app.use('/api/workouts',workoutRoutes)

app.use('/api/user',userRoutes)




//connect to the database

mongoose.connect(process.env.MONG_URI)
   .then(()=>app.listen(process.env.PORT,()=>{
    console.log('Server is running on port',process.env.PORT)
}))
   .catch(err=>console.log(err));



