import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { get } from "../services/authService";
import { useState, useEffect } from "react";
import AnimeCard from "../components/AnimeCard";

function HomePage() {
  const [highestRated, setHighestRated] = useState(null);
  const storedToken = localStorage.getItem("authToken");

  const getHighestRatedAnime = () => {
    get("/animes")
      .then((response) => {
        let dataAnimes = response.data;
        let maxArray = response.data.map((anime) => anime.rating);
        maxArray = maxArray.map((value) => (value === undefined ? 0 : value));
        let maximumRating = maxArray.reduce((a, b) => Math.max(a, b), 0);
        let index = maxArray.indexOf(maximumRating);
        let highestRatedAnime = dataAnimes[index];
        setHighestRated(highestRatedAnime);
      })

      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getHighestRatedAnime();
  }, []);

  return (
    <div className="HomePage">
      <Card style={{ width: "50vw" }}>
        <Card.Title>Anime Watchlist</Card.Title>
        <Card.Body>
          <h1>Highest Rated Anime:</h1>
          <br></br>
          {highestRated && (
            <AnimeCard
              {...highestRated}
              showAllComments={false}
              homePageTrue={false}
              storedToken={storedToken}
            />
          )}
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroup.Item>
            "Forgetting is like a wound. The wound may heal, but it has already
            left a scar." -Monkey D. Luffy
          </ListGroup.Item>
          <ListGroup.Item>
            "Sometimes, we have to look beyond what we want and do what's best."
            -Piccolo
          </ListGroup.Item>
          <ListGroup.Item>
            "No matter how hard or impossible it is, never lose sight of your
            goal." -Monkey D. Luffy
          </ListGroup.Item>
          <ListGroup.Item>
            "Human strength lies in the ability to change yourself." -Saitama
          </ListGroup.Item>
          <ListGroup.Item>
            “If you don't take risks, you can't create a future!” -Monkey D.
            Luffy
          </ListGroup.Item>
        </ListGroup>
      </Card>
    </div>
  );
}

export default HomePage;
