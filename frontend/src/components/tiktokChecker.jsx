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
            <div className="results-wrapper">
                {/* verified */}
                <div className="results-column">
                    <h3 className="column-title verified-title">Verified</h3>
                    <div className="results-grid">
                        <div className="result-card">
                            <h4 className="claim-text">“Bananas are radioactive.”</h4>
                            <div className="verification verified">VERIFIED</div>
                            <p className="blurb">Bananas naturally contain potassium-40, a radioactive isotope. The radiation is extremely minimal and harmless.</p>
                            <a href="https://www.epa.gov/radiation/understanding-radiation" className="source-link" target="_blank">View Source</a>
                        </div>
                    </div>
                </div>
                {/* unverified */}
                <div className="results-column">
                    <h3 className="column-title unverified-title">Unverified</h3>
                    <div className="results-grid">
                        <div className="result-card">
                            <h4 className="claim-text">“The Earth is flat.”</h4>
                            <div className="verification unverified">VERIFIED FALSE</div>
                            <p className="blurb">Scientific consensus based on satellite imagery and physical evidence confirms the Earth is spherical.</p>
                            <a href="https://www.nasa.gov" className="source-link" target="_blank">View Source</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default TikTokChecker;
