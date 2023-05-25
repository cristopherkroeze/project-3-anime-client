import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import AnimeCard from './AnimeCard'
import { Link } from 'react-router-dom';

function UserCard({
  _id,
  img,
  email,
  userName,
  name,
  favoriteAnimes,
  favoriteGenre,
  role
}) {
  const storedToken = localStorage.getItem("authToken");
  const favoriteAnimesList = true
  const isProfile = true;

  return (
    <>
      <Card style={{ width: "45vw" }}>
        <Card.Img variant="top" src={img}  />
        <Card.Title>{userName}</Card.Title>

        <ListGroup className="list-group-flush">
          <ListGroup.Item>Email: {email}</ListGroup.Item>
          <ListGroup.Item>Name: {name}</ListGroup.Item>
          <ListGroup.Item>Role: {role}</ListGroup.Item>
          {favoriteGenre && <ListGroup.Item>Favorite Genre: {favoriteGenre}</ListGroup.Item>}
          <ListGroup.Item><Link to={`/profile/edit/${_id}`} >Edit Profile</Link></ListGroup.Item>
        </ListGroup>
        <Card.Title>Favorite Animes:</Card.Title>
        {favoriteAnimes?.length &&
          favoriteAnimes.map((element) => {
            return(
              <AnimeCard {...element} showAllComments={false}
              homePageTrue={false}
              storedToken={storedToken} 
                favoriteAnimesList={favoriteAnimesList}
                isProfile={isProfile}
              />
            );
          })}
      </Card>
    </>
  );
}
  
  export default UserCard;


                  
                  
                  