import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import CommentCard from "./CommentCard";
import CharacterCard from "./CharacterCard";
import AddComment from "./AddComment";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { useContext } from "react";
import { post } from "../services/authService";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Rating } from "react-simple-star-rating";

function AnimeCard({
  _id,
  img,
  title,
  rating,
  genre,
  description,
  mainCharacter,
  addedBy,
  comments,
  showAllComments,
  storedToken,
  homePageTrue,
  favoriteAnimesList,
  setReload,
  setAnime,
  isProfile
}) {
  const API_URL = "http://localhost:4000";
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  let viewWidth = 40
  if (favoriteAnimesList) {
    viewWidth = 15
  }
  const handleRating = (newRating) => {
    let userId = user._id;
    const requestBody = { userId, newRating };
    console.log("Request Body:", requestBody, _id)
    post(`/animes/addRating/${_id}`, requestBody)
      .then((response) => {
        if (response.data.message) {
          alert(response.data.message)
        } else {
          setAnime(response.data)
        }
      })
      .catch((error) => console.log(error));
    
  };

  // const onPointerMove = (value) => ;

  const addToFavorites = () => {
    let userId = user._id;
    const requestBody = { userId };

    axios.post(`${API_URL}/animes/addFavorite/${_id}`, requestBody)
  .then((results) => {
    console.log("ADD to favorites", results.data)
    setUser(results.data)
    navigate(`/profile/${userId}`)
  })
  .catch((err) => {
    console.log("Error adding to favorites", err)
  })

  };

  const removeFromFavorites = () => {
    let userId = user._id;
    const requestBody = { userId };

    axios
      .post(`${API_URL}/animes/removeFavorite/${_id}`, requestBody)
      .then((response) => {
        console.log("THIS IS AFTER REMOVAL:", response.data)
        setUser(response.data)
        navigate(`/profile/${userId}`);
      })
      .catch((error) => console.log(error));
  };

  return (
    <>

    <Card style={{ width: `${viewWidth}vw` }}>
        <Card.Img variant="top"  src={img} />

        <Card.Body>
          <Card.Title>
            <Link to={`/animes/${_id}`}>{title}</Link>
          </Card.Title>
          Plot:
          <br></br>
          {description}
        </Card.Body>

        {!isProfile && (
          <>
          <ListGroup className="list-group-flush">
          {rating && <ListGroup.Item>Rating: {rating}</ListGroup.Item>}
          {showAllComments && (
            <Rating onClick={handleRating}  />
          )}
          <ListGroup.Item>Genre: {genre}</ListGroup.Item>
          {mainCharacter && (
            <ListGroup.Item>
              <CharacterCard mainCharacter={mainCharacter} viewWidth = {viewWidth} />
            </ListGroup.Item>
          )}

          {addedBy && (
            <ListGroup.Item>Added By: {addedBy.userName}</ListGroup.Item>
          )}
        </ListGroup>
        <Card.Body>
          {storedToken && showAllComments && <AddComment animeId={_id} setReload = {setReload}/>}
        </Card.Body>

        <Card.Body>
          
          
          {showAllComments ? (
            <>
              {comments && comments.length ? (
                <>
                  {comments.map((element) => {
                    return <CommentCard {...element} animeId={_id} setReload = {setReload} viewWidth = {viewWidth} />;
                  })}
                </>
              ) : (
                <p>No Comments</p>
              )}
            </>
          ) : (
            (() => {
              if (!comments?.length) {
                return <p>No Comments</p>;
              } else if (comments.length === 1) {
                return (
                  <>
                    <CommentCard {...comments[0]} animeId={null} setReload = {setReload} viewWidth = {viewWidth} />
                  </>
                );
              } else if (comments.length === 2) {
                return (
                  <>
                    <CommentCard {...comments[0]} animeId={null} setReload = {setReload} viewWidth = {viewWidth} />
                    <CommentCard {...comments[1]} animeId={null} setReload = {setReload} viewWidth = {viewWidth}/>
                  </>
                );
              } else if (comments.length >= 3) {
                return (
                  <>
                    <CommentCard {...comments[0]} animeId={null} setReload = {setReload} viewWidth = {viewWidth}/>
                    <CommentCard {...comments[1]} animeId={null} setReload = {setReload} viewWidth = {viewWidth}/>
                    <CommentCard {...comments[2]} animeId={null} setReload = {setReload} viewWidth = {viewWidth}/>
                  </>
                );
              }
            })()
          )}

          {homePageTrue && (
            <ListGroup className="list-group-flush">
              <ListGroup.Item>
                {comments?.length > 3 && (
                  <Link to={`/animes/${_id}`}>
                    <button>See More Comments</button>
                  </Link>
                )}
              </ListGroup.Item>
              <ListGroup.Item>
                {storedToken && (
                  <button onClick={addToFavorites}>Add to Favorites</button>
                )}
              </ListGroup.Item>
              <ListGroup.Item>
                {storedToken && (
                  <button onClick={removeFromFavorites}>
                    Remove From Favorites
                  </button>
                )}
              </ListGroup.Item>
            </ListGroup>
          )}
        </Card.Body>
        </>
        )}
      </Card>
    </>
  );
}

export default AnimeCard;
