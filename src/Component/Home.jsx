import React from "react";
import { Link } from "react-router-dom";
import '../Style/Home.css'; // Importation du fichier CSS pour la mise en forme de la Navbar

function Home() {
  return (
    <div>
      <nav className="navbar">
        <ul className="navbar-links">
          <li>
            <Link to="/" className="navbar-link">Home</Link>
          </li>
          <li>
            <Link to="/about" className="navbar-link">About</Link>
          </li>
          <li>
            <Link to="/login" className="navbar-link">Login</Link>
          </li>
          <li>
            <Link to="/register" className="navbar-link">Register</Link>
          </li>
        </ul>
      </nav>

      <div className="header-image-container">
        <img
          src="" // Remplacez par l'URL de votre image
          alt="Large Banner"
          className="header-image"
        />
      </div>
    </div>
  );
}

export default Home;
