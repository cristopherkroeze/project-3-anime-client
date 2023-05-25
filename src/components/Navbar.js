import { Link } from "react-router-dom";
import { useContext } from "react";

import { AuthContext } from "../context/auth.context";
 
function Navbar() {

  const { isLoggedIn, user, logOutUser } = useContext(AuthContext)

  return (
    <nav>
    <div className = "LeftAlign">
      <Link to="/">
        <button >Home</button>
      </Link>
 
     
 
      {!isLoggedIn && (
        <>
          <Link to="/signup"> <button >Sign Up</button> </Link>
          <Link to="/login"> <button >Login</button> </Link>
        </>
      )}
      </div>

      <div className = "RightAlign">
      {isLoggedIn && (
        <>
          <Link to="/animes">
            <button >Animes</button>
          </Link>
          <Link to={`/profile/${user._id}`}>
            <button >Profile</button>
          </Link>
          <span >{user && user.name}</span> 
          <Link to="/" >
          <button onClick={logOutUser}>Logout</button>
          </Link>         
        </>
        
      )}
      </div>
    </nav>
  );
}
 
export default Navbar;