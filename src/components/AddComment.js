import { useState, useContext, useEffect } from "react";
import axios from "axios";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import {useNavigate} from "react-router-dom"
import { AuthContext } from "../context/auth.context";
import { get } from "../services/authService";

const API_URL = "https://anime-project-3-server.fly.dev";


function AddComment({animeId, setReload}) {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const {user} = useContext(AuthContext)

  const getAllComments= () => {

    get(`/animes/${animeId}`)
      .then((response) => {
        setComments(response.data.comments)
      })
      
      .catch((error) => console.log(error));
  };

  

  useEffect(() => {
    getAllComments();
  }, [] );


  const handleSubmit = (e) => {                          
    e.preventDefault();
 
    const requestBody = { title, comment, addedBy: user._id };

    axios
      .post(`${API_URL}/animes/addComment/${animeId}`, requestBody)
      .then((response) => {
        setTitle("");
        setComment("");
        setReload(prev => !prev)
        //getAllComments()
        //navigate(`/animes/${animeId}`)
      })
      .catch((error) => console.log(error));
  };


  return (
    <div className="AddComment">
    <form onSubmit={handleSubmit}>
    <Card style={{ width: "35vw" }}>
        <Card.Title>
        Add Comment:
        </Card.Title>
        <ListGroup className="list-group-flush">
          <ListGroup.Item>
          <label>Title:</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        </ListGroup.Item>
          <ListGroup.Item>
          <label>Comment:</label>
        <input
          type="text"
          name="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
          </ListGroup.Item>
          </ListGroup>
        <Card.Body>
        <button type="submit">Submit</button>
        
        </Card.Body>
      </Card>
      </form>
    </div>
  );
}

export default AddComment;