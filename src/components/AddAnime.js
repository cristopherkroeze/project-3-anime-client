import { useState, useContext } from "react";
import axios from "axios";
import genres from "../animeGenres"
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import {useNavigate} from "react-router-dom"
import { AuthContext } from "../context/auth.context";
import { AnimeContext } from "../context/anime.context";
import { fileChange } from "../services/fileChange";

const API_URL = "https://anime-project-3-server.fly.dev";

function AddAnime({ refreshAnimes }) {
  const navigate = useNavigate();
  const [img, setImg] = useState("");
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("Action");
  const [description, setDescription] = useState("");


  const {user} = useContext(AuthContext)
  const {lastAddedAnime, setLastAddedAnime} = useContext(AnimeContext)

  const handleSubmit = (e) => {                          
    e.preventDefault();
 
    const requestBody = { img, title, genre, description, addedBy: user._id };

    axios
      .post(`${API_URL}/animes`, requestBody)
      .then((response) => {
        console.log("New anime", response.data);
        setLastAddedAnime(response.data);
        setImg("");
        setTitle("");
        setGenre("");
        setDescription("");
        refreshAnimes()
        navigate("/animes/addCharacter")
      })
      .catch((error) => console.log(error));
  };

  const handleFileChange = (e) => {

    fileChange(e)
      .then((response) => {
        setImg(response.data.image)
      })
      .catch((err) => {
        console.log("Error while uploading the file: ", err);
      });
  }


  return (
    <div className="AddAnime">
    <form onSubmit={handleSubmit}>
    <Card style={{ width: "40vw" }}>
        <Card.Title>
        Add Anime:
        </Card.Title>
        <ListGroup className="list-group-flush">
          <ListGroup.Item>
          <label>Image:</label>
          {/* <input type="file" id="img" name="img" onChange={(e) => setImg(e.target.value)}/> */}
        <input
          type="file"
          name="img"
          // value={img}
          onChange={handleFileChange}
        />
        </ListGroup.Item>
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
          <label>Genre:</label>
        <select name="genre" onChange={(e) => setGenre(e.target.value)}>
        {genres.map((element) => {
          return(<option> {element} </option>)
        })}
        </select>
          </ListGroup.Item>
          <ListGroup.Item>
          <label>Description:</label>
        <textarea
          type="text"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
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

export default AddAnime;