import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa"; // Import Font Awesome search icon
import "../styles/App.css";
import "../styles/styles.css"; // Import the styles

const HomePage = () => {
  const [location, setLocation] = useState({ latitude: 32.9859827, longitude: -96.7512878 }); // Default location
  const [error, setError] = useState(""); // State for error messages
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const [map, setMap] = useState(null); // State to store the map instance
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for dropdown visibility

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen); // Toggle dropdown visibility
  };

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
          setError("Unable to retrieve location.");
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    if (window.google) {
      const mapInstance = new window.google.maps.Map(document.getElementById("map"), {
        center: { lat: location.latitude, lng: location.longitude },
        zoom: 10,
      });
      setMap(mapInstance);

      new window.google.maps.Marker({
        position: { lat: location.latitude, lng: location.longitude },
        map: mapInstance,
        title: "You are here!",
      });
    }
  }, [location]);

  const handleSearch = async (event) => {
    setSearchQuery(event.target.value);
  };

  const searchLocation = async () => {
    if (!searchQuery) {
      setError("Please enter a location.");
      return;
    }

    try {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address: searchQuery }, (results, status) => {
        if (status === "OK") {
          const newLocation = results[0].geometry.location;
          map.setCenter(newLocation); // Update the map's center
          new window.google.maps.Marker({
            position: newLocation,
            map: map,
            title: searchQuery,
          });
          setError(""); // Clear any previous errors
        } else if (status === "ZERO_RESULTS") {
          setError("Location not found. Please try a different query.");
        } else {
          setError("An error occurred. Please try again.");
        }
      });
    } catch (err) {
      setError("An error occurred while searching for the location.");
    }
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
      

      {/* Title Div */}
      <div class="title-div">
    <h1>EnVoyage</h1>
    <p>Let's transcend time through our past!</p>
</div>

<div className="user-circle" onClick={toggleDropdown}></div>
      {isDropdownOpen && (
        <div className="dropdown-menu">
          <ul>
            <li><a href="/profile">Profile</a></li>
            <li><a href="/settings">Settings</a></li>
            <li><a href="/logout">Logout</a></li>
          </ul>
        </div>
      )}

      <div className="big-div">
        {/* Left Side: Search Bar and Map */}
        <div className="left-div">
          {/* Search Bar */}
          <div className="search-bar">
            <FaSearch className="search-icon" onClick={searchLocation} style={{ cursor: "pointer" }} />
            <input
              type="text"
              className="search-input"
              placeholder="Search for a location..."
              value={searchQuery}
              onChange={handleSearch}
              onKeyDown={(e) => e.key === "Enter" && searchLocation()} // Trigger search on Enter key
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

      {/* Map Controls
      <div className="container">
        <button className="button" onClick={getLocation}>
          Show My Location
        </button>
        {error && <p id="demo" style={{ color: "red" }}>{error}</p>}
      </div> */}
    </div>
  );
};

export default HomePage;