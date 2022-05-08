import Cookies from 'js-cookie'
import { useState } from 'react'
export const useCookies = () => {
    const [cookies, setCookiesValue] = useState(Cookies.get())
    
    const setCookie = (cookieName, newValue) => {
        Cookies.set(cookieName, newValue)
        setCookiesValue(Cookies.get())
    }
    const removeCookie = (cookieNameList) => {
        cookieNameList.forEach((cookieName) => Cookies.remove(cookieName))
        setCookiesValue(Cookies.get)
    }

    return { cookies, setCookie, removeCookie}

}