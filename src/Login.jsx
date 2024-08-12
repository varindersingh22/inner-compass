import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import loginbg from '../public/images/Loginbg.png';
import { Link } from "react-router-dom"; 

const Login = () => {
  const [logConf, setLogConf] = useState(false);
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const hideLogMessage = () => {
    setLogConf(false);
  };

  const readValue = (event, keyName) => {
    setUser({
      ...user,
      [keyName]: event.target.value,
    });
  };

  const loginUser = () => {
    fetch("https://varindersingh.pythonanywhere.com/login/", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((message) => {
        if (message.code === 0) {
          setLogConf(true);
        } else {
          localStorage.setItem("authToken", message.token);
          localStorage.setItem("authStatus", "true");
          localStorage.setItem("userID", message.user.id);
          localStorage.setItem("userName", message.user.username);

          navigate("/dashboard"); // Use navigate to redirect
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div class="hero-section" style={{
        backgroundImage: `url(${loginbg})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        backgroundSize: 'cover',
      }}>
                <div class="login-main">
                    <h1>Login</h1>
                    <h3>Enter your login credentials</h3>
                    <form>
                        <label for="first" class="login-lables"> Username: </label>
                        <input class="login-input" type="name" onKeyUp={(event) => readValue(event, "username")}
                placeholder="Username"/>
             
                        <label for="password" class="login-lables"> Password:</label>
                        <input class="login-input" type="password"
                onKeyUp={(event) => readValue(event, "password")}
                placeholder="Password"/>
            
                        <button type="button" class="submit-btn" onClick={loginUser} >Login</button>
                    </form>

                    <p class="signup-link">Not registered yet? <Link to="/register">Create an account</Link></p>
                </div>
        </div>
    </>
  );
};

export default Login;
