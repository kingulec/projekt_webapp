import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

function LoginPage({ handleLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginMessage, setLoginMessage] = useState(""); 
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://127.0.0.1:5000/login", { username, password });
      if (response.status === 200) {
        handleLogin(); // Aktualizuj stan zalogowania w App.js
        setLoginMessage("Login successful " + username); // Ustaw komunikat o poprawnym zalogowaniu
        
      }
      
    } catch (error) {
      console.error("Error logging in:" + username, error);
      setLoginMessage("Invalid credentials");}
    
  };

  return (
    <div>
      <h1>Login Page</h1>
      <Form  onSubmit={handleSubmit}>
      <Row className="mb-3">
      <Form.Group as={Col} md="4" controlId="validationCustom01">
        <Form.Label>Username:</Form.Label>
        <Form.Control
                        required
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
          {/* <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} /> */}
        </Form.Group>
        </Row>
        <Row className="mb-3">
        <Form.Group as={Col} md="4">
        <Form.Label>Password:</Form.Label>
        <Form.Control required
                      type="password"
                      placeholder="password"
                      value={password} onChange={(e) => setPassword(e.target.value)}
                      
                      />
        </Form.Group></Row>
        <Button type="submit">Login</Button>
        </Form>
      <p>{loginMessage}</p> {/* Wyświetl komunikat */}
      <p>Don't have an account? <Link to="/login/create_account">Create an account</Link></p>
      
    </div>
  );
}

export default LoginPage;
