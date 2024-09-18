import React, { useState } from 'react'
import { useWorkoutContext } from '../hooks/UseWorkoutsContext'
import { useAuthContext } from '../hooks/useAuthContext'

function WorkoutForm() {
    const {user} = useAuthContext()  // get user from AuthContext hook to add token to header
    const {dispatch} = useWorkoutContext()
    const [title,setTitle] = useState("")
    const [load,setLoad] = useState("")
    const [reps, setReps] = useState("")
    const [error, setError] = useState("")
    const [emptyFiled, setEmptyFiled] = useState([])

    const handleSubmit = async (e) =>{
        e.preventDefault()
        if(!user){
            setError("Please log in to add a workout")
            return
        }
        const workout = {title,load,reps}

        const response = await fetch('/api/workouts',{
            method: 'POST',
            body: JSON.stringify(workout),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+user.token
                
            }
        })
        const data = await response.json()

        if(!response.ok){
            setError(data.error)
            setEmptyFiled(data.emptyFiled)
        }

        if(response.ok){
            
            setError("")
            console.log('workouts added successfully',data)
            setTitle("")
            setLoad("")
            setReps("")
            setEmptyFiled([])
            dispatch({type: 'CREATE_WORKOUT', payload: data})
        }
    }

  return (
    <form action="" className="create"
    onSubmit={handleSubmit}
    
    >
        <h3>Add a new Workout</h3>
        <label >Exersise Title</label>
        <input 
        onChange={(e)=>setTitle(e.target.value)}
        value={title}
        type="text"
        className={emptyFiled.includes('title')? 'error':""}
        />

        <label >Load (in Kg)</label>
        <input 
        onChange={(e)=>setLoad(e.target.value)}
        value={load}
        className={emptyFiled.includes('load')? 'error':""}
        type="number" />

        <label >Reps</label>
        <input 
        onChange={(e)=>setReps(e.target.value)}
        value={reps}
        className={emptyFiled.includes('reps')? 'error':""}
        type="number" />

        <button>Add Workout</button>

        {error && <div className='error'>
            {error}
        </div>}
    </form>
  )
}

export default WorkoutForm