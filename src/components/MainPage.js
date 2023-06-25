import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "./MainPage.css";
import blog from "./blog.jpg";
const MainPage = ({
  favorites,
  addToFavorites,
  removeFromFavorites,
  searchTerm,
}) => {
  const [posts, setPosts] = useState([]);
  const [authors, setAuthors] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  const { searchTerm: searchParam } = useParams();

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((response) => setPosts(response.data))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    const fetchAuthors = async () => {
      const userIds = posts.map((post) => post.userId);
      const uniqueUserIds = Array.from(new Set(userIds));

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
  }, [posts]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  const filteredPosts = searchTerm
    ? posts.filter(
        (post) =>
          post.title.toLowerCase().includes(searchParam?.toLowerCase() || "") ||
          post.body.toLowerCase().includes(searchParam?.toLowerCase() || "")
      )
    : posts;

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Blog Posts</h1>

      <div className="mainPage">
        {currentPosts.length ? (
          currentPosts.map((post) => (
            <div key={post.id}>
              <Link to={`/post/${post.id}`} style={{ textDecoration: "none" }}>
                <Card style={{ width: "18rem" }} className="blogCard">
                  <Card.Img variant="top" src={blog} />
                  <Card.Body>
                    <Card.Title>{truncateText(post.title, 15)}</Card.Title>
                    <Card.Text>
                      <p>{truncateText(post.body, 50)}</p>
                      <p style={{ fontWeight: "bold" }}>
                        Author: {authors[post.userId]?.name}
                      </p>
                    </Card.Text>
                    {favorites.some((favorite) => favorite.id === post.id) ? (
                      <Button
                        variant="primary"
                        onClick={(e) => {
                          e.preventDefault();
                          removeFromFavorites(post.id);
                        }}>
                        Remove from Favorites
                      </Button>
                    ) : (
                      <Button
                        variant="primary"
                        onClick={(e) => {
                          e.preventDefault();
                          addToFavorites(post);
                        }}>
                        Add to Favorites
                      </Button>
                    )}
                  </Card.Body>
                </Card>
              </Link>
            </div>
          ))
        ) : (
          <h2>"Blog Not Found"</h2>
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

export default MainPage;
