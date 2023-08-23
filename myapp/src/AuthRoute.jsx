import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

function AuthRoute(props){
    const location = useLocation();
    const {currentUser} = useSelector( (state) => state.user);
    const navigate = useNavigate();
    if(currentUser === null  && location.pathname !== "/login" ){
        return (
            <Navigate to='/login' />
            // <>
            //     {navigate('/login')},
            // </>
            // alert("first")
            // <Navigate to='/login' state = {{from: location}}  replace/> 
        );
    }
    return props.children ;
}

function AdminRoute(props){
    const location = useLocation();
    const navigate = useNavigate();
    const {currentUser, isAdmin} = useSelector( (state) => state.user);
    if(!currentUser){
        return (
            <>
                {navigate('/login')}
            </>
            // <Navigate to='/login' state={{from : location}} replace/>
         );
    } else if (!isAdmin){
        return (
            <Navigate to='/'/> 
        );
    } else{
        return  props.children;
    }
}

export {AuthRoute, AdminRoute};