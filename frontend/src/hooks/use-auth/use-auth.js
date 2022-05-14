import React from 'react'

export default function useAuth() {
    const [isAuthenticated, setAuthenticated] = React.useState(false)

    return [setAuthenticated, isAuthenticated];
};