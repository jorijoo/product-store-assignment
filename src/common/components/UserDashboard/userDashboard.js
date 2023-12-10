import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import { authTokenSignal } from "../../signals/AuthTokenSignal";

const UserDashboard = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const isLoggedIn = authTokenSignal.value !== "";

  useEffect(() => {
    const fetchOrders = async () => {
      const token = authTokenSignal.value;
      if (token) {
        try {
          const response = await axios.get("http://big.kapsi.fi/myorders", {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          setOrders(response.data);
        } catch (error) {
          console.error("Error fetching orders:", error);
        }
      }
    };

    if (isLoggedIn) {
      fetchOrders();
    }
  }, [isLoggedIn]);

  const handleLogout = () => {
    try {
      // Päivitä token-signaali tyhjäksi kirjautumisen yhteydessä
      authTokenSignal.value = "";
      sessionStorage.removeItem("token");
      navigate("/");
      console.log('You have been logged out.');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <Container>
      <h1 className="my-4">User Dashboard</h1>
      {isLoggedIn ? (
        <Container>
          <h2 className="my-3">My Orders</h2>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Order Date</th>
                <th>Product Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Image</th>
                <th>Category</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.orderId}>
                  <td>{order.orderId}</td>
                  <td>{order.orderDate}</td>
                  <td>{order.productName}</td>
                  <td>{order.price}</td>
                  <td>{order.quantity}</td>
                  <td><img src={order.imageUrl} alt={order.productName} style={{ width: "50px" }} /></td>
                  <td>{order.category}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <button onClick={handleLogout} className="btn btn-primary my-3">Log out</button>
        </Container>
      ) : (
        <div>
          <p>You are not logged in.</p>
          <Link to="/login">Log in</Link>
        </div>
      )}
    </Container>
  );
};

export default UserDashboard;
