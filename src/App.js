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
      <Navbar bg="dark" variant="dark" className="navBar">
        <Navbar.Brand>Blog Website</Navbar.Brand>
        <Nav className="mr-auto">
          <li>
            <Link to="/">
              <Button variant="dark">Home</Button>
            </Link>
          </li>
          <li>
            <Link to="/favorites">
              <Button variant="dark">Favorites</Button>
            </Link>
          </li>
          <li>
            <Link to="/AboutUs">
              <Button variant="dark">About Us</Button>
            </Link>
          </li>
          <li>
            <Link to="/ContactUs">
              <Button variant="dark">Contact Us</Button>
            </Link>
          </li>
        </Nav>
        <div className="search">
          <Form inline>
            <FormControl
              type="text"
              placeholder="Search"
              className="mr-sm-2"
              value={searchTerm}
              onChange={handleSearch}
            />
          </Form>
        </div>
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
