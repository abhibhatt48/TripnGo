import React, { useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import './SignUp.css';

function SignUp() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [isUsername, setIsUsername] = useState(true);

  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);

  const [password, setPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  const [confirmPassword, setConfirmPassword] = useState("");
  const [isConfirmPassword, setIsConfirmPassword] = useState(true);

  const [passwordMatch, setPasswordMatch] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  const [error, setErrormessage] = useState("");

  const handleUsernameChange = (event) => {
    const value = event.target.value;
    setUsername(value);
    setIsUsername(value.match(/^([a-zA-Z]){3,15}$/)); // Example validation condition
  };

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
    setIsEmailValid(validateEmail(value));
  };

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
    setIsPasswordValid(validatePassword(value));
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
    setIsConfirmPassword(event.target.value == password);
  };

  const validateEmail = (email) => {
    // Regular expression pattern for email validation
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  };

  const validatePassword = (password) => {
    // Regular expression pattern for password validation
    const pattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,18}$/;
    return pattern.test(password);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!username || !email || !password || !confirmPassword) {
      setErrormessage("Please fill in all required fields");
      <div>"Please fill in all required fields"</div>;
      return; // Prevent form submission
    }
    if (password === confirmPassword) {
      // Passwords match, proceed with form submission or other actions
      console.log("Passwords match");
      setPasswordMatch(true);
      // navigate("/Profile");
      window.location.href = "/profile";
    } else {
      // Passwords do not match, show an error message or take appropriate action
      console.log("Passwords do not match");
      setPasswordMatch(false);
    }
  };

  return (
    <div className="background-image">
      <Container className="central-container">
        <div className="signup-container">
          <div className="signup-overlay">
            <h1 className="title">Sign up</h1>
            <p className="subtitle">Excited about Trip'nGo!! SignUp Here</p>
          </div>
          <Row className="form-container">
            <Col lg={12} md={12}>
              {error && <p className="text-danger text-center">{error}</p>}
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className={`form-control ${!isUsername ? "is-invalid" : ""
                      }`}
                    placeholder="Username"
                    value={username}
                    onChange={handleUsernameChange}
                    error={!isUsername}
                    helperText={!isUsername ? "User name is invalid" : ""}
                    pattern="([a-zA-Z]){3,15}$"
                    required
                  />
                  {!isUsername && (
                    <div className="invalid-feedback">
                      Enter a valid Username{" "}
                      <span style={{ color: "red" }}>*</span>
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <input
                    type="email"
                    className={`form-control ${!isEmailValid ? "is-invalid" : ""
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
                    className={`form-control ${!isPasswordValid ? "is-invalid" : ""
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
                      {isPasswordValid ? (
                        <small className="form-text text-muted">
                          Password is valid.
                        </small>
                      ) : (
                        <small className="form-text text-muted text-danger">
                          Password must be at least 8 characters long and
                          contain at least one uppercase letter, one lowercase
                          letter, one digit, and one special character.
                        </small>
                      )}
                    </div>
                  )}
                  <div className="form-group">
                    <input
                      type="password"
                      className={`form-control ${!isConfirmPassword ? "is-invalid" : ""
                        }`}
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChange={handleConfirmPasswordChange}
                      required
                    />
                    {!isConfirmPassword && (
                      <div className="invalid-feedback">
                        Passwords do not match{" "}
                        <span style={{ color: "red" }}>*</span>
                      </div>
                    )
                    }
                  </div>
                </div>
                <button type="submit" className="button button-secondary button-100p">
                  Sign up
                </button>
                {submitted && (
                  <p className="submitted-message">
                    SignUp Successful. Thank you!
                  </p>
                )}

                <button
                  type="submit"
                  className="button button-primary button-100p"
                  style={{ marginTop: "10px" }}
                >
                  Sign up with Google
                </button>
                {<p className="submitted-message">Or</p>}

                <div className="d-flex flex-column">
                  <p class="submitted-message">Already have an account?</p>
                  <button
                    onClick={() => {
                      navigate("/login");
                    }}
                    className="button button-primary button-login"
                  >
                    Login
                  </button>
                </div>
              </form>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
}

export default SignUp;
