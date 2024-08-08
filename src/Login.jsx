import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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

          navigate("/"); // Use navigate to redirect
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="login-title">
        <h4>Log In</h4>
      </div>
      <div className="login-form mt-4">
        <form>
          <div className="form-row">
            <div className="form-group col-md-12">
              <input
                type="name"
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
          </div>
          <div className="form-row">
            <div className="form-group">
              <div className="form-check"></div>
            </div>
          </div>
          <div className="form-row">
            <button
              type="button"
              className="btn btn-danger btn-block"
              onClick={loginUser}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
