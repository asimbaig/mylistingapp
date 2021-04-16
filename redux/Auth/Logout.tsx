/* eslint-disable react-hooks/exhaustive-deps */
import React,{ useEffect} from 'react'
import { Redirect } from 'react-router-dom';
import { logout } from "./authSlice";
import { emptyTasks } from "../../pages/calendar/calendarSlice";
// import { empyTasks } from "../../pages/calendar/calendarSlice";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { RootState } from "../../app/rootReducer";

export default function Logout() {
    const dispatch = useDispatch();
    const history = useHistory();
    // const currentDate = useSelector(
    //     (state: RootState) => state.global.currentDate
    //   );
    const isAuthenticated = useSelector((state: RootState) => {
        return state.auth.isAuthenticated;
      });

    useEffect(() => {
        // console.log("Logout");
        dispatch(emptyTasks(true));
        dispatch(logout());
        // dispatch(empyTasks(true));
        if(!isAuthenticated){
            history.push("/");   
        }
    }, [isAuthenticated]);
    return <div/>

    // return <Redirect to="/"/>
}
