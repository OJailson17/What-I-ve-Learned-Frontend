import React, { useContext, useState } from "react";
import { Button, Checkbox, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link, useHistory } from "react-router-dom";

import "./Form.css";
import { dataContext } from "../../Context";
import storage from "local-storage-fallback";

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

// Change input's border color
const useStyles = makeStyles({
  root: {
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "white",
    },
    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "blue",
    },
    "& .MuiOutlinedInput-input": {
      color: "white",
    },
    "& .MuiInputLabel-outlined": {
      color: "#c5c5c5",
    },
  },
});

function Form({
  buttonText,
  hiddenInput,
  hiddenCheck,
  helperText,
  linkPage,
  theme,
  fetchUrl,
  page,
}) {
  const classes = useStyles();
  const { setAuthenticated, setUserData } =
    useContext(dataContext);

  const [checked, setChecked] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [name, setName] = useState("");

  const hiddenInputStyle = {
    display: hiddenInput ? "none" : "",
  };
  const hiddenCheckStyle = {
    display: hiddenCheck ? "none" : "",
  };

  const bodyData = () => {
    return page === "login"
      ? { email, password }
      : page === "signup"
      ? { name, email, password }
      : "Error";
  };

  const setToStorage = (token) => {
    storage.setItem("token", token);
  };

  const handleFetchError = (err) => {
    console.log(err);
  };

  const history = useHistory();

  const setUserInfos = (data) => {
    if (data.error) {
      handleFetchError(data.error);
    } else {
      setUserData(data.user);
      setAuthenticated({ isLogged: data.logged });
      setToStorage(data.token);
      history.push("/");
    }
  };

  const fetchData = () => {
    fetch(fetchUrl, {
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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (page === "signup") {
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
      <form onSubmit={handleSubmit}>
        <div className="inputs">
          <TextField
            style={hiddenInputStyle}
            id="name"
            name="name"
            className={
              theme.mode === "Dark"
                ? `${classes.root} form-input`
                : "form-input"
            }
            label="Name"
            variant="outlined"
            autoComplete="off"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required={!hiddenInput}
          />
          <TextField
            type="email"
            id="email"
            name="email"
            className={
              theme.mode === "Dark"
                ? `${classes.root} form-input`
                : "form-input"
            }
            label="Email"
            variant="outlined"
            style={inputStyle}
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
          <TextField
            id="password"
            name="password"
            className={
              theme.mode === "Dark"
                ? `${classes.root} form-input`
                : "form-input"
            }
            label="Password"
            type="password"
            autoComplete="current-password"
            variant="outlined"
            style={inputStyle}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
          <TextField
            id="password-repeated"
            className={
              theme.mode === "Dark"
                ? `${classes.root} form-input`
                : "form-input"
            }
            label="Confirm Password"
            type="password"
            autoComplete="current-password"
            variant="outlined"
            style={{ ...hiddenInputStyle, ...inputStyle }}
            required={!hiddenInput}
            onChange={(e) => setPassword2(e.target.value)}
            value={password2}
          />
        </div>
        <div className="remember-checkbox" style={hiddenCheckStyle}>
          <Checkbox
            id="check"
            checked={checked}
            color="primary"
            inputProps={{ "aria-label": "secondary checkbox" }}
            onChange={(e) => {
              setChecked(e.target.checked);
            }}
            style={
              theme.mode === "Dark" ? checkboxStyle.dark : checkboxStyle.light
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
            style={theme.mode === "Dark" ? btnStyle.dark : btnStyle.light}
          >
            {buttonText}
          </Button>
        </div>
        <div className="helper-p">
          <p>
            Don't have an account?{" "}
            <Link
              style={theme.mode === "Dark" ? linkStyle.dark : linkStyle.light}
              to={`${linkPage}`}
            >
              {helperText}
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Form;
