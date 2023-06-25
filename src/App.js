import React, { useState, useEffect } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import MainPage from "./components/MainPage";
import BlogPostPage from "./components/BlogPostPage";
import FavoritesPage from "./components/FavoritesPage";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import AboutUs from "./components/AboutUs";
import ContactUs from "./components/ContactUs";
import "./App.css";
import Container from "react-bootstrap/Container";
const App = () => {
  const [favorites, setFavorites] = useState(() => {
    const storedFavorites = localStorage.getItem("favorites");
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [comments, setComments] = useState(() => {
    const storedComments = localStorage.getItem("comments");
    return storedComments ? JSON.parse(storedComments) : {};
  });

  const addToFavorites = (post, comment) => {
    const updatedFavorites = [...favorites, post];
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));

    const updatedComments = { ...comments };
    updatedComments[post.id] = [...(updatedComments[post.id] || []), comment];
    setComments(updatedComments);
    localStorage.setItem("comments", JSON.stringify(updatedComments));
  };

  const removeFromFavorites = (postId) => {
    const updatedFavorites = favorites.filter((post) => post.id !== postId);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));

    const updatedComments = { ...comments };
    delete updatedComments[postId];
    setComments(updatedComments);
    localStorage.setItem("comments", JSON.stringify(updatedComments));
  };

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites"));
    const storedComments = JSON.parse(localStorage.getItem("comments"));

    if (storedFavorites) {
      setFavorites(storedFavorites);
    }

    if (storedComments) {
      setComments(storedComments);
    }
  }, []);

  const handleSearch = (event) => {
    if (event.target.value) {
      setSearchTerm(event.target.value);
      navigate(`/search/${event.target.value}`);
    } else {
      setSearchTerm(event.target.value);
      navigate(`/`);
    }
  };

  return (
    <div>
      <Navbar
        expand="lg"
        className="bg-body-tertiary"
        bg="dark"
        data-bs-theme="dark">
        <Container fluid>
          <Navbar.Brand>Blog Website</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll>
              <Link to="/">
                <Button variant="outline-light" style={{ border: "0px" }}>
                  Home
                </Button>
              </Link>
              <Link to="/favorites">
                <Button variant="outline-light" style={{ border: "0px" }}>
                  Favorites
                </Button>
              </Link>
              <Link to="/AboutUs">
                <Button variant="outline-light" style={{ border: "0px" }}>
                  About us
                </Button>
              </Link>
              <Link to="/ContactUs">
                <Button variant="outline-light" style={{ border: "0px" }}>
                  Contact Us
                </Button>
              </Link>
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="text"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                value={searchTerm}
                onChange={handleSearch}
              />
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Routes>
        <Route
          path="/"
          element={
            <MainPage
              favorites={favorites}
              addToFavorites={addToFavorites}
              removeFromFavorites={removeFromFavorites}
              searchTerm={searchTerm}
            />
          }
        />
        <Route
          path="/post/:postId"
          element={
            <BlogPostPage
              addToFavorites={addToFavorites}
              removeFromFavorites={removeFromFavorites}
              comments={comments}
            />
          }
        />
        <Route
          path="/favorites"
          element={
            <FavoritesPage
              favorites={favorites}
              removeFromFavorites={removeFromFavorites}
            />
          }
        />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/ContactUs" element={<ContactUs />} />
        <Route
          path="/search/:searchTerm"
          element={
            <MainPage
              favorites={favorites}
              addToFavorites={addToFavorites}
              removeFromFavorites={removeFromFavorites}
              searchTerm={searchTerm}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default App;
