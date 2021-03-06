import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";

import Form from "../../../components/Form/Form";
import PageTitle from "../../../components/PageTitle/PageTitle";
import { AuthContext } from "../../../Context/AuthContext";
import { ThemeContext } from "../../../Context/ThemeContext";

const styles = {
  width: "100%",
  height: "100%",
};

function Login() {
  const { authenticated } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  const history = useHistory();
  const BASE_URL = process.env.REACT_APP_API_URL

  useEffect(() => {
    document.title = `What I've Learned - Login`;
    if (authenticated.isLogged === true) {
      history.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main style={styles}>
      <PageTitle title="Sign In" />
      <Form
        buttonText="Login"
        hiddenInput={true}
        hiddenCheck={false}
        helperText="Sign Up"
        linkPage="/signup"
        theme={theme}
        fetchUrl={`${BASE_URL}/api/v1/user/login`}
        page="login"
      />
    </main>
  );
}

export default Login;
