import React from 'react'
import { Navigate, Route, useLocation } from 'react-router-dom'
import useAuth from 'hooks/use-auth';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const PrivateRoute = ({ Component }) => {
    const isAuthenticated = useAuth()
    const { location } = useLocation() 
    const { navigate } = useNavigate()

    useEffect(() => {
        if(isAuthenticated) return

        navigate({ path: "/login"})
    }, [navigate, location, isAuthenticated])

    if(!isAuthenticated) {
        return <Navigate to = '/login' state={{ from: location }} />
    }   
    return <Component />;
}

export default PrivateRoute;