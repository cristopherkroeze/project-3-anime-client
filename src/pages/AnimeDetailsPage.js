import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import AddComment from "../components/AddComment";
import CommentCard from "../components/CommentCard";
import AnimeCard from "../components/AnimeCard";
import { AuthContext } from "../context/auth.context";
import {useNavigate} from "react-router-dom"


import { get, animeDelete } from "../services/authService";
import ListGroupItem from "react-bootstrap/esm/ListGroupItem";

const AnimeDetailsPage = () => {
  const [reload, setReload] = useState(false);
  const [anime, setAnime] = useState(null);
  const {user} = useContext(AuthContext)
  const navigate = useNavigate();
  let showAllComments = true;
  const { animeId } = useParams();
  console.log("animeId:", animeId);
  const storedToken = localStorage.getItem("authToken");


  const getAnime = () => {
    get(`/animes/${animeId}`)
      .then((response) => {
        const oneAnime = response.data;
        setAnime(oneAnime);
      })
      .catch((error) => console.log(error));
  };

  const deleteAnime = () => {
    console.log("addedBy:", anime.addedBy)
    console.log("user", user)
    if(anime.addedBy._id === user._id) {
      animeDelete(`/animes/${animeId}`)
      .then(() => {
        navigate('/animes')
      })
      .catch((error) => console.log(error));
    } else {
      alert("You are not the creator of this anime")
    }
    
  }

  useEffect(() => {
    getAnime();
  }, [reload]);

  return (
    <div className="AnimeDetails">
      <Card style={{ width: "50vw" }}>
        <ListGroup className="list-group-flush">
          <ListGroup.Item>
            {anime && (
              <AnimeCard {...anime} setAnime={setAnime} setReload={setReload} showAllComments={showAllComments} storedToken={storedToken} homePageTrue ={true}/>
            )}
          </ListGroup.Item>
          <ListGroup.Item>
            <Link to="/animes">
              <button>Back to All Animes</button>
            </Link>
          </ListGroup.Item>
          <ListGroup.Item>
            <Link to={`/animes/edit/${animeId}`}>
              <button>Edit Anime</button>
            </Link>
          </ListGroup.Item>
          <ListGroup.Item>
            <button onClick = {deleteAnime}>Delete Anime</button>
          </ListGroup.Item>
        </ListGroup>

        {/* 
      {anime && anime.comments && anime.comments.map((element) => {
            return (<CommentCard {...element} /> )
      }
      )} */}

      </Card>
    </div>
  );
};

export default AnimeDetailsPage;
