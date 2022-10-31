import { Alert, CircularProgress } from "@mui/material";
import { useRef } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../utils/axios";

import "./register.scss";

export default function Register() {
  console.log("Register");
  window.title = "Coolstream";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loadings, setLoadings] = useState(false);
  const [alart, setAlart] = useState({
    msg: "This is a success alert — check it out!",
    color: "success",
    severity: "success",
  });
  const [showAlart, setShowAlart] = useState(false);
  const navigate = useNavigate();

  const emailRef = useRef();
  const passwordRef = useRef();
  const usernameRef = useRef();

  const login = () => {
    navigate("/login");
  };

  const handleStart = () => {
    setAlart(false);
    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (emailRef.current.value.match(mailformat)) {
      setEmail(emailRef.current.value);
      setAlart(false);
    } else {
      setAlart({
        msg: "Invalid email address",
        color: "error",
        severity: "error",
      });
      setShowAlart(true);
    }
  };
  const handleFinish = async (e) => {
    e.preventDefault();
    setShowAlart(false);
    setPassword(passwordRef.current.value);
    setUsername(usernameRef.current.value);
    try {
      if (username && password) {
        setLoadings(true);
        await axiosInstance.post("auth/register", {
          email,
          username,
          password,
        });
        setAlart({
          msg: "Success. You can proceed to login",
          color: "success",
          severity: "success",
        });
        setShowAlart(true);
        setLoadings(false);
      } else {
        setAlart({
          msg: "Enter your email and password",
          color: "error",
          severity: "error",
        });
        setLoadings(false);
        setShowAlart(true);
      }
    } catch (err) {
      console.log(err);
      setAlart({
        msg: err.response
          ? err.response.data
          : "Something went wrong. Please try again!",
        color: "error",
        severity: "error",
      });
      setShowAlart(true);
      setLoadings(false);
    }
  };
  return (
    <div className="register">
      <div className="top">
        <div className="wrapper">
          <img
            className="logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
            alt=""
          />

          <button className="loginButton" onClick={login}>
            Sign In
          </button>
        </div>
      </div>
      <div className="container">
        {showAlart && (
          <Alert severity={alart.severity} color={alart.color}>
            {alart.msg}
          </Alert>
        )}
        <h1>Unlimited movies, TV shows, and more.</h1>
        <h2>Watch anywhere. Cancel anytime.</h2>
        <p>
          Ready to watch? Enter your email to create or restart your membership.
        </p>
        {!email ? (
          <div className="input">
            <input type="email" placeholder="email address" ref={emailRef} />
            <button className="registerButton" onClick={handleStart}>
              Get Started
            </button>
          </div>
        ) : (
          <form className="input">
            <input type="username" placeholder="username" ref={usernameRef} />
            <input type="password" placeholder="password" ref={passwordRef} />
            <button
              className="registerButton"
              onClick={handleFinish}
              disabled={loadings}
            >
              Start{" "}
              {loadings && (
                <CircularProgress
                  className="circle"
                  sx={{
                    color: "white",
                    zIndex: 1,
                  }}
                />
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
