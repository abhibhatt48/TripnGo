import React, { useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./ForgotPassword.css";
import axios from "axios";

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);

  const [error, setErrormessage] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpValid, setIsOtpValid] = useState(false);
  const [showOtpField, setShowOtpField] = useState(false);

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
  };

  const handleOtpChange = (event) => {
    const value = event.target.value;
    // Assuming here that the OTP should be exactly 6 digits
    if (/^\d{6}$/.test(value)) {
      setIsOtpValid(true);
      setOtp(value);
    } else {
      setIsOtpValid(false);
    }
  };

  const handleSendOtp = async (event) => {
    event.preventDefault();
    // Here, you can add the logic to send the OTP to the user's email
    // For simplicity, I'll just set setShowOtpField to true to activate the OTP field
    setShowOtpField(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Here, you can add the logic to validate the OTP and reset the password
    // For simplicity, I'll just log the success message and navigate back to login
    console.log("OTP verified. Proceed with password reset.");
    navigate("/login");
  };

  return (
    <div className="background-image">
      <Container className="central-container">
        <div className="login-container">
          <div className="login-overlay">
            <h1 className="title">Forgot Password?</h1>
          </div>
          <Row className="form-container">
            <Col lg={12} md={12}>
              {error && <p className="text-danger text-center">{error}</p>}
              <form>
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

               {!showOtpField ? (
                  <button
                    type="button"
                    className="button button-primary button-100p"
                    style={{ marginTop: "10px" }}
                    onClick={handleSendOtp}
                  >
                    Send OTP
                  </button>
                ) : (
                  <div className="form-group">
                    <input
                      type="text"
                      className={`form-control ${
                        !isOtpValid ? "is-invalid" : ""
                      }`}
                      placeholder="Enter OTP"
                      value={otp}
                      onChange={handleOtpChange}
                      required
                    />
                    {!isOtpValid && (
                      <div className="invalid-feedback">
                        OTP must be 6 digits
                      </div>
                    )}
                    <button
                      type="submit"
                      className="button button-primary button-100p"
                      style={{ marginTop: "10px" }}
                      onClick={handleSubmit}
                    >
                      Submit
                    </button>
                  </div>
                )}
              </form>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
}

export default ForgotPassword;
