import React from "react";
import { Link } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';

function NavBar({ loggedIn, loggedInUsername, handleLogout, favoritesCount }) {
  return (
    <Navbar bg="light" className="mb-3">
      <Navbar.Toggle />
      <Navbar.Offcanvas
        placement="end"
      >
        <Offcanvas.Header closeButton>
          
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="justify-content-end flex-grow-1 pe-3">
            <Nav.Link href="/home">Home</Nav.Link>
            
            {loggedIn ? ( 
              <>
                <NavDropdown title="Account">
                  <NavDropdown.Item>Your Account </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/home/basket">Your basket</NavDropdown.Item>
                  <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                </NavDropdown>
                <Nav.Link href="/favorites">Favorites ({favoritesCount})</Nav.Link> {/* Dodaj liczbę ulubionych książek */}
              </>
            ) : (
              <>
                <Nav.Link href="/login">Log in</Nav.Link>
                <Nav.Link href="/login/create_account">Create account</Nav.Link>
              </>
            )}
          </Nav>
        </Offcanvas.Body>
      </Navbar.Offcanvas>
    </Navbar>
  );
}

export default NavBar;
