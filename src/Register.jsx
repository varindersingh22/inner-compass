import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
      <div className="register-title">
        <h4>Register</h4>
      </div>
      <div className="register-form mt-4">
        <form>
          <div className="form-row">
            <div className="form-group col-md-12">
              <input
                type="text"
                onKeyUp={(event) => readValue(event, "username")}
                className="form-control"
                placeholder="Username"
              />
            </div>
            <div className="form-group col-md-12">
              <input
                type="password"
                onKeyUp={(event) => readValue(event, "password")}
                className="form-control"
                placeholder="Password"
              />
            </div>
            <div className="form-group col-md-12">
              <input
                type="email"
                onKeyUp={(event) => readValue(event, "email")}
                className="form-control"
                placeholder="Email"
              />
            </div>
          </div>
          <div className="form-row">
            <button
              type="button"
              className="btn btn-primary btn-block"
              onClick={registerUser}
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
