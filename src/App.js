
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import AllAnimesPage from './pages/AllAnimesPage.js';
import AnimeDetailsPage from './pages/AnimeDetailsPage'
import EditAnimePage from './pages/EditAnimePage';
import CreateACharacterPage from "./pages/CreateACharacterPage"
import SignupPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import UserProfilePage from './pages/UserProfilePage';
import EditUserPage from './pages/EditUserPage';

import IsPrivate from './components/IsPrivate';
import IsAnon from './components/IsAnon';

function App() {
  return (
    <div className="App" >

      <Navbar />

      <Routes>

        <Route path='/' element={<HomePage />} />


        <Route
          path="/animes"
          element={ <AllAnimesPage /> } 
        />
 
        <Route
          path="/animes/:animeId"
          element={ <AnimeDetailsPage /> }
        />

        <Route
          path="/animes/addCharacter"
          element={ <CreateACharacterPage /> }
        />
 
        <Route
          path="/animes/edit/:animeId"
          element={<EditAnimePage />} 
        />
        
        <Route path="/signup" element={<IsAnon> <SignupPage /> </IsAnon>} />
        <Route path="/login" element={<IsAnon> <LoginPage /> </IsAnon>} />
        <Route path="/profile/:userId" element={<UserProfilePage/>}/>
        <Route path="/profile/edit/:userId" element={<IsPrivate> <EditUserPage/> </IsPrivate>}/>
        

      </Routes>

    </div>
  );
}

export default App;
