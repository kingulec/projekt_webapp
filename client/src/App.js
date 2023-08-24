import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import NavBar from "./common/NavBar";
import CreateAccount from "./pages/CreateAccount";
import SearchPage from "./pages/SearchPage";
import FavoritesPage from "./pages/FavouritesPage";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loggedInUsername, setLoggedInUsername] = useState("");
  const [favorites, setFavorites] = useState([]);

  const handleLogin = (username) => {
    setLoggedIn(true);
    setLoggedInUsername(username);
    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("loggedInUsername", username);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setLoggedInUsername("");
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("loggedInUsername");
    setFavorites([]); // Wyczyść listę ulubionych po wylogowaniu
  };

  useEffect(() => {
    const savedLoggedIn = localStorage.getItem("loggedIn");
    const savedLoggedInUsername = localStorage.getItem("loggedInUsername");

    if (savedLoggedIn && savedLoggedInUsername) {
      setLoggedIn(true);
      setLoggedInUsername(savedLoggedInUsername);
    }
  }, []);

  return (
    <div className="App">
      <NavBar loggedIn={loggedIn} loggedInUsername={loggedInUsername} handleLogout={handleLogout} />
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/login" element={<LoginPage handleLogin={handleLogin} />} />
          <Route path="/login/create_account" element={<CreateAccount />} />
          <Route path="/search" element={<SearchPage favorites={favorites} setFavorites={setFavorites} />} />
          <Route path="/favorites" element={<FavoritesPage favorites={favorites} setFavorites={setFavorites} />} />
          <Route
            path="/"
            element={loggedIn ? <Navigate to="/home" /> : <Navigate to="/login" />} // Przekierowanie na odpowiednią stronę w zależności od zalogowania
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
