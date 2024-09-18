import { useAuthContext } from "./useAuthContext";
import { useWorkoutContext } from "./UseWorkoutsContext";

export const useLogout = ()=>{
    const {dispatch} = useAuthContext();
    const {dispatch:workoutsDispatch} = useWorkoutContext();
    const logout = ()=>{
        localStorage.removeItem('user');
        dispatch({type:'LOGOUT'})
        workoutsDispatch({type:'SET_WORKOUTS',payload:null})
    }

    return {logout};
 
}