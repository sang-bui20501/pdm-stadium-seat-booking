import React from 'react'
import useAuth from 'hooks/use-auth/use-auth';
import { useCookies } from './../use-cookie/use-cookie';
import { SessionContext } from './session-context';

const COOKIE = ["jwt"]

export const SessionContextProvider = ({ children, loginUrl }) => {
    const { cookies, removeCookies } = useCookies()

    const removeAuthCookies = () => {
        removeCookies(COOKIE)
    }
    console.log('cookies' , cookies)
    const contextData = {
        loginUrl,
        data: "",
        isAuthenticated: !!cookies['jwt'],
        removeAuthCookies
    }

    return <SessionContext.Provider value={contextData}>{children}</SessionContext.Provider>
}