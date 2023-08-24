import React, { useState } from "react";
import { Link } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import SearchForm from "../common/SearchForm";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

function SearchPage({ favorites, setFavorites }) {
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchResults = (results) => {
    setSearchResults(results);
  };

  const addToFavorites = (bookTitle) => {
    if (!favorites.includes(bookTitle)) {
      setFavorites([...favorites, bookTitle]);
    }
  };

  return (
    <div>
      <h1>Searcher</h1>
      <SearchForm handleSearchResults={handleSearchResults} />
      <div>
        <h2>Search Results:</h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Title</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {searchResults.map((result, index) => (
              <tr key={index}>
                <td>{result}</td>
                <td>
                  <Button onClick={() => addToFavorites(result)}>
                    Add to Favorites
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <div>
        <Link to="/favorites">Go to Favorites</Link>
      </div>
    </div>
  );
}

export default SearchPage;
