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

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/order-details" element={<OrderDetails />} />
        <Route path="/package-details" element={<PackageDetails />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  </React.StrictMode >
);