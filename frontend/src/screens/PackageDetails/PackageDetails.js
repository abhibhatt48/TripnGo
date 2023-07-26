import './PackageDetails.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function PackageDetails() {
    const navigate = useNavigate();


    return (
        <div className="package-details-container">
            <div className='page-header'>This is Package details page.</div>
            <button className='button button-primary' onClick={() => navigate('/payment')}>Go to Payment</button>
        </div>
    );
}

export default PackageDetails;
