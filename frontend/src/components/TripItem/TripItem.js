import './TripItem.css';
import Card from 'react-bootstrap/Card';
import React from 'react';
import { useNavigate } from "react-router-dom";

const TripItem = ({ trip }) => {
    const item_title = trip.title;
    const item_location = trip.location.length > 50 ? trip.location.substring(0, 50) + "..." : trip.location;
    const item_description = trip.description.length > 100 ? trip.description.substring(0, 100) + "..." : trip.description;
    const item_cost = trip.cost;
    const item_rating = trip.rating;

    const navigate = useNavigate();

    return (
        <Card className="trip-item" onClick={() => {
            navigate('/package-details');
        }}>
            <Card.Img className='trip-item__image' variant="top" src={trip.image} />
            <Card.Body>
                <Card.Title className='trip-item__title'>{item_title}</Card.Title>
                <div className="trip-item__info-container">
                    <span className='trip-item__price'>{item_cost}$</span>
                    <span className='trip-item__rating'>{item_rating}/5.0</span>
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