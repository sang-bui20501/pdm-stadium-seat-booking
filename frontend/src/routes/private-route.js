import React from 'react'

const PrivateRoute = ({ children, ...rest }) => {
    return (
        <Route
            {...rest}
            render={() => auth
                ? children
                : <Redirect to="/" />
            }
        />
    );
}