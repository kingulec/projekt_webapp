import React, { useState } from "react";
import { Link } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

function FavoritesPage({ favorites, setFavorites }) {
  const [selectedFavorites, setSelectedFavorites] = useState([]); // Stan wybranych ulubionych książek

  const handleSelect = (bookTitle) => {
    if (selectedFavorites.includes(bookTitle)) {
      setSelectedFavorites(selectedFavorites.filter(title => title !== bookTitle));
    } else {
      setSelectedFavorites([...selectedFavorites, bookTitle]);
    }
  };

  const handleRemoveFavorites = () => {
    const updatedFavorites = favorites.filter(title => !selectedFavorites.includes(title));
    setFavorites(updatedFavorites);
    setSelectedFavorites([]); // Wyczyść zaznaczone ulubione książki
  };

  return (
    <div>
      <h1>Favorites</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Select</th>
          </tr>
        </thead>
        <tbody>
          {favorites.map((favorite, index) => (
            <tr key={index}>
              <td>{favorite}</td>
              <td>
                <input
                  type="checkbox"
                  checked={selectedFavorites.includes(favorite)}
                  onChange={() => handleSelect(favorite)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button onClick={handleRemoveFavorites}>Remove Selected</Button>
      <Link to="/search">Back to Search</Link>
    </div>
  );
}

export default FavoritesPage;
