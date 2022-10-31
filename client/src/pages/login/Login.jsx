import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { login } from "../../authContext/apiCalls";
import { AuthContext } from "../../authContext/AuthContext";
import "./login.scss";
import CircularProgress from "@mui/material/CircularProgress";
import { Alert } from "@mui/material";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { dispatch, error, isFetching } = useContext(AuthContext);
  const [alart, setAlart] = useState({
    msg: "This is a success alert — check it out!",
    color: "success",
    severity: "success",
  });
  const [showAlart, setShowAlart] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setShowAlart(false);
    if (email && password) {
      e.preventDefault();
      login({ email, password }, dispatch);
    } else {
      setAlart({
        msg: "Enter your email and password",
        color: "error",
        severity: "error",
      });
      setShowAlart(true);
    }
  };
  return (
    <div className="login">
      <div className="top">
        <div className="wrapper">
          <img
            className="logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
            alt=""
          />
        </div>
      </div>
      <div className="container">
        <form>
          {showAlart && (
            <Alert severity={alart.severity} color={alart.color}>
              {alart.msg}
            </Alert>
          )}
          <h1>Sign In</h1>
          <input
            type="email"
            required={true}
            placeholder="Email or phone number"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="loginButton"
            onClick={handleLogin}
            disabled={isFetching}
          >
            Sign In{" "}
            {isFetching && (
              <CircularProgress
                size={30}
                sx={{
                  color: "white",
                  zIndex: 1,
                }}
              />
            )}
          </button>
          <div className="error">{error}</div>
          <span>
            New to Netflix?{" "}
            <b>
              {" "}
              <Link
                to="/register"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                {" "}
                Sign up now.{" "}
              </Link>{" "}
            </b>
          </span>
          <small>
            This page is protected by Google reCAPTCHA to ensure you're not a
            bot. <b>Learn more</b>.
          </small>
        </form>
      </div>
    </div>
  );
}
