import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./navbar.css";

const Navbar = () => {
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const logout = () => {
    // Perform any necessary logout actions (e.g., API call, removing cookies)
    // ...

    // Update the user state based on the response
    dispatch({ type: "LOGOUT" });
  };

  const isSessionCookiePresent = () => {
    return document.cookie.split(';').some((cookie) => {
      const trimmedCookie = cookie.trim();
      return trimmedCookie.startsWith('your-session-cookie-name='); // Replace with your actual cookie name
    });
  };// Empty dependency array ensures this effect runs only once on mount

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">Allegio</span>
        </Link>
        <div className="navItems">
          <Link to={"/listproperty"}>
            <button className="navButton">List your Property</button>
          </Link>
          {!(user && user.email) && !isSessionCookiePresent() ? (
            // Show these buttons only when the user is not logged in and no session cookie is present
            <>
              <button
                className="navButton"
                onClick={() => navigate("/register")}
              >
                Register
              </button>
              <button className="navButton" onClick={() => navigate("/login")}>
                Login
              </button>
            </>
          ) : (
            // Show these buttons only when the user is logged in or a session cookie is present
            <>
              <button className="navButton" onClick={logout}>
                Logout
              </button>
              <Link to={`/profile/${user?._id || 'userId'}`} style={{ textDecoration: 'none' }}>
                <button className="profileButton">
                  <FontAwesomeIcon icon={faUser} />
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;