import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import blog from "./blog.jpg";
import "./Favorites.css";

const FavoritesPage = ({ favorites, removeFromFavorites }) => {
  const [authors, setAuthors] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  useEffect(() => {
    const fetchAuthors = async () => {
      const uniqueUserIds = Array.from(
        new Set(favorites.map((post) => post.userId))
      );

      const authorPromises = uniqueUserIds.map((userId) =>
        axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`)
      );

      const authorResponses = await Promise.all(authorPromises);
      const authorData = authorResponses.reduce((data, response) => {
        const author = response.data;
        data[author.id] = author;
        return data;
      }, {});

      setAuthors(authorData);
    };

    fetchAuthors();
  }, [favorites]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = favorites.slice(indexOfFirstPost, indexOfLastPost);

  const totalPages = Math.ceil(favorites.length / postsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div style={{ padding: "15px" }}>
      <h1>Favorite Blog Posts</h1>
      <div className="favorites">
        {currentPosts.length > 0 ? (
          currentPosts.map((post) => (
            <div key={post.id}>
              <Link to={`/post/${post.id}`} style={{ textDecoration: "none" }}>
                <Card style={{ width: "18rem" }} className="favCard">
                  <Card.Img variant="top" src={blog} />
                  <Card.Body>
                    <Card.Title>{truncateText(post.title, 15)}</Card.Title>

                    <Card.Text>
                      <p>{truncateText(post.body, 50)}</p>
                      <p style={{ fontWeight: "bold" }}>
                        Author: {authors[post.userId]?.name} (
                        {authors[post.userId]?.email})
                      </p>
                    </Card.Text>
                    <Button
                      variant="primary"
                      onClick={(e) => {
                        e.preventDefault();
                        removeFromFavorites(post.id);
                      }}>
                      Remove from Favorites
                    </Button>
                  </Card.Body>
                </Card>
              </Link>
            </div>
          ))
        ) : (
          <p>No favorite posts yet.</p>
        )}
      </div>

      <div>
        {totalPages > 1 && (
          <ul className="pagination">
            {Array.from({ length: totalPages }, (_, index) => {
              const pageNumber = index + 1;
              return (
                <li
                  key={pageNumber}
                  className={`page-item ${
                    pageNumber === currentPage ? "active" : ""
                  }`}>
                  <button
                    className="page-link"
                    onClick={() => paginate(pageNumber)}>
                    {pageNumber}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
