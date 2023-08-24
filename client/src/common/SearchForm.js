import React, { useState } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";

function SearchForm({ handleSearchResults }) {
  const [searchType, setSearchType] = useState("tytul");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://127.0.0.1:5000/search", {
        search_type: searchType,
        search_query: searchQuery,
      });

      handleSearchResults(response.data.results);
    } catch (error) {
      console.error("Error searching:", error);
    }
  };

  return (
    <Form onSubmit={handleSearch}>
      <Form.Group className="mb-3">
        <Form.Label>Search Type</Form.Label>
        <Form.Select
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
        >
          <option value="tytul">Title</option>
          <option value="autor">Authors</option>
          <option value="wydawca">Publisher</option>
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Search Query</Form.Label>
        <Form.Control
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Search
      </Button>
    </Form>
  );
}

export default SearchForm;
