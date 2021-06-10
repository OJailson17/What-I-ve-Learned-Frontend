import React, { useState } from "react";
import { Button, Checkbox, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

import "./Form.css";

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
}) {
  const classes = useStyles();

  const [checked, setChecked] = useState(true);

  const hiddenInputStyle = {
    display: hiddenInput ? "none" : "",
  };
  const hiddenCheckStyle = {
    display: hiddenCheck ? "none" : "",
  };

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

  return (
    <div className="form-container">
      <form>
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
            // required={!hiddenInput}
          />
          <TextField
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
            // required
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
            // required
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
            // required={!hiddenInput}
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
