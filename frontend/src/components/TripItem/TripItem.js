import './TripItem.css';
import Card from 'react-bootstrap/Card';
import React from 'react';
import { useNavigate } from "react-router-dom";

const TripItem = ({ trip }) => {
    const item_title = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.".substring(0, 30) + "...";
    const item_location = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.".substring(0, 50) + "...";
    const item_description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.".substring(0, 100) + "...";

    const navigate = useNavigate();

    return (
        <Card className="trip-item" onClick={() => {
            navigate('/package-details');
        }}>
            <Card.Img className='trip-item__image' variant="top" src={trip.image} />
            <Card.Body>
                <Card.Title className='trip-item__title'>{item_title}</Card.Title>
                <div className="trip-item__info-container">
                    <span className='trip-item__price'>500$</span>
                    <span className='trip-item__rating'>4.5/5.0</span>
                </div>
                <Card.Subtitle className="mb-2 text-muted">{item_location}</Card.Subtitle>
                <Card.Text>
                    {item_description}
                </Card.Text>
            </Card.Body>
        </Card>
    );
};

export default TripItem;