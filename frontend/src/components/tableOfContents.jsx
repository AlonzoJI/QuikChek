import React from "react";
import {Link} from "react-router-dom";
import "../styles/tableOfContents.css";

// navbar
const TableOfContents = () => {
  return (
    <nav className="navbar">
      <div className="left-nav">

        {/* web name */}
        <h1>QuikChek</h1>

        {/* tiktok logo */}
        <img src="/pics/tiktok-logo.png" alt="TikTok Logo" className="tiktok-logo"/>
      </div>
      
      {/* nav links */}
      <div className="nav-links">
        <Link to="/">
          <img src="" className="nav-icon" alt="" />
          <div className="link-name">HOME</div>
        </Link>
        <Link to="/news">
          <img src="" className="nav-icon" alt="" />
          <div className="name-link">NEWS</div>
        </Link>
        <Link to="">
          <img src="" className="nav-icon" alt="" />
          <div className="name-link">...</div>
        </Link>
      </div>
    </nav>
  );
};

export default TableOfContents;
