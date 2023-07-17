import React, { useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
    const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);

  const [password, setPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [error, setErrormessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
  };

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!email || !password) {
      setErrormessage("Please fill in all required fields");
      <div>"Invalid Username or Password"</div>;
      return; // Prevent form submission
    } else {
      // Passwords match, proceed with form submission or other actions
      console.log("Valid Credentials");

       navigate("/userprofile");
    }
  };

  return (
    <div className="background-image">
      <Container className="central-container">
        <div className="login-container">
          <div className="login-overlay">
            <h1 className="title">Login</h1>
            <p className="subtitle">Ready for your Next Trip? </p>
          </div>
          <Row className="form-container">
            <Col lg={{ span: 12 }} md={{ span: 12 }}>
              {/* {error && <p className="text-danger text-center">{error}</p>} */}
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
                    type="email"
                    className={`form-control ${
                      !isEmailValid ? "is-invalid" : ""
                    }`}
                    placeholder="Email"
                    value={email}
                    onChange={handleEmailChange}
                    required
                  />
                  {!isEmailValid && (
                    <div className="invalid-feedback">Invalid email format</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={`form-control ${
                      !isPasswordValid ? "is-invalid" : ""
                    }`}
                    placeholder="Password"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                  />
                  {!isPasswordValid && (
                    <div className="invalid-feedback">
                      Enter a valid Password{" "}
                      <span style={{ color: "red" }}>*</span>
                    </div>
                  )}
                </div>
                <button
                  type="submit"
                  className="button button-secondary button-100p"
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  Login
                </button>
                {submitted && (
                  <p className="submitted-message">Login Successful</p>
                )}

                <button
                  type="submit"
                  className="button button-primary button-100p"
                  style={{ marginTop: "10px" }}
                >
                  Login with Google
                </button>
              </form>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
}

export default Login;
