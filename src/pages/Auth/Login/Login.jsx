import React, { useContext, useEffect } from "react";
import { useHistory, Redirect } from "react-router-dom";

import Form from "../../../components/Form/Form";
import PageTitle from "../../../components/PageTitle/PageTitle";
import { dataContext } from "../../../Context";

const styles = {
  width: "100%",
  height: "100%",
};

function Login({ theme }) {
  const {authenticated} = useContext(dataContext)
  const history = useHistory()

  useEffect(() => {
    if(authenticated.isLogged === true) {
      <Redirect to="/" />
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  
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
        fetchUrl="/api/v1/user/login"
        page="login"
      />
    </main>
  );
}

export default Login;
