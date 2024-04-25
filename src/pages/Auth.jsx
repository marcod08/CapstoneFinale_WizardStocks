import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Form, Button, Col, Alert } from 'react-bootstrap';

const Auth = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://localhost:44365/api/Users/Login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        const data = await response.json();
        const { accessToken, userId } = data;

        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('userId', userId);

        setSuccessMessage('Login successful!');
        setErrorMessage(null);

        setTimeout(() => {
          navigate('/');
        }, 1500);
      } else {
        setErrorMessage('Invalid email or password. Please try again.');
        setSuccessMessage(null);
      }
    } catch (error) {
      console.error('Error during login:', error);
      setErrorMessage('An error occurred while logging in. Please try again later.');
      setSuccessMessage(null);
    }
  };

  return (
    <Container>
      <h2 className='mt-3 mb-0'>Login</h2>
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
      <div className="d-flex justify-content-center mt-3">
        <Col md={3}>
          <Form onSubmit={handleSubmit}>

            <Form.Group controlId="email">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                className='text-center'
                type="email"
                placeholder="Enter your email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label className='mt-2'>Password:</Form.Label>
              <Form.Control
                className='text-center'
                type="password"
                placeholder="Enter your password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button className='mt-3' variant="primary" type="submit">
              Login
            </Button>

            <Link to="/registration"><p className='mt-2'>Don't have an account? Sign up here.</p></Link>
          </Form>
        </Col>
      </div>
    </Container>
  );
};

export default Auth;
