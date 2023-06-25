import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import "./BlogPostPage.css";
import profile from "./profile.jpg";

const BlogPostPage = ({ addToFavorites, removeFromFavorites, comments }) => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [author, setAuthor] = useState(null);
  const [postComments, setPostComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      .then((response) => setPost(response.data))
      .catch((error) => console.error(error));

    axios
      .get(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
      .then((response) => {
        const apiComments = response.data;
        const existingComments = comments[postId] || [];
        setPostComments([...existingComments, ...apiComments]);
      })
      .catch((error) => console.error(error));
  }, [postId, comments]);

  useEffect(() => {
    if (post) {
      axios
        .get(`https://jsonplaceholder.typicode.com/users/${post.userId}`)
        .then((response) => setAuthor(response.data))
        .catch((error) => console.error(error));
    }
  }, [post]);

  const handleAddComment = (event) => {
    event.preventDefault();
    const comment = {
      id: generateCommentId(),
      name: "Guest",
      body: newComment,
    };
    addToFavorites(post, comment);
    setNewComment("");
  };

  const generateCommentId = () => {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  };

  return (
    <div style={{ padding: "15px" }}>
      {post ? (
        <div>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
          {author && (
            <p>
              Author: {author.name} ({author.email})
            </p>
          )}
          <h3>{postComments.length} Comments</h3>
          {postComments.length > 0 ? (
            <div className="comment-list">
              {postComments.map((comment) => (
                <div key={comment.id} className="comment">
                  <Accordion>
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>
                        <div className="comment-header">
                          <img
                            src={profile}
                            alt="Profile"
                            className="profile-image"
                          />
                          <strong>{comment.name}</strong>
                        </div>
                      </Accordion.Header>
                      <Accordion.Body>
                        <p>{comment.body}</p>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </div>
              ))}
            </div>
          ) : (
            <p>No comments yet.</p>
          )}

          <Form onSubmit={handleAddComment}>
            <Form.Group controlId="newComment">
              <Form.Label>Add a Comment</Form.Label>
              <FormControl
                as="textarea"
                rows={3}
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Add Comment
            </Button>
          </Form>
        </div>
      ) : (
        <p>Loading post...</p>
      )}
    </div>
  );
};

export default BlogPostPage;
