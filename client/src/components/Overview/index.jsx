import { useEffect } from "react";
import OverviewNav from "./OverviewNav";
import "./overview.styles.css";
import axios from "axios";

const Overview = () => {
  
  return (
    <div className="overview">
      <OverviewNav />
      <div className="overview-first-imp">
        <h1 className="overview-header">
          Build Better <span className="animate-text">Habits</span>,
        </h1>
        <h1 className="overview-header">
          Build Better <span className="animate-text">Life</span>.
        </h1>

        <p className="overview-quote">
          Harness the power of our personalized habit tracker app to streamline
          your everyday routines and achieve your goals.
        </p>
        <button className="try-free-btn">Try For Free</button>
      </div>
      {/* Preview Image */}
      <div className="preview-img">
        <h1>Desktop / Mobile Preview</h1>
      </div>

      {/* Features Preview */}
      <div className="preview-features">
        <h1>Some Text</h1>
        <p>Related Quote</p>
        {/* Features */}
      </div>

      {/* Challenges Preview Show case */}
      <div className="preview-challenge"></div>

      {/* A Sexy Footer */}
      <div className="overview-footer"></div>
    </div>
  );
};

export default Overview;
