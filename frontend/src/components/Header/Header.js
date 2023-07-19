import "./Header.css";
import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { Container } from "react-bootstrap";
import { HiMenu } from "react-icons/hi";
import Modal from "react-bootstrap/Modal";
import { useNavigate, useLocation } from "react-router-dom";
import APIs from "Constants";
import axios from "axios";
import io from 'socket.io-client';

async function listenForNotifications(onNotification) {
  const userId = localStorage.getItem("userId") ?? 1;
  const socket = io(APIs.SOCKET_URL, {
    query: {
      userId: userId
    }
  });
  socket.on('connect', () => {
    console.log('Connected to server');
  });

  socket.on('message', message => {
    console.log('Received message:', message);
    if (onNotification && typeof onNotification === 'function')
      onNotification(message);
  });

  socket.on('disconnect', () => {
    console.log('Disconnected from server');
  });

  return socket;
}

const Header = () => {
  const [showOptions, setShowOptions] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isNewNotification, setIsNewNotification] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const userId = 1;
  let navigate = useNavigate();
  let location = useLocation();

  const menuItems = React.useMemo(() => {
    return ["Home", "FAQs", "Contact", "SignUp"];
  }, []);
  const navPaths = React.useMemo(() => {
    return ["/", "faqs", "contact-us", "sign-up"];
  }, []);

  const [currentKey, setCurrentKey] = useState(menuItems[0]);

  React.useEffect(() => {
    const path = location.pathname.split("/")[1];

    if (path === "/" || path === "") {
      setCurrentKey("Home");
    } else {
      const index = navPaths.indexOf(path);
      setCurrentKey(menuItems[index]);
    }

  }, [location, menuItems, navPaths]);

  React.useEffect(() => {
    listenForNotifications((message) => {
      setIsNewNotification(!showNotifications && true);
      setNotifications([message, ...notifications]);
    });
  }, [showNotifications, notifications]);

  React.useEffect(() => {
    axios.get(`${APIs.NOTIFICATIONS}/${userId}`).then((res) => {
      const noti = [];
      for (let i = res.data.length - 1; i >= 0; i--) {
        noti.push(res.data[i]);
      }
      setNotifications(noti);
    });
  }, []);

  return (
    <div className="nav-bar-container">
      <Modal
        className="notification-popup"
        show={showNotifications}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header
          className="notification-header"
          closeButton
          onHide={() => {
            setShowNotifications(false);
          }}
          closeVariant="white"
        >
          <IoIosNotifications className="notification-popup-icon" />
          <Modal.Title id="contained-modal-title-vcenter">
            Notifications ({notifications.length})
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="notification-container">
          {notifications.map((notification, idx) => (
            <div
              key={idx}
              onClick={() => {
                setShowNotifications(false);
                const url = notification.payload.url;
                if (url) {
                  navigate(url);
                }
              }}
            >
              <div className="notification-item">
                <span className="notification-title">
                  {notification.title}
                </span>
                <span className="notification-description">
                  {notification.description}
                </span>
              </div>
            </div>
          ))}
        </Modal.Body>
      </Modal>
      <Container className="nav-bar">
        <div className="logo-container">
          <span
            className="logo"
            onClick={() => {
              navigate("/");
            }}
          >
            Trip'nGo
          </span>
          <HiMenu
            className={"hamburger-icon " + (showOptions ? "active" : "")}
            onClick={() => {
              setShowOptions(!showOptions);
            }}
          />
        </div>
        <div className={"menu " + (showOptions ? "" : "hide")}>
          {menuItems.map((d, index) => (
            <div className="menu-item" key={index}>
              <span
                className={"menu-button " + (currentKey === d ? "active" : "")}
                onClick={() => {
                  setCurrentKey(d);
                  navigate(navPaths[index]);
                  showOptions && setShowOptions(false);
                }}
              >
                {d}
              </span>
            </div>
          ))}

          <div className="menu-item">
            <span
              className={
                "notification-text menu-button " +
                (currentKey === "Notifications" ? "active" : "")
              }
              onClick={() => {
                setCurrentKey("Notifications");
                showOptions && setShowOptions(false);
                setShowNotifications(!showNotifications);
              }}
            >
              Notifications
            </span>
            <div className="notification-dot-container">
              <IoIosNotifications
                className="notification-icon"
                onClick={() => {
                  setIsNewNotification(false);
                  setShowNotifications(!showNotifications);
                }}
              />
              {isNewNotification && (
                <div className="notification-dot"></div>
              )}
            </div>
          </div>

          <div className="menu-item">
            <span
              className={
                "profile-text menu-button " +
                (currentKey === "Profile" ? "active" : "")
              }
              onClick={() => {
                showOptions && setShowOptions(false);
                setCurrentKey("Profile");
              }}
            >
              Profile
            </span>
            <div className="profile-container">
              <FaUser className="profile-icon" />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Header;
