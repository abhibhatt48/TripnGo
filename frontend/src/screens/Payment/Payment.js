// Author: Abhishek Bhatt

import React, { useState } from 'react';
import axios from 'axios';
import { Row, Col, Container } from 'react-bootstrap';
import APIs from 'Constants';
import './Payment.css';

function Payment() {
  const [name] = useState('John Doe');
  const [packageName] = useState('Halifax');
  const [amount] = useState(1000);
  const [promoCode, setPromoCode] = useState('');
  const [discountedAmount, setDiscountedAmount] = useState(amount);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const handlePromoCodeChange = (e) => {
    setPromoCode(e.target.value);

    if (e.target.value === 'tripngo') {
      setDiscountedAmount(amount * 0.85);
    } else {
      setDiscountedAmount(amount);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {};

    if (!promoCode.trim()) {
      errors.promoCode = 'Promo Code is required';
    }

    if (Object.keys(errors).length === 0) {
      const formData = {
        name,
        packageName,
        amount: discountedAmount,
      };

      try {
        const response = await axios.post(APIs.CREATE_SESSION, formData);
        if (response.data.success) {
          window.location.href = response.data.data.link;
        } else {
          throw new Error('Failed to create payment session');
        }
        setPromoCode('');
        setSubmitted(true);
      } catch (error) {
        console.log(error);
      }
    } else {
      setErrors(errors);
    }
  };

  return (
    <div className="background-image">
      <Container className="central-container">
        <div className="payment-container">
          <div className="payment-overlay">
            <h1 className="title">Payment</h1>
            <p className="subtitle">Name: {name}</p>
            <p className="subtitle">Package Name: {packageName}</p>
            <p className="subtitle">Amount: ${amount}</p>
            <p className="subtitle">Discounted Amount: ${discountedAmount.toFixed(2)}</p>
            <Row className="form-container">
            <Col lg={6} md={8} sm={12}> 
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <input
                      type="text"
                      className={`form-control ${errors.promoCode ? 'is-invalid' : ''}`}
                      placeholder="Enter Promo Code"
                      value={promoCode}
                      onChange={handlePromoCodeChange}
                    />
                    {errors.promoCode && <div className="invalid-feedback">{errors.promoCode}</div>}
                  </div>
                  <div className="button-container">
                    <button type="submit" className="button button-secondary button-100p">
                      Submit
                    </button>
                  </div>
                  {submitted && <p className='submitted-message'>Payment submitted. Thank you!</p>}
                </form>
              </Col>
            </Row>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Payment;
