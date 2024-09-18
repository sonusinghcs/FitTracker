import {  useEffect } from "react"
import React  from 'react'
import WorkoutDetails from "../Components/WorkoutDetails"
import WorkoutForm from "../Components/WorkoutForm"
import { useWorkoutContext } from "../hooks/UseWorkoutsContext"
import {useAuthContext} from '../hooks/useAuthContext'

function Home() {

    const {workouts,dispatch} = useWorkoutContext() 
    const {user} = useAuthContext()

    useEffect(()=>{
       const fetchWorkouts = async ()=>{
            const response = await fetch('/api/workouts',{
               
                headers: {
                    'Authorization': 'Bearer '+user.token
                }
            })
            const data = await response.json()
            console.log(data)

            if(response.ok){
                dispatch({
                    type:'SET_WORKOUTS',
                    payload:data
                })
            }

       }
       if(user){
       fetchWorkouts()
       }
    },[dispatch,user])


  return (
    <div className='home'>
        <div className="workouts">
            {workouts && workouts.map((workout)=>(
                <WorkoutDetails key={workout._id} workout={workout}/>
            ))}
        </div>
        <WorkoutForm/>
    </div>
  )
}

export default Home