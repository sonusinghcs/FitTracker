const express = require('express');
const Workout = require('../models/WorkoutModel')
const router = express.Router();
const requireAuth = require('../middleware/requireAuth')

const {createWorkout,
    getAllWorkouts,
    deleteWorkout,
    getOneWorkout,
    updateWorkout,

} = require('../controllers/workoutControllers')


router.use(requireAuth)
router.get('/',getAllWorkouts)

router.post('/',createWorkout)

router.get('/:id',getOneWorkout)
router.delete('/:id',deleteWorkout)

router.patch('/:id',updateWorkout)

module.exports = router