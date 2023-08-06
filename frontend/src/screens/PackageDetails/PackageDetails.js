import './PackageDetails.css';
import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import APIs from 'Constants';

function PackageDetails() {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const tripId = searchParams.get('trip');
    const [trip, setTrip] = React.useState({});

    React.useEffect(() => {
        axios.get(`${APIs.PACKAGE_DETAILS}/${tripId}`).then((res) => {
            setTrip(res.data);
        });
    }, [tripId]);

    return (
        <>
            <div className="package-details-container">
                <div className='page-header'>This is Package details page. {tripId}</div>
                <button className='button button-primary' onClick={() => navigate('/payment')}>Go to Payment</button>
            </div>
        </>
    );
}

export default PackageDetails;
