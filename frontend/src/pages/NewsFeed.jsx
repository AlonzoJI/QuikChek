import { useState } from "react";
import NewsCard from "../components/NewsCard";
import "../styles/NewsFeed.css";

// temporary sample data
const testArticles = [
  {
    source: "Reuters",
    headline: "This is a Test News Headline",
    briefSummary: "This is the brief version of the news.",
    standardSummary:
      "This is the standard length summary with more details about the news story.",
    detailedSummary:
      "This is the detailed summary with comprehensive information about the news story, including background context and analysis.",
    category: "Technology",
  },
  {
    source: "TechCrunch",
    headline: "AI Assistant Launches for Smartphones",
    briefSummary: "New AI helper app releases today.",
    standardSummary:
      "A major tech company has launched an advanced AI assistant designed to help users with daily tasks.",
    detailedSummary:
      "Silicon Valley's newest breakthrough comes in the form of an artificial intelligence assistant that promises to revolutionize how we interact with our devices through natural language processing.",
    category: "Technology",
  },
  {
    source: "Financial Times",
    headline: "Global Markets Rally After Economic Data",
    briefSummary: "Stock markets rise worldwide.",
    standardSummary:
      "International stock markets experienced significant gains following positive economic indicators.",
    detailedSummary:
      "Financial markets across the globe surged today as investors responded positively to encouraging economic data showing stronger job growth, controlled inflation, and increased consumer confidence.",
    category: "Business",
  },
];


export default function NewsFeed() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationDirection, setAnimationDirection] = useState("");

  //left button click
  const goToPrevious = () => {
    if (isAnimating) return; 
    setIsAnimating(true);
    setAnimationDirection("slide-right");
    setTimeout(() => {
      setCurrentCardIndex((prev) =>
        prev === 0 ? testArticles.length - 1 : prev - 1
      ); // updates index to decrease by 1
      setAnimationDirection("slide-in-left"); // previous card slide in from left
      setTimeout(() => {
        setIsAnimating(false); // end animation
        setAnimationDirection("");}
        , 250);
      }, 300); 
  };

  //right button click
  const goToNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setAnimationDirection("slide-left");
    setTimeout(() => {
      setCurrentCardIndex((prev) =>
        prev === testArticles.length - 1 ? 0 : prev + 1
      );// updates index to decrease by 1
      setAnimationDirection("slide-in-right"); // next card slide in from right
      setTimeout(() => {
        setIsAnimating(false); // end animation
        setAnimationDirection("");
      }, 250);
    }, 300);
  };

  // news feed setup 
  return (
    <main className="news-feed">
      <h1>Your News Feed</h1>
      <div className="news-card-container">
        <NewsCard
          article={testArticles[currentCardIndex]}
          animationClass={animationDirection}
        />
        <div className="swipe-buttons">
          <button
            className="swipe-btn swipe-btn-left"
            onClick={goToPrevious}
            disabled={isAnimating}
          >
            ←
          </button>
          <button
            className="swipe-btn swipe-btn-right"
            onClick={goToNext}
            disabled={isAnimating}
          >
            →
          </button>
        </div>
      </div>
    </main>
  );
}
