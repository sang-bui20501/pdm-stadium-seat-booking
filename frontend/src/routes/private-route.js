import React from 'react'
import { Navigate, Route, useLocation } from 'react-router-dom'
import useAuth from 'hooks/use-auth';
import { useNavigate } from 'react-router-dom';

const PrivateRoute = ({ Component }) => {
    const auth = useAuth()
    const { location } = useLocation() 
    if(!auth) {
        return <Navigate to = '/login' state={{ from: location }} />
    }   
    return <Component />;
}

export default PrivateRoute;