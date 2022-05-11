export const setSession = (token, user) => {
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('user', user);
};

export const removeSession = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
};

export const getToken = () => {
    return sessionStorage.getItem('token') || null;
};

export const getUser = () => {
    return sessionStorage.getItem('user') || null;
};