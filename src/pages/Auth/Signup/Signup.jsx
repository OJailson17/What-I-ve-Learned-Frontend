import React from "react";

import Form from "../../../components/Form/Form";
import PageTitle from "../../../components/PageTitle/PageTitle";

function Signup({ theme }) {
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
