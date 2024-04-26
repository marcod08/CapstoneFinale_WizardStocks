import React, { useState } from 'react';
import { Form, Button, Container, Col, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Registration = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [gender, setGender] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    try {
      const response = await fetch('https://localhost:44365/api/Users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          birthdate,
          gender
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed');
      }

      setSuccessMessage(true);

      setTimeout(() => {
        navigate('/auth');
      }, 1500);

    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <Container className="d-flex justify-content-center">
      <div className="col-md-4 blurred-box">
        <h2 className='mb-0'>Registration</h2>

        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
        {successMessage && <Alert variant="success">Registration successful. Redirecting to login page...</Alert>}
        <Form className='mt-3' onSubmit={handleSubmit}>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email:</Form.Label>
            <Form.Control
              className='text-center'
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label className='mt-2'>Password:</Form.Label>
            <Form.Control
              className='text-center'
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formBasicConfirmPassword">
            <Form.Label className='mt-2'>Confirm Password:</Form.Label>
            <Form.Control
              className='text-center'
              type="password"
              placeholder="Confirm your Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formBasicBirthdate">
            <Form.Label className='mt-2'>Date of Birth:</Form.Label>
            <Form.Control
              className='text-center'
              type="date"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formBasicGender">
            <Form.Label className='mt-2'>Gender:</Form.Label>
            <div className='d-flex flex-column justify-content-center align-items-center'>
              <Form.Check
                className='w-50'
                type="radio"
                label="Male"
                name="gender"
                value="male"
                onChange={(e) => setGender(e.target.value)}
                checked={gender === 'male'}
              />
              <Form.Check
                className='w-50'
                type="radio"
                label="Female"
                name="gender"
                value="female"
                onChange={(e) => setGender(e.target.value)}
                checked={gender === 'female'}
              />
              <Form.Check
                className='w-50'
                type="radio"
                label="Not Specified"
                name="gender"
                value="not_specified"
                onChange={(e) => setGender(e.target.value)}
                checked={gender === 'not_specified'}
              />
            </div>
          </Form.Group>

          <Button className='mt-3 me-2' variant="primary" type="submit">Register</Button>
          <Link to={{ pathname: `/` }}>
            <Button className='mt-3' variant="danger">Go to Home</Button>
          </Link>
        </Form>
      </div>
    </Container>
  );
};

export default Registration;