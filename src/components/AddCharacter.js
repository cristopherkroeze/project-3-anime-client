import { useState, useContext } from "react";
import axios from "axios";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import {useNavigate} from "react-router-dom"
import { AnimeContext } from "../context/anime.context";
import { fileChange } from "../services/fileChange";

const API_URL = "https://anime-project-3-server.fly.dev";

function AddCharacter() {
  const navigate = useNavigate();
  const [img, setImg] = useState("");
  const [name, setName] = useState("");
  const {lastAddedAnime} = useContext(AnimeContext);
  const [voicedBy, setVoicedBy] = useState("")
  const handleSubmit = (e) => {                          
    e.preventDefault();
 
    const requestBody = { img, name, anime: lastAddedAnime._id, voicedBy  };

    axios
      .post(`${API_URL}/characters`, requestBody)
      .then((response) => {
        console.log("New character", response.data)
        setImg("");
        setName("");
        setVoicedBy("")
        navigate("/animes")

        
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
    <div className="AddCharacter">
    <form onSubmit={handleSubmit}>
    <Card style={{ width: "40vw" }}>
        <Card.Title>
        Add Character:
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
          <label>Name:</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
          </ListGroup.Item>
          <ListGroup.Item>
          <label>Voiced By (Japanese):</label>
        <input
          type="text"
          name="voicedBy"
          value={voicedBy}
          onChange={(e) => setVoicedBy(e.target.value)}
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

export default AddCharacter;