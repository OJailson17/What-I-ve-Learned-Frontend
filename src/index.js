import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ApplicationProvider } from "./Context/ApplicationContext";
import {ThemeProvider} from './Context/ThemeContext'
import {AuthProvider} from './Context/AuthContext'
import {UserProvider} from './Context/UserContext'


ReactDOM.render(
    <ApplicationProvider>
    <AuthProvider>
    <UserProvider>
    <ThemeProvider>
    <App />
    </ThemeProvider>
    </UserProvider>
    </AuthProvider>
    </ApplicationProvider>
, document.getElementById("root"));
