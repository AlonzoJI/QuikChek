import React from "react";
import "../styles/tiktokChecker.css";

const TikTokChecker = () => {
  return (
    // tt checker 
    <div className="tiktok-checker-section" id="tiktok-checker">

        {/* container */}
        <div className="checker-container">

            {/* header */}
            <div>
                <h2>TikTok Fact-Checker</h2>
                <p>Verify claims in TikTok videos with AI-powered analysis</p>
            </div>
            
            {/* link input */}
            <div className="input-section">
                <input type="text" placeholder="Paste Link Here"/>
                <button>Analyze</button>
            </div>
            
            {/* outputted results from search */}
            <div className="results-grid">

                {/* column for true false split - for true */}
                <div className="results-column">
                    <div className="column-label true-label">TRUE</div>
                    <div className="result-box">
                        <h4>TRUE</h4>
                        <a href="#">View Source</a>
                    </div>
                 </div>
                
                {/* column for true false split - for false */}
                <div className="results-column">
                    <div className="column-label false-label">FALSE</div>
                    <div className="result-box">
                        <h4>FALSE</h4>
                        <a href="#">View Source</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default TikTokChecker;
