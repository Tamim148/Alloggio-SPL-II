import axios from "axios";
import React, { useContext, useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./login.css";

function Login() {
  const [data, setData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8800/api/auth/login";
      const { data: res } = await axios.post(url, data);

      localStorage.setItem("token", res.token);
      // set user from the database to context
      dispatch({ type: "LOGIN_SUCCESS", payload: res.details });
      navigate("/", { replace: true });
    } catch (error) {
      console.log(error);
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  const handleGoogleLogin = async (e)  => {
    // Redirect the user to the Google authentication URL
    // window.location.href = ";
    try {
      const url = "http://localhost:8800/api/auth/google/";
      const { data: res } = await axios.get(url, data);

      localStorage.setItem("token", res.token);
      // set user from the database to context
      dispatch({ type: "LOGIN_SUCCESS", payload: res.details });
      navigate("/", { replace: true });
    } catch (error) {
      console.log(error);
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };
  

  // const handleGoogleLoginSuccess = async () => {
    
  //   try {
  //     // You might want to customize the URL based on your setup
  //     const url = "http://localhost:8800/api/auth/login/success";
  //     const { data: res } = await axios.get(url);

  //     if (res.error) {
  //       setError("Google login failed");
  //     } else {
  //       dispatch({ type: "GOOGLE_LOGIN_SUCCESS", payload: res.user });
  //       navigate("/", { replace: true });
  //     }
  //   } catch (error) {
  //     console.log("Error handling Google login callback:", error);
  //     setError("Google login failed");
  //   }
  // };

  // useEffect(() => {
  //   // Check if the current route is the Google login success route
  //   if (window.location.pathname === "/google-login-success") {
  //     handleGoogleLoginSuccess();
  //   }
  // }, []);

  return (
    <div className="login_container">
      <div className="login_form_container">
        <div className="Login_left">
          <form className="Login_form_container" onSubmit={handleSubmit}>
            <h1>Login to Your Account</h1>
            <input
              type="username"
              placeholder="Username"
              name="username"
              onChange={handleChange}
              value={data.username}
              required
              className="Login_input"
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={data.password}
              required
              className="Login_input"
            />
            <Link to="/forgot-password" style={{ alignSelf: "flex-start" }}>
              <p style={{ padding: "0 15px" }}>Forgot Password?</p>
            </Link>
            {error && <div className="Login_error_msg">{error}</div>}
            <button type="submit" className="Login_green_btn">
              Sign In
            </button>
          </form>
          {/* Google login button */}
          <button onClick={handleGoogleLogin} className="Login_google_btn">
            Sign In with Google
          </button>
        </div>
        <div className="Login_right">
          <h1>New Here ?</h1>
          <Link to="/register">
            <button type="button" className="Login_white_btn">
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
