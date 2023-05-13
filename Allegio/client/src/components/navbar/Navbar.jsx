import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./navbar.css";
const Navbar = () => {
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };
  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">Allegio</span>
        </Link>
        <div className="navItems">
          <button className="navButton">List your Property</button>
          {!(user && user.email) ? (
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
            <button className="navButton" onClick={logout}>
              {" "}
              Logout{" "}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
