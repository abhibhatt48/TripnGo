import React from 'react';
import ReactDOM from 'react-dom/client';
import 'index.css';
import 'rsuite/dist/rsuite.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from 'screens/Dashboard';
import Footer from 'components/Footer';
import Header from 'components/Header';
import {
  Routes, Route, BrowserRouter
} from "react-router-dom";
import OrderDetails from 'screens/OrderDetails';
import PackageDetails from 'screens/PackageDetails';
import Login from 'screens/Login';
import SignUp from 'screens/SignUp';
import ContactUs from 'screens/ContactUs';
import FAQs from 'screens/FAQs';
import UserProfile from 'screens/UserProfile';
import ProfilePage from 'screens/UserProfile/profilepage'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/order-details" element={<OrderDetails />} />
        <Route path="/package-details" element={<PackageDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/faqs" element={<FAQs />} />
        <Route path="/userprofile" element={<UserProfile/>} />
        <Route path="/profilepage" element={<ProfilePage/>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  </React.StrictMode >
);