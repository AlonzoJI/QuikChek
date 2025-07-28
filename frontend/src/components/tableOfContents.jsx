import React from "react";
import { useLocation } from "react-router-dom";
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
        <a href="#home">
          <img src="" className="nav-icon"/>
          <div className="link-name">HOME</div>
        </a>
        <a href="/news">
          <img src="" className="nav-icon"/>
          <div className="name-link">NEWS</div>
        </a>
        <a href="#purpose">
          <img src="" className="nav-icon"/>
          <div className="name-link">...</div>
        </a>
      </div>
    </nav>
  );
};

export default TableOfContents;
