import { Row, Col, Container } from 'react-bootstrap';
import './Dashboard.css';
import React from 'react';
import TripItem from 'components/TripItem';
import { popularTrips, tripsNearYou } from './TripItems';

function Dashboard() {

    // Images by barnyc: https://flickr.com/photos/75487768@N04/31628278140/in/photolist-QbTcbm-naDN9o-8tF7Y3-bpQQFi-DDnvj9-hnwqti-JRMGJH-N9vpzy-MoREwn-23mWx8L-27HZbNM-PzxcXy-dkdGBH-MC55mp-CRe2wH-ddngBy-5pBL9K-aimadp-atdUU9-6KBNJ3-fnqbB2-7kPfy7-9yQB4D-27yjzhM-26h2CDK-Zow8Ti-SwsNoj-7mLDRp-T9MWwY-21LYYPn-25X7Hrm-Xx4bVM-GWeFwT-Jn58bR-DGZcAy-E8i7yj-uxLmC3-bBeBGg-bB2AyU-DKb97-KxECR9-Gcrv2e-oVgqQC-28MX46G-yJVjVY-Xvs96Y-Q2kHof-pcJooL-W9WpXW-Gw2QEA/
    const popular_trips_images = [
        "https://live.staticflickr.com/7460/13892714966_ae06a2ee97_c_d.jpg",
        "https://live.staticflickr.com/4115/4907675570_b3f712812e_c_d.jpg",
        "https://live.staticflickr.com/7009/6833376215_fc29930224_c_d.jpg",
    ];

    const near_by_trips_images = [
        "https://live.staticflickr.com/401/31628278140_17bb9f1fd8_c_d.jpg",
        "https://live.staticflickr.com/5737/30288680862_5c9e8248f4_c_d.jpg",
        "https://live.staticflickr.com/5537/31228301162_8dddd9450d_c_d.jpg"
    ];
    const onSearchClick = (e) => {
        e.preventDefault();
        console.log('Search button clicked');
    };

    return (
        <div className='dashboard-container'>
            <div className="carousel-container" >
                <div className="carousel-image" style={{ backgroundImage: `url(https://live.staticflickr.com/4556/24708106728_3d933d30d9_k_d.jpg)` }} />
                {/* Image by barnyz: https://flickr.com/photos/75487768@N04/24708106728/in/photolist-QbTcbm-naDN9o-8tF7Y3-bpQQFi-DDnvj9-hnwqti-JRMGJH-N9vpzy-MoREwn-23mWx8L-27HZbNM-PzxcXy-dkdGBH-MC55mp-CRe2wH-ddngBy-5pBL9K-aimadp-atdUU9-6KBNJ3-fnqbB2-7kPfy7-9yQB4D-27yjzhM-26h2CDK-Zow8Ti-SwsNoj-7mLDRp-T9MWwY-21LYYPn-25X7Hrm-Xx4bVM-GWeFwT-Jn58bR-DGZcAy-E8i7yj-uxLmC3-bBeBGg-bB2AyU-DKb97-KxECR9-Gcrv2e-oVgqQC-28MX46G-yJVjVY-Xvs96Y-Q2kHof-pcJooL-W9WpXW-Gw2QEA/ */}
                <div className="carousel-overlay">
                    <span className="carousel-title">Best deals you can find</span>
                    <span className="carousel-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</span>
                </div>
            </div>
            <Row className='search-container'>
                <Col lg={{ span: 6 }} md={{ span: 5 }}>
                    <input className="search-input" type="text" placeholder="Search" />
                </Col>
                <Col lg={{ span: 1 }} md={{ span: 2 }}>
                    <button className="button"
                        onClick={onSearchClick}
                    >Search</button>
                </Col>
                <Col lg={{ span: 1 }} md={{ span: 2 }}>
                    <button className="button" onClick={onSearchClick}
                    >Filter</button>
                </Col>
            </Row>

            <div className="trips-container">
                <h1 className="title">Most popular trips</h1>
                <Container className='trips-item-container'>
                    <Row className="g-4 justify-content-md-center">
                        {Array.from({ length: 3 }).map((_, idx) => (
                            <Col key={idx}>

                                <TripItem trip={{
                                    image: popular_trips_images[idx],
                                    ...popularTrips[idx]
                                }} />
                            </Col>
                        ))}
                    </Row>
                </Container>

                <button className="button btn-more-trips"
                    onClick={onSearchClick}
                >More Trips</button>
            </div>

            <div className="trips-container">
                <h1 className="title">Trips near you</h1>
                <Container className='trips-item-container'>
                    <Row className="g-4 justify-content-md-center">
                        {Array.from({ length: 3 }).map((_, idx) => (
                            <Col key={idx}>
                                <TripItem trip={{
                                    image: near_by_trips_images[idx],
                                    ...tripsNearYou[idx]
                                }} />
                            </Col>
                        ))}
                    </Row>
                </Container>
                <button className="button btn-more-trips"
                    onClick={onSearchClick}
                >More Trips</button>
            </div>

        </div >
    );
}

export default Dashboard;
