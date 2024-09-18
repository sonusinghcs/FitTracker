import React, { useState } from 'react';
import { useWorkoutContext } from '../hooks/UseWorkoutsContext';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { useAuthContext } from '../hooks/useAuthContext';

function WorkoutDetails({ workout }) {
  const { dispatch } = useWorkoutContext();

  const {user} = useAuthContext()
  const [title, setTitle] = useState(workout.title);
  const [reps, setReps] = useState(workout.reps);
  const [load, setLoad] = useState(workout.load);
  const [isEditing, setIsEditing] = useState(false); // To toggle edit mode

  const handleDelete = async (e) => {
    e.preventDefault();
    if(!user){
      return
    }
    console.log(workout._id)
    const response = await fetch('/api/workouts/' + workout._id, {
      method: 'DELETE',
      headers:{'Authorization': 'Bearer '+user.token}
    });
    const data = await response.json();
    if (response.ok) {
      dispatch({
        type: 'DELETE_WORKOUT',
        payload: data,
      });
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault(); 
    if(!user){
      return
    }
    const updatedWorkout = { title, reps, load }; 

    const response = await fetch('/api/workouts/' + workout._id, {
      method: 'PATCH', 
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+user.token
      },
      body: JSON.stringify(updatedWorkout),
    });

    const data = await response.json();
    if (response.ok) {
      dispatch({
        type: 'UPDATE_WORKOUT',
        payload: data,
      });
      setIsEditing(false); 
    }
  };

  return (
    <div className="workout-details">
      {isEditing ? (
        <form onSubmit={handleUpdate}>
          
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label>Reps:</label>
          <input
            type="number"
            value={reps}
            onChange={(e) => setReps(e.target.value)}
          />
          <label>Load (lbs):</label>
          <input
            type="number"
            value={load}
            onChange={(e) => setLoad(e.target.value)}
          />
          <button type="submit">Update Workout</button>
        </form>
      ) : (
        <>
          <h3>{workout.title}</h3>
          <p>Reps: {workout.reps}</p>
          <p>Load: {workout.load} pounds</p>
          <p>
            {formatDistanceToNow(new Date(workout.createdAt), {
              addSuffix: true,
            })}
          </p>
          <span className="delete-btn" onClick={handleDelete}>Delete</span>
          <span onClick={() => setIsEditing(true)}
            className="update-btn"
            >Update</span> {/* Toggle edit mode */}
        </>
      )}
    </div>
  );
}

export default WorkoutDetails;

