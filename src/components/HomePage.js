import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa"; // Import Font Awesome search icon
import "../styles/App.css";
import "../styles/styles.css"; // Import the styles

const HomePage = () => {
  const [location, setLocation] = useState({ latitude: 32.9859827, longitude: -96.7512878 }); // Default location
  const [error, setError] = useState(""); // State for error messages
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const [map, setMap] = useState(null); // State to store the map instance
  const [marker, setMarker] = useState(null); // State to store the marker instance
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for dropdown visibility

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen); // Toggle dropdown visibility
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("Current Location:", position.coords.latitude, position.coords.longitude);
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
    getLocation(); // Automatically get the user's location when the page loads

    if (window.google) {
      const mapInstance = new window.google.maps.Map(document.getElementById("map"), {
        center: { lat: location.latitude, lng: location.longitude },
        zoom: 15,
      });
      setMap(mapInstance);

      // Add a marker for the user's current location
      const markerInstance = new window.google.maps.Marker({
        position: { lat: location.latitude, lng: location.longitude },
        map: mapInstance,
        title: "You are here!",
      });
      setMarker(markerInstance);

      // Add a marker for "The Love Jack"
      const loveJackMarker = new window.google.maps.Marker({
        position: { lat: 32.990669, lng: -96.749680 },
        map: mapInstance,
        title: "The Love Jack",
      });

      // Add a marker for the user's current location
      const plinthInstance = new window.google.maps.Marker({
        position: { lat: 32.9873, lng:  -96.7483 },
        map: mapInstance,
        title: "The Plinth",
      });
      setMarker(markerInstance);

      // Create an info window for "The Love Jack"
      const loveJackInfoWindow = new window.google.maps.InfoWindow({
        content: `
          <div>
      <h1>The Love Jack</h1>
      <div>
        <p>
          "<b>The Love Jack</b>, affectionately known as the Love Jack by generations of UT Dallas students, the 10-foot-by-10-foot red, steel sculpture was created by Texas artist Jim Love and was gifted to UT Dallas in 1976. 
          The sculpture is located in the center of the campus, near the Student Union and the Green Center."
        </p>
        <p>
          <img src="/images/thelovejack.png" alt="The Love Jack" width="200" height="200" /
          (last visited June 22, 2009).
        </p>
      </div>
        `,
      });

      const plinthWindow = new window.google.maps.InfoWindow({
        content: `
          <div>
      <h1>The Plinth</h1>
      <div>
        <p>
          "<b>The Plinth</b>, Popular gathering spot at the University of Texas at Dallas with food and recreation nearby."
        </p>
        <p>
          <img src="/images/plinth.png" alt="The Plinth" width="200" height="200" /
          (last visited June 22, 2009).
        </p>
      </div>
        `,
      });

      

      // Add a click listener to the "The Love Jack" marker to open the info window
      loveJackMarker.addListener("click", () => {
        loveJackInfoWindow.open({
          anchor: loveJackMarker,
          map: mapInstance,
          shouldFocus: false,
        });
      });

      // Add a click listener to the "The Love Jack" marker to open the info window
      plinthInstance.addListener("click", () => {
        plinthWindow.open({
          anchor: plinthInstance,
          map: mapInstance,
          shouldFocus: false,
        });
      });

      // Create an info window for the user's location
      const userInfoWindow = new window.google.maps.InfoWindow({
        content: `
          <div>
            <h1>You are here!</h1>
            <p>This is your current location.</p>
          </div>
        `,
      });

      // Add a click listener to the user's marker to open the info window
      markerInstance.addListener("click", () => {
        userInfoWindow.open({
          anchor: markerInstance,
          map: mapInstance,
          shouldFocus: false,
        });
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
          marker.setPosition(newLocation); // Update the marker's position
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
      {/* Show Location Button */}
      <button
        className="show-location-button"
        onClick={getLocation}
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          zIndex: 1000,
          padding: "10px 15px",
          backgroundColor: "#ef6e34",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Show Your Location
      </button>

      {/* Title Div */}
      <div className="title-div">
        <h1>EnVoyage</h1>
        <p>Transcend Time, Unite Generations!</p>
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
            { name: "Hotspot 1", image: "/images/dma.jpg" },
            { name: "Hotspot 2", image: "/images/henryHobsin.jpg" },
            { name: "Hotspot 3", image: "/images/mckamySpring.jpg" },
          ])}
          {renderScrollableSection("Self-Guided Tours", [
            { name: "Tour 1", image: "/images/busTour.jpg" },
            { name: "Tour 2", image: "/images/dallasTour.jpg" },
            { name: "Tour 3", image: "/images/utdTour.jpg" },
          ])}
          {renderScrollableSection("Recent Community Posts", [
            { name: "Post 1", image: "/images/gaming.png" },
            { name: "Post 2", image: "/images/water.png" },
            { name: "Post 3", image: "/images/oldpeople.png" },
          ])}
        </div>
      </div>
    </div>
  );
};

export default HomePage;