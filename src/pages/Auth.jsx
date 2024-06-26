import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { myApiDomain } from '../components/MyApiDomain';

const Auth = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${myApiDomain}/api/Users/Login`, {
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
    <Container className="d-flex justify-content-center">
      <div className="col-md-4 blurred-box">
      <h2 className='mb-0 fw-bold'>Login</h2>
      {successMessage && <Alert className='my-2' variant="success">{successMessage}</Alert>}
      {errorMessage && <Alert className='my-2' variant="danger">{errorMessage}</Alert>}
          <Form className='mt-3' onSubmit={handleSubmit}>

            <Form.Group controlId="email">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                className='text-center opc'
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
                className='text-center opc'
                type="password"
                placeholder="Enter your password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button className='mt-3 button-hover' variant="primary" type="submit">
              Login
            </Button>

            <Link to="/registration"><p className='mt-2 text-light text-decoration-underline'>Don't have an account? Sign up here.</p></Link>
          </Form>
      </div>
    </Container>
  );
};

export default Auth;
