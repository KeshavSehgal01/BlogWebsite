import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import contact from "./contact.jpg";
const ContactUs = () => {
  return (
    <div>
      <h1 style={{ display: "flex", justifyContent: "center" }}>
        <p>ContactUs</p>
      </h1>
      <h4 style={{ display: "flex", justifyContent: "center" }}>
        <p>Name: Keshav Sehgal</p>
      </h4>
      <h4 style={{ display: "flex", justifyContent: "center" }}>
        <p>Email: keshavsehgal27@gmail.com</p>
      </h4>
      <h4 style={{ display: "flex", justifyContent: "center" }}>
        <p>Phone Number: 91+ 9041019303</p>
      </h4>
    </div>
  );
};

export default ContactUs;
