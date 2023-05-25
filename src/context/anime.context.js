import { useState, useEffect, createContext } from "react";
import axios from "axios";
const API_URL = "https://anime-project-3-server.fly.dev";

const AnimeContext = createContext();

function AnimeProvider({ children }) {

    const [lastAddedAnime, setLastAddedAnime] = useState(null);
    const [character, setCharacter] = useState(null);
    return (
        <AnimeContext.Provider value={{ lastAddedAnime, setLastAddedAnime, character, setCharacter }}>
          {children}
        </AnimeContext.Provider>
      )
    }
    
    export { AnimeProvider, AnimeContext };