import { useState, useEffect, useContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import storage from "local-storage-fallback";

import Login from "./pages/Auth/Login/Login";
import Signup from "./pages/Auth/Signup/Signup";
import Home from "./pages/Home/Home";
import DesktopHeader from "./components/Header/DesktopHeader";
import MobileHeader from "./components/Header/MobileHeader";
import ProtectedRoutes from "./Helper/ProtectedRoutes";

import { useWindowDimensions } from "./Helper/windowDimension";
import { dataContext } from "./Context";

import "./App.css";

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

const getInitialTheme = () => {
  const savedTheme = storage.getItem("theme");
  return savedTheme ? JSON.parse(savedTheme) : { mode: "Light" };
};

// Application Function
function App() {
  const [theme, setTheme] = useState(getInitialTheme);
  const { width } = useWindowDimensions();
  const { authenticated } = useContext(dataContext);
  console.log(authenticated);

  useEffect(() => {
    storage.setItem("theme", JSON.stringify(theme));
  }, [theme]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {width >= 768 ? (
        <DesktopHeader theme={theme} setTheme={setTheme} />
      ) : (
        <MobileHeader theme={theme} setTheme={setTheme} />
      )}
      <div className="App">
        <Router>
          <Switch>
            <ProtectedRoutes
              exact
              path="/"
              authenticated={authenticated.isLogged}
              component={() => <Home theme={theme} />}
            />
            {/* <Route exact path="/"><Home theme={theme} /></Route> */}
            {/* <Route
              exact
              path="/signup"
            >
              <Signup theme={theme} />
            </Route> */}
            <Route exact path="/signup" component={() => <Signup />} />
            <Route
              exact
              path="/login">
                <Login theme={theme} />
              </Route>
          </Switch>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
