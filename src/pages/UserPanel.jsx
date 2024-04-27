import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const UserPanel = () => {
    const userId = localStorage.getItem('userId');
    const [user, setUser] = useState({
        email: '',
        birthDate: '',
        gender: ''
    });
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const accessToken = localStorage.getItem('accessToken');

    // Fetch dei dati dalle mie Api
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`https://localhost:44365/api/Users/${userId}`, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                });
                const userData = await response.json();
                const birthDate = userData.birthDate.substring(0, 10);

                setUser({ ...userData, birthDate });
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUser();
    }, [userId, accessToken]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'password') {
            setPassword(value);
        } else if (name === 'confirmPassword') {
            setConfirmPassword(value);
        } else {
            setUser({ ...user, [name]: value });
        }
    };

    // Fetch per modificare i dati utente
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!password) {
            setErrorMessage('Password is required');
            return;
        }
        if (password !== confirmPassword) {
            setErrorMessage('Password and confirm password do not match');
            return;
        }
        try {
            const response = await fetch(`https://localhost:44365/api/Users/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify({ ...user, password })
            });

            if (!response.ok) {
                throw new Error('Error updating user data');
            }

            setSuccessMessage('User data updated successfully');
        } catch (error) {
            console.error('Error updating user data:', error);
            setErrorMessage('An error occurred while updating user data');
        }
    };


    return (
        <Container className="d-flex justify-content-center">
            <div className="col-md-3 blurred-box">
                <h2 className='mb-0 fw-bold'>User Panel</h2>
                {successMessage && <Alert variant="success">{successMessage}</Alert>}
                {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

                <Form className='mt-3' onSubmit={handleSubmit}>

                    <Form.Group controlId="email">
                        <Form.Label> Edit Email:</Form.Label>
                        <Form.Control className='text-center' type="email" name="email" value={user.email} onChange={handleChange} />
                    </Form.Group>

                    <Form.Group controlId="password">
                        <Form.Label className='mt-2'>New Password:</Form.Label>
                        <Form.Control className='text-center' type="password" name="password" placeholder='set your new password' value={password} onChange={handleChange} />
                    </Form.Group>

                    <Form.Group controlId="confirmPassword">
                        <Form.Label className='mt-2'>Confirm new Password:</Form.Label>
                        <Form.Control className='text-center' type="password" name="confirmPassword" placeholder='confirm your new password' value={confirmPassword} onChange={handleChange} />
                    </Form.Group>

                    <Form.Group controlId="birthDate">
                        <Form.Label className='mt-2'>Edit Birth Date:</Form.Label>
                        <Form.Control className='text-center' type="date" name="birthDate" value={user.birthDate} onChange={handleChange} />
                    </Form.Group>

                    <Form.Group controlId="gender">
                        <Form.Label className='mt-2'>Edit Gender:</Form.Label>
                        <div className='d-flex flex-column justify-content-center align-items-center'>
                            <Form.Check
                                className='w-50'
                                type="radio"
                                label="Male"
                                name="gender"
                                value="male"
                                checked={user.gender === "male"}
                                onChange={handleChange}
                            />
                            <Form.Check
                                className='w-50'
                                type="radio"
                                label="Female"
                                name="gender"
                                value="female"
                                checked={user.gender === "female"}
                                onChange={handleChange}
                            />
                            <Form.Check
                                className='w-50'
                                type="radio"
                                label="Not specified"
                                name="gender"
                                value="not_specified"
                                checked={user.gender === "not_specified"}
                                onChange={handleChange}
                            />
                        </div>
                    </Form.Group>

                    <Button className='mt-3 me-2 button-hover' variant="primary" type="submit">Save</Button>
                    <Link to={{ pathname: `/` }}>
                        <Button className='mt-3 button-hover' variant="danger">Go to Home</Button>
                    </Link>

                </Form>

            </div>
        </Container>
    );
};

export default UserPanel;
