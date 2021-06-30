import React, { useContext, useEffect, useState } from "react";
import { Button, Checkbox, TextField } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import storage from "local-storage-fallback";

import { dataContext } from "../../Context";
import { useStyles } from "../../Helper/changeInputColor";
import "./Form.css";

const inputStyle = {
  marginTop: "30px",
};

const linkStyle = {
  dark: {
    color: "#eee",
    textDecoration: "underline",
  },
  light: {
    color: "#000",
    textDecoration: "underline",
  },
};

const btnStyle = {
  dark: {
    background: "#0821d4",
  },
  light: {
    background: "#025ceb",
  },
};

const checkboxStyle = {
  dark: {
    color: "#0821d4",
  },
  light: {
    color: "#025ceb",
  },
};

function Form(props) {
  const classes = useStyles();

  const {
    setAuthenticated,
    setUserInfo,
    userInfo,
    userId,
    setUserId,
    isChecked,
    setIsChecked,
  } = useContext(dataContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [name, setName] = useState("");
  const [inputError, setInputError] = useState(false);
  const [nameErrorMsg, setNameErrorMsg] = useState("");
  const [emailErrorMsg, setEmailErrorMsg] = useState("");
  const [passErrorMsg, setPassErrorMsg] = useState("");

  const hiddenInputStyle = {
    display: props.hiddenInput ? "none" : "",
  };
  const hiddenCheckStyle = {
    display: props.hiddenCheck ? "none" : "",
  };

  useEffect(() => {
    setUserId(userInfo._id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo]);

  useEffect(() => {
    storage.setItem("userId", userId);
  }, [userId]);

  const bodyData = () => {
    return props.page === "login"
      ? { email, password }
      : props.page === "signup"
      ? { name, email, password }
      : "Error";
  };

  const setToStorage = (token) => {
    storage.setItem("token", token);
  };

  const handleFetchError = (err) => {
    setInputError(true);
    console.log(err);
    if (err.indexOf("Email") !== -1 || err.indexOf("email") !== -1) {
      setEmailErrorMsg(err);
    } else if (err.indexOf("Password") !== -1 || err.indexOf("password") !== -1) {
      setPassErrorMsg(err);
    } else if(err.indexOf("name") !== -1) {
      setNameErrorMsg(err)
    } else {
      return
    }
  };

  const history = useHistory();

  // Set user informations to states e redirect to home page
  const setUserInfos = (data) => {
    if (data.error) {
      handleFetchError(data.error);
    } else {
      setUserInfo(data.user);
      setAuthenticated({ isLogged: data.logged });
      setToStorage(data.token);
      history.push("/");
    }
  };

  // API call to backend
  const fetchData = () => {
    fetch(props.fetchUrl, {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyData()),
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => setUserInfos(data))
      .catch((err) => console.log(err));
  };

  // Check if the password are equal e call fetch function
  const handleSubmit = (e) => {
    e.preventDefault();

    if (props.page === "signup") {
      if (password === password2) {
        fetchData();
      } else {
        alert("As senhas devem ser iguais");
      }
    } else {
      fetchData();
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="inputs">
          <TextField
            error={nameErrorMsg.length > 0}
            style={hiddenInputStyle}
            id="name"
            name="name"
            className={
              props.theme.mode === "Dark" && !inputError
                ? `${classes.root} form-input`
                : `${inputError} form-input`
            }
            label={nameErrorMsg.length > 0 ? "Error" : "Name" }
            variant="outlined"
            autoComplete="off"
            onChange={(e) => setName(e.target.value)}
            value={name}
            helperText={inputError ? nameErrorMsg : ""}
            required={!props.hiddenInput}
          />
          <TextField
            error={emailErrorMsg.length > 0}
            type="email"
            id="email outlined-error-helper-text"
            name="email"
            className={
              props.theme.mode === "Dark" && !inputError
                ? `${classes.root} form-input`
                : `${inputError} form-input`
            }
            label={emailErrorMsg.length > 0 ? "Error" : "Email"}
            variant="outlined"
            style={inputStyle}
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            helperText={inputError ? emailErrorMsg : ""}
            required
          />
          <TextField
            error={passErrorMsg.length > 0}
            id="password"
            name="password"
            className={
              props.theme.mode === "Dark" && !inputError
                ? `${classes.root} form-input`
                : `${inputError} form-input`
            }
            label={passErrorMsg.length > 0 ? "Error" : "Password"}
            type="password"
            autoComplete="current-password"
            variant="outlined"
            style={inputStyle}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            helperText={inputError ? passErrorMsg : ""}
            required
          />
          <TextField
            id="password-repeated"
            className={
              props.theme.mode === "Dark"
                ? `${classes.root} form-input`
                : "form-input"
            }
            label="Confirm Password"
            type="password"
            autoComplete="current-password"
            variant="outlined"
            style={{ ...hiddenInputStyle, ...inputStyle }}
            required={!props.hiddenInput}
            onChange={(e) => setPassword2(e.target.value)}
            value={password2}
          />
        </div>
        <div className="remember-checkbox" style={hiddenCheckStyle}>
          <Checkbox
            id="check"
            checked={isChecked}
            color="primary"
            inputProps={{ "aria-label": "secondary checkbox" }}
            onChange={(e) => {
              setIsChecked(e.target.checked);
            }}
            style={
              props.theme.mode === "Dark"
                ? checkboxStyle.dark
                : checkboxStyle.light
            }
          />
          <label htmlFor="check">Remember me</label>
        </div>
        <div className="submit-container">
          <Button
            className="submit-btn"
            variant="contained"
            color="primary"
            disableElevation
            type="submit"
            style={props.theme.mode === "Dark" ? btnStyle.dark : btnStyle.light}
          >
            {props.buttonText}
          </Button>
        </div>
        <div className="helper-p">
          <p>
            Don't have an account?{" "}
            <Link
              style={
                props.theme.mode === "Dark" ? linkStyle.dark : linkStyle.light
              }
              to={`${props.linkPage}`}
            >
              {props.helperText}
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Form;
