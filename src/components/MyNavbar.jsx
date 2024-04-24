import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Logo from '../assets/images/logo.jpg';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';

function MyNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userId');
    navigate('/auth');
  };

  const isLoggedIn = localStorage.getItem('accessToken') && localStorage.getItem('userId');

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={Link} to="/"><img src={Logo} alt="logo" style={{ width: '3em', height: 'auto' }} /></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/stocks">Stocks</Nav.Link>
            {isLoggedIn &&
              <Nav.Link as={Link} to="/favs">Favourite Cards</Nav.Link>
            }
          </Nav>
          <Nav className="ml-auto">
            {isLoggedIn ? (
              <NavDropdown title="User" id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to="/panel">User Panel</NavDropdown.Item>
                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav.Link as={Link} to="/auth">Login</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;