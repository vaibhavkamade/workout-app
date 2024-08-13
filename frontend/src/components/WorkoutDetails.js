import React, { useState } from 'react';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { useAuthContext } from '../hooks/useAuthContext';

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext();
  const {user} = useAuthContext();
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(workout.title);
  const [load, setLoad] = useState(workout.load);
  const [reps, setReps] = useState(workout.reps);
  const [error, setError] = useState(null);

  console.log("CreatedAt:", workout.createdAt);

  const handleClick = async () => {

    if(!user){
      return
    }
    const confirmDelete = window.confirm("Do you really want to delete this workout?");
    
    if (confirmDelete) {
      const response = await fetch('https://workout-app-qcx1.onrender.com/api/workouts/' + workout._id, {
        method: 'DELETE',
        headers:{
          'Authorization':`Bearer ${user.token}`
        }
      });
  
      const json = await response.json();
  
      if (response.ok) {
        dispatch({ type: 'DELETE_WORKOUT', payload: json });
      }
    }
  };

  const handleEdit = async (e) => {
    if(!user){
      return
    }

    e.preventDefault();

    const updatedWorkout = { title, load, reps };
    const response = await fetch('https://workout-app-qcx1.onrender.com/api/workouts/' + workout._id, {
      method: 'PUT',
      body: JSON.stringify(updatedWorkout),
      headers: {
        'Content-Type': 'application/json',
        'Authorization':`Bearer ${user.token}`
      }
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    } else {
      setError(null);
      setIsEditing(false);
      dispatch({ type: 'UPDATE_WORKOUT', payload: json });
    }
  };

  return (
    <div className="workout-details">
      {isEditing ? (
        <form onSubmit={handleEdit}>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label>Load (kg):</label>
          <input
            type="number"
            value={load}
            onChange={(e) => setLoad(e.target.value)}
          />
          <label>Reps:</label>
          <input
            type="number"
            value={reps}
            onChange={(e) => setReps(e.target.value)}
          />
          <button type="submit">Update Workout</button>
          {error && <div className="error">{error}</div>}
        </form>
      ) : (
        <>
          <h4>{workout.title}</h4>
          <p><strong>Load (kg): </strong>{workout.load}</p>
          <p><strong>Reps: </strong>{workout.reps}</p>
          <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
          <span className="material-symbols-outlined" onClick={() => setIsEditing(true)} style={{ marginRight: '60px' }}>edit</span>
          <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
        </>
      )}
    </div>
  );
};

export default WorkoutDetails;
