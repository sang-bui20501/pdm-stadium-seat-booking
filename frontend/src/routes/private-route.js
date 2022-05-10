import React from 'react'
import { Navigate, Route, useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { useEffect, useContext } from 'react';
import { SessionContext } from './../hooks/session-context/session-context';

const PrivateRoute = ({ Component }) => {
    const { isAuthenticated } = useContext(SessionContext) || {}

    const { location } = useLocation()
    const navigate = useNavigate()


    useEffect(() => {
        if (!isAuthenticated)
            return navigate({ path: "/" });
    }, [navigate, location, isAuthenticated])

    if (!isAuthenticated) {
        return <Navigate to='/sign-in' state={{ from: location }} />
    }
    return <Component />;
}

export default PrivateRoute;