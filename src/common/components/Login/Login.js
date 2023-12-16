import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { updateAuthToken } from "../../signals/AuthTokenSignal";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://big.kapsi.fi/login", { username, pw: password })
      .then((resp) => {
        updateAuthToken(resp.data.jwtToken);
        if (resp.data.jwtToken) {
          sessionStorage.setItem("token", resp.data.jwtToken);
          // Kirjautuminen onnistui, ohjaa käyttäjä sivulle user dashboard
          navigate("/user");
        }
      })
      .catch((error) => {
        console.error(error.message);
        setErrorMessage("Wrong username or password");

      });
  };

  return (
    <div className="login_template d-flex justify-content-center align-items-center vh-100">
      <div className="form_container p-5 rounded">
        <form onSubmit={handleSubmit}>
          <h3 className="text-center">Kirjaudu sisään</h3>
          {errorMessage && (
            <div className="alert alert-danger">{errorMessage}</div>
          )}
          <div className="mb-2">
            <label htmlFor="username">käyttäjätunnus</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              placeholder="Aseta käyttäjätunnus"
              className="form-control"
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="password">Salasana</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Anna salasana"
              className="form-control"
              required
            />
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Kirjaudu sisään
            </button>
          </div>
          <p className="text-end mt-2">
            Unohtuiko <a href="#">Salasana?</a>
            <Link to="/signup" className="ms-2">
              Rekisteröidy
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
