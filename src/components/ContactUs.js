import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import contact from "./contact.jpg";
const ContactUs = () => {
  return (
    <div style={{ padding: "15px", display: "flex", justifyContent: "center" }}>
      <Card style={{ width: "20rem" }}>
        <Card.Img variant="top" src={contact} />
        <Card.Body>
          <Card.Title>
            <h2>Contact Us</h2>
          </Card.Title>
          <Card.Text>
            <b>
              <p>Name: Keshav Sehgal</p>
              <p>Phone: 91+ 9041019303</p>
              <p> Email: keshavsehgal27@gmail.com</p>
            </b>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ContactUs;
