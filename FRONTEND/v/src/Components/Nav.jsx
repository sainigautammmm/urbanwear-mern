import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Nav() {
  const user = useSelector((state) => state.myuser.user);
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary shadow-sm">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" to="/">UrbanWear</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item"><Link className="nav-link active" to="/">Home</Link></li>
           
            <li className="nav-item"><Link className="nav-link fw-semibold" to="/ai-stylist">✨ AI Stylist</Link></li>
            <li className="nav-item"><Link className="nav-link active" to="/cart">CART</Link></li>
            <li className="nav-item"><Link className="nav-link active" to="/Pricing">PRICING</Link></li>
          </ul>
          <Link to="/register"><button className="btn btn-outline-dark mx-1">Register</button></Link>
          {user.token ? (
            <Link to="/logout"><button className="btn btn-outline-dark mx-1">Logout</button></Link>
          ) : (
            <Link to="/login"><button className="btn btn-outline-dark mx-1">Login</button></Link>
          )}
        </div>
      </div>
    </nav>
  );
}
export default Nav;
