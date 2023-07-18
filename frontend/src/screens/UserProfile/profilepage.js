import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Row, Col, Container, Card ,Button,Modal} from "react-bootstrap";
import "../UserProfile/Userprofile.css";
import johnDoeImage from "assests/johndoe.jpeg";

function ProfilePage() {
    const [editProfileOpen, setEditProfileOpen] = useState(false);
    const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
    const [userData, setUserData] = useState({
      name: "",
      age: "",
      gender: "",
      dateOfBirth: "",
      city: "",
      bio: "",
      street: "",
      addressCity: "",
      state: "",
      country: "",
      email: "",
      phone: "",
      profileImage: johnDoeImage,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm();

  const handleClick = () => {
    setEditProfileOpen(!editProfileOpen);
  };
  const handleShowChangePasswordModal = () => {
    setShowChangePasswordModal(true);
  };

  const handleCloseChangePasswordModal = () => {
    setShowChangePasswordModal(false);
  };
  const onSubmit = (data) => {
    setUserData(data);
    console.log(data);
  };

      
      const handleImageChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
    
        reader.onload = (e) => {
          setUserData((prevUserData) => ({
            ...prevUserData,
            profileImage: e.target.result,
          }));
        };
    
        reader.readAsDataURL(file);
      };

  return (
    <div className="background-image">
      <Container className="central-container">
        <div className="login-container">
          <div className="login-overlay">
            <h1 className="title">Welcome</h1>
            
          </div>
         
          <Row >
        <Col xs={12} md={4} lg={12}>
          {/* Profile Image and Bio */}
          <Card className="mb-4">
            <Card.Body>
            <div className="">
            <img
                src={userData.profileImage}
                roundedCircle
                style={{ width: "150px", height: "150px" }}
                className="mb-3"
                alt="Profile"
            />
        </div>
        <div className="">
            <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
            />
        </div>
              <Card.Title>John Wick</Card.Title>
              <Row>
                
                
              </Row>
             
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col className="" xs={6} md={4} lg={6} >
          {/* Personal Information*/}
          <Card className="mb-4 custom-column">
            <Card.Body>
              <Card.Title>Personal Information</Card.Title>
              <ul className="list-unstyled">
                <li>Name: John Doe</li>
                <li>Age: 30</li>
                <li>Gender: Male</li>
                <li>Date of birth: 23-05-1999</li>
                <li>City: Mumbai </li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
        <Col className="" xs={6} md={4} lg={6}>
          {/* Address Information */}
          <Card className="mb-4 custom-column">
            <Card.Body>
              <Card.Title>Address Information</Card.Title>
              <ul className="list-unstyled">
                <li>Street: 123 Main St</li>
                <li>City: New York</li>
                <li>State: NY</li>
                <li>Country: USA</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col className="custom-column" xs={12} md={8} lg={6}>
          {/* Contact Information */}
          <Card className="mb-4" style={{height: "150px"}}>
            <Card.Body>
              <Card.Title>Contact Information</Card.Title>
              <ul className="list-unstyled">
                <li>Email: john.doe@example.com</li>
                <li>Phone: 123-456-7890</li>
              </ul>
            </Card.Body>
          </Card>  
        </Col>
        <Col >
        <Card>
            <Card.Body>
          <div style={{border: "0.5px solid lightgrey", borderRadius: "5px", textAlign: "center", height: "150px"}}>
            
            <div>
            {editProfileOpen ? (
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input
                          type="text"
                          className={`form-control ${
                            errors.name ? "is-invalid" : ""
                          }`}
                          id="name"
                          {...register("name", {
                            required: "Name is required",
                          })}
                          defaultValue={userData.name}
                        />
                        {errors.name && (
                          <div className="invalid-feedback">
                            {errors.name.message}
                          </div>
                        )}
                      </div>
                      <div className="form-group">
                        <label htmlFor="age">Age:</label>
                        <input
                          type="number"
                          className={`form-control ${
                            errors.age ? "is-invalid" : ""
                          }`}
                          id="age"
                          {...register("age", {
                            required: "Age is required",
                            min: {
                              value: 18,
                              message: "Age must be at least 18",
                            },
                            max: {
                              value: 100,
                              message: "Age must be at most 100",
                            },
                          })}
                          defaultValue={userData.age}
                        />
                        {errors.age && (
                          <div className="invalid-feedback">
                            {errors.age.message}
                          </div>
                        )}
                      </div>
                      <div className="form-group">
                        <label htmlFor="gender">Gender:</label>
                        <select
                          className={`form-control ${
                            errors.gender ? "is-invalid" : ""
                          }`}
                          id="gender"
                          {...register("gender", {
                            required: "Gender is required",
                          })}
                          defaultValue={userData.gender}
                        >
                          <option value="">Select</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                        </select>
                        {errors.gender && (
                          <div className="invalid-feedback">
                            {errors.gender.message}
                          </div>
                        )}
                      </div>
                      <div className="form-group">
                        <label htmlFor="dob">Date of Birth:</label>
                        <input
                          type="date"
                          className={`form-control ${
                            errors.dateOfBirth ? "is-invalid" : ""
                          }`}
                          id="dob"
                          {...register("dateOfBirth", {
                            required: "Date of Birth is required",
                          })}
                          defaultValue={userData.dateOfBirth}
                        />
                        {errors.dateOfBirth && (
                          <div className="invalid-feedback">
                            {errors.dateOfBirth.message}
                          </div>
                        )}
                      </div>
                      <div className="form-group">
                        <label htmlFor="city">City:</label>
                        <input
                          type="text"
                          className={`form-control ${
                            errors.city ? "is-invalid" : ""
                          }`}
                          id="city"
                          {...register("city", {
                            required: "City is required",
                          })}
                          defaultValue={userData.city}
                        />
                        {errors.city && (
                          <div className="invalid-feedback">
                            {errors.city.message}
                          </div>
                        )}
                      </div>
                      <div className="form-group">
                        <label htmlFor="bio">Bio:</label>
                        <textarea
                          className={`form-control ${
                            errors.bio ? "is-invalid" : ""
                          }`}
                          id="bio"
                          {...register("bio", {
                            required: "Bio is required",
                          })}
                          defaultValue={userData.bio}
                        ></textarea>
                        {errors.bio && (
                          <div className="invalid-feedback">
                            {errors.bio.message}
                          </div>
                        )}
                      </div>
                      <div className="form-group">
                        <label htmlFor="street">Street:</label>
                        <input
                          type="text"
                          className={`form-control ${
                            errors.street ? "is-invalid" : ""
                          }`}
                          id="street"
                          {...register("street", {
                            required: "Street is required",
                          })}
                          defaultValue={userData.street}
                        />
                        {errors.street && (
                          <div className="invalid-feedback">
                            {errors.street.message}
                          </div>
                        )}
                      </div>
                      <div className="form-group">
                        <label htmlFor="addressCity">Address City:</label>
                        <input
                          type="text"
                          className={`form-control ${
                            errors.addressCity ? "is-invalid" : ""
                          }`}
                          id="addressCity"
                          {...register("addressCity", {
                            required: "Address City is required",
                          })}
                          defaultValue={userData.addressCity}
                        />
                        {errors.addressCity && (
                          <div className="invalid-feedback">
                            {errors.addressCity.message}
                          </div>
                        )}
                      </div>
                      <div className="form-group">
                        <label htmlFor="state">State:</label>
                        <input
                          type="text"
                          className={`form-control ${
                            errors.state ? "is-invalid" : ""
                          }`}
                          id="state"
                          {...register("state", {
                            required: "State is required",
                          })}
                          defaultValue={userData.state}
                        />
                        {errors.state && (
                          <div className="invalid-feedback">
                            {errors.state.message}
                          </div>
                        )}
                      </div>
                      <div className="form-group">
                        <label htmlFor="country">Country:</label>
                        <input
                          type="text"
                          className={`form-control ${
                            errors.country ? "is-invalid" : ""
                          }`}
                          id="country"
                          {...register("country", {
                            required: "Country is required",
                          })}
                          defaultValue={userData.country}
                        />
                        {errors.country && (
                          <div className="invalid-feedback">
                            {errors.country.message}
                          </div>
                        )}
                      </div>
                      <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                          type="email"
                          className={`form-control ${
                            errors.email ? "is-invalid" : ""
                          }`}
                          id="email"
                          {...register("email", {
                            required: "Email is required",
                            pattern: {
                              value: /^\S+@\S+$/i,
                              message: "Invalid email address",
                            },
                          })}
                          defaultValue={userData.email}
                        />
                        {errors.email && (
                          <div className="invalid-feedback">
                            {errors.email.message}
                          </div>
                        )}
                      </div>
                      <div className="form-group">
                        <label htmlFor="phone">Phone:</label>
                        <input
                          type="tel"
                          className={`form-control ${
                            errors.phone ? "is-invalid" : ""
                          }`}
                          id="phone"
                          {...register("phone", {
                            required: "Phone is required",
                            pattern: {
                              value: /^\d{10}$/i,
                              message: "Invalid phone number",
                            },
                          })}
                          defaultValue={userData.phone}
                        />
                        {errors.phone && (
                          <div className="invalid-feedback">
                            {errors.phone.message}
                          </div>
                        )}
                      </div>
                      <Button type="submit" variant="primary">
                        Save Changes
                      </Button>
                    </form>
                  ) : (
                    <Button
                      variant="info"
                      value="Edit profile modal will be opened"
                      onClick={handleClick}
                    >
                      Edit Profile
                    </Button>
                  )}
            </div>
            <div >
            <Button
                      variant="primary"
                      value="Change password modal will be opened"
                      className="each-button"
                      onClick={handleShowChangePasswordModal}
                    >
                          Change Password
                    </Button>
            </div>

          </div>
          </Card.Body>
          </Card>
        </Col>
      </Row>

        </div>
      </Container>
      <Modal
        show={showChangePasswordModal}
        onHide={handleCloseChangePasswordModal}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label htmlFor="currentPassword">Current Password:</label>
              <input
                type="password"
                className={`form-control ${
                  errors.currentPassword ? "is-invalid" : ""
                }`}
                id="currentPassword"
                {...register("currentPassword", {
                  required: "Current Password is required",
                })}
              />
              {errors.currentPassword && (
                <div className="invalid-feedback">
                  {errors.currentPassword.message}
                </div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="newPassword">New Password:</label>
              <input
                type="password"
                className={`form-control ${
                  errors.newPassword ? "is-invalid" : ""
                }`}
                id="newPassword"
                {...register("newPassword", {
                  required: "New Password is required",
                  minLength: {
                    value: 8,
                    message: "New Password must be at least 8 characters",
                  },
                })}
              />
              {errors.newPassword && (
                <div className="invalid-feedback">
                  {errors.newPassword.message}
                </div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <input
                type="password"
                className={`form-control ${
                  errors.confirmPassword ? "is-invalid" : ""
                }`}
                id="confirmPassword"
                {...register("confirmPassword", {
                  required: "Confirm Password is required",
                  validate: (value) =>
                    value === watch("newPassword") || "Passwords do not match",
                })}
              />
              {errors.confirmPassword && (
                <div className="invalid-feedback">
                  {errors.confirmPassword.message}
                </div>
              )}
            </div>
            <Button type="submit" variant="primary">
              Save Changes
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
    
  );
}

export default ProfilePage;
