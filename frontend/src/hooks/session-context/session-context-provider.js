
import { useCookies } from './../use-cookie/use-cookie';
import { SessionContext } from './session-context';

const COOKIE = ["auth-token"]

export const SessionContextProvider = ({ children, loginUrl }) => {
    const { cookies, removeCookies } = useCookies()

    const removeAuthCookies = () => {
        removeCookies(COOKIE)
    }
    const contextData = {
        loginUrl,
        data: "",
        isAuthenticated: true,
        removeAuthCookies
    }

    return <SessionContext.Provider value={contextData}>{children}</SessionContext.Provider>
}