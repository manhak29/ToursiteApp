import React, { useState, useEffect } from "react";
import "../styles/App.css";
import "../styles/styles.css"; // Import the Figma styles

const HomePage = () => {
  const [location, setLocation] = useState({ latitude: 32.9859827, longitude: -96.7512878 });
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); // State for search input

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setError("");
        },
        (err) => {
          switch (err.code) {
            case err.PERMISSION_DENIED:
              setError("User denied the request for Geolocation.");
              break;
            case err.POSITION_UNAVAILABLE:
              setError("Location information is unavailable.");
              break;
            case err.TIMEOUT:
              setError("The request to get user location timed out.");
              break;
            default:
              setError("An unknown error occurred.");
          }
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    if (window.google) {
      const map = new window.google.maps.Map(document.getElementById("map"), {
        center: { lat: location.latitude, lng: location.longitude },
        zoom: 10,
      });

      new window.google.maps.Marker({
        position: { lat: location.latitude, lng: location.longitude },
        map: map,
        title: "You are here!",
      });
    }
  }, [location]);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    console.log("Search Query:", event.target.value); // Handle search logic here
  };

  const renderScrollableSection = (title, items) => (
    <div className="scrollable-section">
      <h3 className="section-title">{title}</h3>
      <div className="scroll-container">
        {items.map((item, index) => (
          <div key={index} className="circle-item">
            <div className="circle"></div>
            <p className="place-name">{item}</p>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="homepage">
      {/* Title Div */}
      <div className="title-div">
        <h1>EnVoyage</h1>
      </div>

      <div className="big-div">
        {/* Left Side: Search Bar and Map */}
        <div className="left-div">
          {/* Search Bar */}
          <div className="search-bar">
            <input
              type="text"
              className="search-input"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>

          {/* Map */}
          <div id="map" className="rectangle"></div>
        </div>

        {/* Right Side: Sections */}
        <div className="right-big-div">
          {renderScrollableSection("Recent Exploration", ["Place 1", "Place 2", "Place 3"])}
          {renderScrollableSection("Historical Hotspots", ["Hotspot 1", "Hotspot 2", "Hotspot 3"])}
          {renderScrollableSection("Self-Guided Tours", ["Tour 1", "Tour 2", "Tour 3"])}
          {renderScrollableSection("Recent Community Posts", ["Post 1", "Post 2", "Post 3"])}
        </div>
      </div>

      {/* Map Controls */}
      <div className="container">
        <button className="button" onClick={getLocation}>
          Show My Location
        </button>
        {error && <p id="demo" style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
};

export default HomePage;