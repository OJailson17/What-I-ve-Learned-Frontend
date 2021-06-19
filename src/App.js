import React, { useContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createGlobalStyle, ThemeProvider } from "styled-components";

import Login from "./pages/Auth/Login/Login";
import Signup from "./pages/Auth/Signup/Signup";
import Home from "./pages/Home/Home";
import DesktopHeader from "./components/Header/DesktopHeader";
import MobileHeader from "./components/Header/MobileHeader";
import ProtectedRoutes from "./Helper/ProtectedRoutes";

import { useWindowDimensions } from "./Helper/windowDimension";
import { dataContext } from "./Context";

import "./App.css";
import CreatePost from "./pages/Posts/CreatePost";
import CategoryPost from "./pages/Posts/ShowPosts";

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${(props) =>
      props.theme.mode === "Dark" ? "#2e2e2e" : "#eee"};
    color: ${(props) => (props.theme.mode === "Dark" ? "#eee" : "#111")}
  }
  
  header, nav {
    background-color: ${(props) =>
      props.theme.mode === "Dark" ? "#0821d4" : ""}
  }
`;

// Application Function
function App() {
  const { width } = useWindowDimensions();
  const { authenticated, theme, setTheme } = useContext(dataContext);


  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router>
        <Switch>
    <>
           { width >= 768 ? (
              <DesktopHeader theme={theme} setTheme={setTheme} />
            ) : (
              <MobileHeader theme={theme} setTheme={setTheme} />
            )}
            <ProtectedRoutes
              exact
              path="/"
              authenticated={authenticated.isLogged}
              component={Home}
            />
            <ProtectedRoutes
              exact
              path="/:userId/post/create"
              authenticated={authenticated.isLogged}
              component={CreatePost}
            />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/login" component={Login} />
            <ProtectedRoutes exact path="/posts/:category" authenticated={authenticated.isLogged} component={CategoryPost} />
    </>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
