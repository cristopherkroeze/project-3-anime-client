import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";  
import axios from "axios";
import genres from "../animeGenres"
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { fileChange } from "../services/fileChange";

const API_URL = "https://anime-project-3-server.fly.dev";

function EditAnimePage() {

  const navigate = useNavigate();
  const [img, setImg] = useState("");
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("Action");
  const [description, setDescription] = useState("");

  const { animeId } = useParams(); 

  const handleSubmit = (e) => {                    
    e.preventDefault();
    const requestBody = { img, title, genre, description };
 
    axios
      .put(`${API_URL}/animes/${animeId}`, requestBody)
      .then((response) => {
        console.log("Updated:", response.data)
        navigate(`/animes/${animeId}`)
      })
      .catch((err) => {
        console.log(err)
      })
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

  useEffect(() => {
    axios
      .get(`${API_URL}/animes/${animeId}`)
      .then((response) => {
        const oneAnime = response.data;
        setImg(oneAnime.img);
  setTitle(oneAnime.title);
  setGenre(oneAnime.genre)
  setDescription(oneAnime.description);
      })
      .catch((error) => console.log(error));
    
  }, []);

  
  return (
    <div className="EditAnimePage">
      <form onSubmit={handleSubmit}>
    <Card style={{ width: "40vw" }}>
        <Card.Title>
        Edit Anime:
        </Card.Title>
        <ListGroup className="list-group-flush">
          <ListGroup.Item>
          <label>Image:</label>
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
        <select name="genre" value={genre} onChange={(e) => setGenre(e.target.value)}>
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

export default EditAnimePage;