import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { Link } from "react-router-dom";

const Register = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const readValue = (event, keyName) => {
    setUser({
      ...user,
      [keyName]: event.target.value,
    });
  };

  const registerUser = () => {
    fetch("https://varindersingh.pythonanywhere.com/register/", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((message) => {
        if (message.code === 0) {
          // Handle registration error, if any
          console.log(message.message);
        } else {
          // On successful registration, redirect to login page
          navigate("/login");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
       <div class="hero-section">
                <div class="login-main">
                   <h1>Register</h1>
                   <h3>Enter your login credentials</h3>
                    <form>
                        <label for="first" class="login-lables"> Username: </label>
                        <input class="login-input" type="text"
                onKeyUp={(event) => readValue(event, "username")}
                placeholder="Username"/>
             
                        <label for="password" class="login-lables"> Password:</label>
                        <input class="login-input" type="password"
                onKeyUp={(event) => readValue(event, "password")}
                placeholder="Password"/>

                      <label for="email" class="login-lables"> Email:</label>
                        <input class="login-input" type="email"
                onKeyUp={(event) => readValue(event, "email")}
                placeholder="Email" />
            
                        <button type="button" class="submit-btn" onClick={registerUser} >Login</button>
                    </form>

                    <p class="signup-link">already registered ? <Link to="/login">Login to an account</Link></p>
                </div>
        </div>
    </>
  );
};

export default Register;
