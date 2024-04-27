import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Logo from '../assets/images/logo.jpg';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';
import profilePic from '../assets/images/profilePic.jpg';
import { Image } from 'react-bootstrap';

function MyNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userId');
    navigate('/auth');
  };

  const isLoggedIn = localStorage.getItem('accessToken') && localStorage.getItem('userId');

  return (
    <Navbar expand="lg" className="navbar-custom">
      <Container>
        <Navbar.Brand className='nav-link-hover' as={Link} to="/">
          <img src={Logo} alt="logo" className='rounded-circle' style={{ width: '2.2em', height: 'auto' }} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link className='fw-bold nav-link-hover' as={Link} to="/">WizardStocks</Nav.Link>
            <Nav.Link className='nav-link-hover' as={Link} to="/">Home</Nav.Link>
            <Nav.Link className='nav-link-hover' as={Link} to="/expensive">Top Cards</Nav.Link>
            <Nav.Link className='nav-link-hover' as={Link} to="/reserved">Reserved List</Nav.Link>
            {isLoggedIn &&
              <Nav.Link className='nav-link-hover' as={Link} to="/favs">Favorites</Nav.Link>
            }
          </Nav>
          <Nav className="ml-auto">
            {isLoggedIn ? (
              <NavDropdown title={<Image src={profilePic} alt="profile" className='nav-link-hover' roundedCircle style={{ width: '2.2em', height: 'auto' }} />} id="basic-nav-dropdown">
                <NavDropdown.Item className='nav-link-hover' as={Link} to="/panel">User Panel</NavDropdown.Item>
                <NavDropdown.Item className='nav-link-hover' onClick={handleLogout}>Logout</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <>
                <Nav.Link className='nav-link-hover' as={Link} to="/auth">Login</Nav.Link>
                <Nav.Link className='nav-link-hover' as={Link} to="/registration">Register</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;
