import './Header.css';
import React, { useState } from 'react';
import { FaUser } from 'react-icons/fa'
import { IoIosNotifications } from 'react-icons/io'
import { Container } from 'react-bootstrap';
import { HiMenu } from 'react-icons/hi'
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from "react-router-dom";

const Header = ({ onSelect, activeKey, ...props }) => {
    const [showOptions, setShowOptions] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    let navigate = useNavigate();

    const menuItems = [
        "Home",
        "FAQs",
        "Contact",
        "SignUp"
    ];

    const navPaths = [
        "/",
        "faqs",
        "contact-us",
        "sign-up"
    ];

    const [currentKey, setCurrentKey] = useState(menuItems[0]);

    return (
        <div className='nav-bar-container'>
            <Modal
                className='notification-popup'
                show={showNotifications}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header className='notification-header' closeButton onHide={
                    () => {
                        setShowNotifications(false);
                    }
                } closeVariant='white'>
                    <IoIosNotifications className='notification-popup-icon' />
                    <Modal.Title id="contained-modal-title-vcenter">
                        Notifications (1)
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className='notification-container'>
                    {
                        Array.from({ length: 1 }).map((_, idx) => (
                            <div key={idx} onClick={
                                () => {
                                    setShowNotifications(false);
                                    navigate('/order-details');
                                }
                            }>
                                <div className='notification-item'>
                                    <span className='notification-title'>Trip booking confirmed</span>
                                    <span className='notification-description'>Click to view trip booking details.</span>
                                </div>
                            </div>
                        ))
                    }
                </Modal.Body>
            </Modal>
            <Container className='nav-bar'>
                <div className='logo-container'>
                    <span className='logo' onClick={() => {
                        navigate('/');
                    }} >Logo</span>
                    <HiMenu className={'hamburger-icon ' + (showOptions ? "active" : "")} onClick={() => {
                        setShowOptions(!showOptions);
                    }} />
                </div>
                <div className={'menu ' + (showOptions ? "" : 'hide')}>
                    {
                        menuItems.map((d, index) =>
                            <div className='menu-item'
                                key={index}
                            >
                                <span className={'menu-button ' + (currentKey === d ? 'active' : '')}
                                    onClick={() => {
                                        setCurrentKey(d);
                                        navigate(navPaths[index]);
                                        showOptions && setShowOptions(false);
                                    }}>{d}</span>
                            </div>
                        )
                    }


                    <div className='menu-item'>
                        <span className={'notification-text menu-button ' + (currentKey === "Notifications" ? 'active' : '')} onClick={() => {
                            setCurrentKey("Notifications");
                            showOptions && setShowOptions(false);
                            setShowNotifications(!showNotifications);
                        }}>Notifications</span>
                        <IoIosNotifications className='notification-icon' onClick={() => {
                            setShowNotifications(!showNotifications);
                        }} />
                    </div>

                    <div className='menu-item'>
                        <span className={'profile-text menu-button ' + (currentKey === "Profile" ? 'active' : '')} onClick={() => {
                            showOptions && setShowOptions(false);
                            setCurrentKey("Profile");
                        }}>Profile</span>
                        <div className='profile-container'>
                            <FaUser className='profile-icon' />
                        </div>
                    </div>

                </div>
            </Container>
        </div>
    );
}

export default Header;