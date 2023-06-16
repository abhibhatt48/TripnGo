import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import './ContactUs.css';

function ContactUs() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Simulate form submission delay
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setSubmitted(true);
  };

  return (
    <div className='contact-us-container'>
      <div className='contact-us-overlay'>
        <h1 className='title'>Contact Us</h1>
        <p className='subtitle'>Have any questions or feedback? Let us know!</p>
      </div>
      <Row className='form-container'>
        <Col lg={{ span: 6, offset: 3 }} md={{ span: 8, offset: 2 }}>
          <form onSubmit={handleSubmit}>
            <div className='form-group'>
              <input type='text' className='form-control' placeholder='Your Name' required />
            </div>
            <div className='form-group'>
              <input type='email' className='form-control' placeholder='Your Email' required />
            </div>
            <div className='form-group'>
              <textarea className='form-control' rows='5' placeholder='Your Message' required></textarea>
            </div>
            <button type='submit' className='button'>
              Submit
            </button>
            {submitted && <p className='submitted-message'>Response submitted. Thank you!</p>}
          </form>
        </Col>
      </Row>
    </div>
  );
}

export default ContactUs;
