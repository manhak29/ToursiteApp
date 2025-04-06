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

  return (
    <div className="homepage">
      <div className="div">
        {/* Removed the ellipse */}
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

        <h1 className="text-wrapper-1">EnVoyage</h1>
        <p className="text-wrapper">
          Let’s Transcend Time/Living through the past
        </p>        
        <div className="ellipse-3" />
        <div className="ellipse-4" />
        <div className="ellipse-5" />
        <div className="ellipse-6" />
        <div className="text-wrapper-2">Recent Exploration</div>
        <div className="text-wrapper-3">Historical Hotspots</div>
        <div className="text-wrapper-4">Self-Guided Tours</div>
        <div className="text-wrapper-5">Recent Community Posts</div>
        <div className="rectangle-2" />
        <div className="rectangle-3" />
        <div className="rectangle-4" />
        <div className="rectangle-5" />
        <div className="rectangle-6" />
        <div className="rectangle-7" />
        <div className="rectangle-8" />
        <div className="rectangle-9" />
        <div className="rectangle-10" />
        <div className="rectangle-11" />
        <div className="rectangle-12" />
        <div className="rectangle-13" />

        {/* Map Controls */}
        <div className="container" style={{ marginTop: "20px" }}>
          <button className="button" onClick={getLocation}>
            Show My Location
          </button>
          {error && <p id="demo" style={{ color: "red" }}>{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default HomePage;