// Author: Sai Sindhu Bhimavarapu

import React from 'react';
import '../Dashboard/Dashboard.css'
import TripItem from 'components/TripItem';
import { Row, Col, Container } from 'react-bootstrap';
import { Modal, Button } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import api from './api'; // Import the updated 'api' object

function MoreTrips() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [TravelPackages, setTravelPackages] = React.useState([]);//initial data array
  const [filteredTrips, setFilteredTrips] = React.useState(TravelPackages);
  const [searchText, setSearchText] = React.useState(searchParams.get('searchText'));
  const [selectedLocation, setSelectedLocation] = React.useState('');
  const [selectedPriceRange, setSelectedPriceRange] = React.useState('');
  const [showFilterPopup, setShowFilterPopup] = React.useState(false);
  const locations = ['Halifax', 'Montreal', 'London', 'Ontario', 'Egypt', 'China', 'Atlantica', 'Australia'];
  const priceRanges = [
    { label: '100-500' },
    { label: '501-1000' },
    { label: '1001-1700' },
    { label: '1701-2500' }
  ];

  // Create a function to fetch data from the database and set the state
  const fetchData = async () => {
    try {
      const response = await api.get('/moretrips/allPackages');
      const trips = response.data;
      setTravelPackages(trips);
      setFilteredTrips(trips); // Set the filteredTrips state to the fetched data
    } catch (error) {
      console.error('Error fetching trips:', error);
    }
  };

  // Call the fetchData function when the component mounts to get the initial data
  React.useEffect(() => {
    fetchData();
  }, []);

  const onSearchTextChange = (e) => {
    setSearchText(e.target.value);
    const filteredTrips = TravelPackages.filter((trip) => {
      return trip.title.toLowerCase().includes(searchText.toLowerCase());
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

  // Define the function to fetch trips by location
  const fetchTripsByLocation = async (location) => {
    try {
      const response = await api.get(`moretrips?location=${encodeURIComponent(location)}`);
      const trips = response.data;
      setFilteredTrips(trips);
    } catch (error) {
      console.error('Error fetching trips:', error);
    }
  };

  const fetchTripsByPrice = async (range) => {
    const [minPriceStr, maxPriceStr] = range.split('-');
    const minPrice = Number(minPriceStr);
    const maxPrice = Number(maxPriceStr);
    try {
      const response = await api.get(`/moretrips/filterByPrice?minPrice=${minPrice}&maxPrice=${maxPrice}`)
      const trips = response.data;
      setFilteredTrips(trips);
    } catch (error) {
      console.error('Error fetching trips:', error);
    }
  }

  const handleLocationReset = () => {
    setSelectedLocation(''); // Clear the selected location
    setFilteredTrips(TravelPackages); // Reset the filters and show all trips
  };

  const handlePriceRangeReset = () => {
    setSelectedPriceRange(''); // Clear the selected price range
    setFilteredTrips(TravelPackages); // Reset the filters and show all trips
  };

  const handleLocationChange = (location) => {
    setSelectedLocation(location);
  }

  const handlePriceRangeChange = (range) => {
    setSelectedPriceRange(range);
  }

  const onFilterDone = async () => {
    setShowFilterPopup(false); // Hide the popup after clicking "Done"

    if (selectedLocation && selectedPriceRange) {
      // If both location and price range are selected, fetch trips by location and price range separately
      try {
        const locationTripsResponse = await api.get(`moretrips?location=${encodeURIComponent(selectedLocation)}`);
        const locationTrips = locationTripsResponse.data;

        const [minPriceStr, maxPriceStr] = selectedPriceRange.split('-');
        const minPrice = Number(minPriceStr);
        const maxPrice = Number(maxPriceStr);
        const priceRangeTripsResponse = await api.get(`/moretrips/filterByPrice?minPrice=${minPrice}&maxPrice=${maxPrice}`);
        const priceRangeTrips = priceRangeTripsResponse.data;

        // Find the intersection of trips that satisfy both location and price range conditions
        const intersectedTrips = locationTrips.filter((trip1) =>
          priceRangeTrips.some((trip2) => trip1.id === trip2.id)
        );

        setFilteredTrips(intersectedTrips);
      } catch (error) {
        console.error('Error fetching trips:', error);
      }
    } else if (selectedLocation) {
      fetchTripsByLocation(selectedLocation);
    } else if (selectedPriceRange) {
      fetchTripsByPrice(selectedPriceRange);
    } else {
      // If neither location nor price range is selected, reset the filters and show all trips
      setFilteredTrips(TravelPackages);
    }
  };

  return (
    <div className='dashboard-container'>
      <Row className='search-container'>
        <Col lg={{ span: 6 }} md={{ span: 5 }}>
          <input className="search-input" type="text" placeholder="Search" value={searchText} onChange={onSearchTextChange} />
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
            {filteredTrips.length > 0 ? (
              filteredTrips.map((trip) => (
                <Col key={trip.id}>
                  <TripItem trip={trip} />
                </Col>
              ))
            ) : (
              <Col>
                <p>No trips found for the selected filters.</p>
              </Col>
            )}
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
                type="radio"
                name="location"
                value={location}
                checked={selectedLocation === location}
                onChange={() => handleLocationChange(location)}
              />
              <label>{location}</label>
            </div>
          ))}
          <Button variant="outline-secondary" onClick={handleLocationReset} className="filter-reset-button">Reset Location</Button> {/* Add the location reset button */}
        </Modal.Body>
        <Modal.Body>
          <h5>Price Range:</h5>
          {
            priceRanges.map((range) => (
              <div key={range.label}>
                <input
                  type="radio"
                  name="priceRange"
                  value={range.label}
                  checked={selectedPriceRange === range.label}
                  onChange={() => handlePriceRangeChange(range.label)}
                />
                <label>{range.label}</label>
              </div>
            ))
          }
          <Button variant="outline-secondary" onClick={handlePriceRangeReset} className="filter-reset-button">Reset Price Range</Button> {/* Add the price range reset button */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowFilterPopup(false)}>Close</Button>
          <Button variant="primary" onClick={onFilterDone}>Apply</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default MoreTrips;