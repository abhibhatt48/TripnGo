const HOST_URL = "http://localhost:3000";

const APIs = {
    POPULAR_TRIPS: `${HOST_URL}/dashboard/popular-trips`,
    TRIPS_NEAR_YOU: `${HOST_URL}/dashboard/trips-near-you`,
    SOCKET_URL: `${HOST_URL}`,
    NOTIFICATIONS: `${HOST_URL}/notifications`,
    CONTACT_US: `${HOST_URL}/contact-us`,
};

export default APIs;
export { HOST_URL };