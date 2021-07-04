import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";

import Form from "../../../components/Form/Form";
import PageTitle from "../../../components/PageTitle/PageTitle";
import { AuthContext } from "../../../Context/AuthContext";
import { ThemeContext } from "../../../Context/ThemeContext";

function Signup() {
  const { authenticated } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  const history = useHistory();

  useEffect(() => {
    document.title = `What I've Learned - Signup`;
    if (authenticated.isLogged === true) {
      history.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <main className="container">
        <PageTitle title="Sign Up" />
        <Form
          buttonText="Sign Up"
          hiddenInput={false}
          hiddenCheck={true}
          helperText="Login"
          linkPage="/login"
          theme={theme}
          fetchUrl="/api/v1/user/register"
          page="signup"
        />
      </main>
    </>
  );
}

export default Signup;
