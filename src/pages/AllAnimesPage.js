import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import AddAnime from "../components/AddAnime";
import AnimeCard from "../components/AnimeCard"
import {AnimeContext} from "../context/anime.context"
import { get, post } from "../services/authService";
import genres from "../animeGenres";

const API_URL = "http://localhost:4000";


function AllAnimesPage() {
  const [animes, setAnimes] = useState([]);
  const [sortedAnimes, setSortedAnimes] = useState([])
  const storedToken = localStorage.getItem("authToken");
  let showAllComments = false;
  

  const getAllAnimes = () => {
  

    get('/animes')

      .then((response) => {
        setAnimes(response.data)
        setSortedAnimes(response.data)
        console.log(response.data)
        console.log("animes:", animes)
      })
      
      .catch((error) => console.log(error));
  };

  const handleSort = (genre) => {
      if (genre === "All") {
        getAllAnimes();
      } else {
        let filteredAnimes = animes.filter((element) => {
          return(element.genre === genre)
        } )
        setSortedAnimes(filteredAnimes)
      }
  }

  const handleSearch = (searchKey) => {
    if (searchKey === "") {
      getAllAnimes()
    } else {
      let filteredAnimes = animes.filter((element) => {
        return (element.title.toLowerCase().includes(searchKey.toLowerCase()))
      })
      setSortedAnimes(filteredAnimes)
    }
  }

  // We set this effect will run only once, after the initial render
  // by setting the empty dependency array - []
  useEffect(() => {
    getAllAnimes();
  }, [] );

  
  return (
    <div className="AllAnimesPage">

        {storedToken && <AddAnime refreshAnimes={getAllAnimes} />}
        <span>
        <label style= {{color: "white"}}>Filter by Genre:</label>
        <select name="genre" onChange={(e) => {
          handleSort(e.target.value);  
          }
        
        }>
        <option>All</option>
        {genres.map((element) => {
          return(<option> {element} </option>)
        })}
        </select>
        


        <label style= {{color: "white"}}>Search:</label>
        <input type="text" name="search" 
        onChange={(e) => {
          handleSearch(e.target.value);
        }}></input>

        </span>
        

        {sortedAnimes.map((element) => {
          return (
            <>
            <AnimeCard key={element._id} {...element} showAllComments = {showAllComments} storedToken = {storedToken} homePageTrue ={true}/>
            </>
          );
        })}     
       
    </div>
  );
}

export default AllAnimesPage;