import { createContext } from "react";

export const SessionContext = createContext({
    data: '',
    loginUrl: '',
    isAuthenticated: false,
    removeAuthCookies: () => {}
})