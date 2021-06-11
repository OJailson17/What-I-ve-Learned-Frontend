import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import storage from "local-storage-fallback";

import Login from "./pages/Auth/Login/Login";
import Signup from "./pages/Auth/Signup/Signup";
import Home from "./pages/Home/Home";
import DesktopHeader from "./components/Header/DesktopHeader";
import MobileHeader from "./components/Header/MobileHeader";

import { useWindowDimensions } from "./Helper/windowDimension";

import "./App.css";

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${(props) => props.theme.mode === "Dark" ? "#111" : "#eee"};
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

function App() {
  const [authenticated, setAuthenticated] = useState(true);
  const [theme, setTheme] = useState(getInitialTheme);
  const { width } = useWindowDimensions();

  useEffect(() => {
    storage.setItem("theme", JSON.stringify(theme));
  }, [theme]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        {width >= 768 ? (
          <DesktopHeader
            authenticated={authenticated}
            theme={theme}
            setTheme={setTheme}
          />
        ) : (
          <MobileHeader
            authenticated={authenticated}
            theme={theme}
            setTheme={setTheme}
          />
        )}
        <div className="App">
          <Router>
            <Switch>
              <Route exact path="/">
                <Home theme={theme} setTheme={setTheme} />
              </Route>

              <Route exact path="/signup">
                <Signup theme={theme} />
              </Route>

              <Route exact path="/login">
                <Login theme={theme} />
              </Route>
            </Switch>
          </Router>
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
