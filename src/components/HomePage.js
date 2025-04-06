import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa"; // Import Font Awesome search icon
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
          <a
            key={index}
            href={`/places/${item.name.toLowerCase().replace(/\s+/g, "-")}`} // Generate a URL based on the place name
            className="image-item"
            style={{ textDecoration: "none" }} // Remove underline from links
          >
            <img src={item.image} alt={item.name} className="image" />
            <p className="place-name">{item.name}</p>
          </a>
        ))}
      </div>
    </div>
  );

  return (
    <div className="homepage">
      {/* User Circle */}
      <div className="user-circle"></div>

      {/* Title Div */}
      <div className="title-div">
        <h1>EnVoyage</h1>
        <p>Let's transcend time through the past</p>
      </div>

      <div className="big-div">
        {/* Left Side: Search Bar and Map */}
        <div className="left-div">
          {/* Search Bar */}
          <div className="search-bar">
            <FaSearch className="search-icon" /> {/* Add the search icon */}
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
          {renderScrollableSection("Recent Exploration", [
            { name: "The Love Jack", image: "/images/thelovejack.png" },
            { name: "The Plinth", image: "/images/plinth.png" },
            { name: "The Crow Museum of Asian Art", image: "/images/crowmuseum.png" },
          ])}
          {renderScrollableSection("Historical Hotspots", [
            { name: "Hotspot 1", image: "/images/hotspot1.jpg" },
            { name: "Hotspot 2", image: "/images/hotspot2.jpg" },
            { name: "Hotspot 3", image: "/images/hotspot3.jpg" },
          ])}
          {renderScrollableSection("Self-Guided Tours", [
            { name: "Tour 1", image: "/images/tour1.jpg" },
            { name: "Tour 2", image: "/images/tour2.jpg" },
            { name: "Tour 3", image: "/images/tour3.jpg" },
          ])}
          {renderScrollableSection("Recent Community Posts", [
            { name: "Post 1", image: "/images/post1.jpg" },
            { name: "Post 2", image: "/images/post2.jpg" },
            { name: "Post 3", image: "/images/post3.jpg" },
          ])}
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