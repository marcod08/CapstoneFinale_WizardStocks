import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';

const Registration = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [gender, setGender] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    
    try {
      const response = await fetch('http://localhost:44344/api/Users/Register', {
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
      
      console.log('Registration successful');
      // Qua ci devo mettere un modale di successo o qualcosa che avverta l'utente e un reindirizzamento sulla home
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Container>
      <h2>Registration</h2>

      {/* questo messaggio di errore lo devo fare un po' piu carino */}

      {error && <p style={{ color: 'red' }}>{error}</p>}
      <Form onSubmit={handleSubmit}>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formBasicConfirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formBasicBirthdate">
          <Form.Label>Date of Birth</Form.Label>
          <Form.Control
            type="date"
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formBasicGender">
          <Form.Label>Gender</Form.Label>
          <div>
            <Form.Check
              inline
              type="radio"
              label="Male"
              name="gender"
              value="male"
              onChange={(e) => setGender(e.target.value)}
              checked={gender === 'male'}
            />
            <Form.Check
              inline
              type="radio"
              label="Female"
              name="gender"
              value="female"
              onChange={(e) => setGender(e.target.value)}
              checked={gender === 'female'}
            />
            <Form.Check
              inline
              type="radio"
              label="Prefer not to say"
              name="gender"
              value="not_specified"
              onChange={(e) => setGender(e.target.value)}
              checked={gender === 'not_specified'}
            />
          </div>
        </Form.Group>

        <Button variant="primary" type="submit">Register</Button>
      </Form>
    </Container>
  );
};

export default Registration;

