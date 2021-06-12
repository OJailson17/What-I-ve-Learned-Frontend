import React from "react";

import Form from "../../../components/Form/Form";
import PageTitle from "../../../components/PageTitle/PageTitle";

const styles = {
  width: "100%",
  height: "100%",
};

function Login({ theme }) {
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
