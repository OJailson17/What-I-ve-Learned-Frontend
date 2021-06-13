import React from 'react'
import {Route, Redirect} from 'react-router-dom'

function ProtectedRoutes({authenticated, component: Component, ...rest}) {
    return (
        <Route {...rest} render={() => {
            if(authenticated === true) {
                return <Component />
            } else {
                return <Redirect to="/login" />
                // return <Redirect to={{pathname: "/login", state:{from: props.location}}} />
            }
        }} />
    )
}

export default ProtectedRoutes
