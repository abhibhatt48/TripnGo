 // Author: Sai Sindhu Bhimavarapu

import React from 'react';
import '../Dashboard/Dashboard.css'
import dubai from 'assets/Dubai.jpg';
import forest from 'assets/forest.jpg'
import downtown from 'assets/downtown.jpg'
import bird from 'assets/Hummingbird.jpg'
import art from 'assets/Artgallery.jpg'
import museum from 'assets/museum.png'
import nature from 'assets/nature.jpg'
import night from 'assets/Nightlights.jpeg'
import port from 'assets/port.jpeg'
import balloons from 'assets/balloons.jpg'
import beach from 'assets/beach.jpeg'
import mummies from 'assets/mummies.jpeg'
import { TravelPackages } from './TravelPackages';
import TripItem from 'components/TripItem';
import { Row, Col, Container } from 'react-bootstrap';
import { Modal, Button } from 'react-bootstrap';


function MoreTrips() {
  const [filteredTrips, setFilteredTrips] = React.useState(TravelPackages);
  const [searchText, setSearchText] = React.useState('');
  const [selectedLocations, setSelectedLocations] = React.useState('');
  const [selectedPriceRange, setSelectedPriceRange] =  React.useState('');
  const [showFilterPopup, setShowFilterPopup] = React.useState(false);
// Sample data for locations and price ranges
    const locations = ['Halifax', 'Montreal', 'Ottawa', 'Ontario'];
    const priceRanges = ['100-500', '501-1000', '1001-1700'];

const packageImages = [
    dubai,
    forest,
    downtown,
    bird,
    art,
    museum,
    nature,
    night,
    port,
    balloons,
    beach,
    mummies,
  ];
  const onSearchTextChange = (e) => {
    setSearchText(e.target.value);
    const filteredTrips = TravelPackages.filter((trip) => {
      return trip.title.toLowerCase().includes(e.target.value.toLowerCase());
  });
  setFilteredTrips(filteredTrips);
  };

  const onSearchClick = (e) => {
    e.preventDefault();
    console.log('Search button clicked');
};
const onFilterClick = (e) => {
     setShowFilterPopup(true); // Set the state to true to show the popup
}
const handleLocationChange=(location)=>{
    const updatedLocations=selectedLocations.includes(location)?selectedLocations.filter((loc)=>loc!==location):[...selectedLocations,location];
    setSelectedLocations(updatedLocations);
}
const handlePriceRangeChange=(range)=>{
    const updatedPriceRange=selectedPriceRange.includes(range)?selectedPriceRange.filter((r)=>r!==range):[...selectedPriceRange,range];
    setSelectedPriceRange(updatedPriceRange);
}
const onFilterDone = () => {
    setShowFilterPopup(false); // Hide the popup after clicking "Done"
    // Filter the packages based on selectedLocations and selectedPriceRange
    const filteredTrips = TravelPackages.filter((trip) => {
      const isLocationSelected = selectedLocations.length === 0 || selectedLocations.includes(trip.location);
      const isPriceRangeSelected = selectedPriceRange.length === 0 || selectedPriceRange.includes(trip.priceRange);
      return isLocationSelected && isPriceRangeSelected;
    });
    setFilteredTrips(filteredTrips);
  };
return (
<div className='dashboard-container'>
<Row className='search-container'>
                <Col lg={{ span: 6 }} md={{ span: 5 }}>
                    <input className="search-input" type="text" placeholder="Search" onChange={onSearchTextChange} />
                </Col>
                <Col lg={{ span: 1 }} md={{ span: 2 }}>
                    <button className="button button-primary button-md-100p"
                        onClick={onSearchClick}
                    >Search</button>
                </Col>
                <Col lg={{ span: 1 }} md={{ span: 2 }}>
                    <button className="button button-primary button-md-100p" onClick={onFilterClick}
                    >Filter</button>
                </Col>
</Row>
  <div className="trips-container">
                <h1 className="title">Travel packages</h1>
                <Container className='trips-item-container'>
                    <Row className="g-4 justify-content-md-center">      
                        {filteredTrips.map((packageData, idx) => (
                            <Col key={idx}>
                                 <TripItem trip={{ image: packageImages[idx], ...packageData }} />
                            </Col>
                        ))}
                    </Row>
                </Container>
            </div>
            <Modal show={showFilterPopup} onHide={() => setShowFilterPopup(false)}>
  <Modal.Header closeButton>
    <Modal.Title>Filter Options</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <h5>Locations:</h5>
    {locations.map((location) => (
      <div key={location}>
        <input
          type="checkbox"
          checked={selectedLocations.includes(location)}
          onChange={() => handleLocationChange(location)}
        />
        <label>{location}</label>
      </div>
    ))}
    <h5>Price Range:</h5>
    {priceRanges.map((range) => (
      <div key={range}>
        <input
          type="checkbox"
          checked={selectedPriceRange.includes(range)}
          onChange={() => handlePriceRangeChange(range)}
        />
        <label>{range}</label>
      </div>
    ))}
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={() => setShowFilterPopup(false)}>Close</Button>
    <Button variant="primary" onClick={onFilterDone}>apply</Button> {/* Add the "apply" button */}
  </Modal.Footer>
</Modal>
</div>
);
}
export default MoreTrips;
