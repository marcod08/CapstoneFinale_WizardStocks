import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Col, Alert } from 'react-bootstrap';

const UserPanel = () => {
    const userId = localStorage.getItem('userId');
    const [user, setUser] = useState({
        email: '',
        password: '',
        birthDate: '',
        gender: ''
    });
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const accessToken = localStorage.getItem('accessToken');

    // Qua fetcho i valori dell'utente dalle mie api
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`https://localhost:44365/api/Users/${userId}`);
                const userData = await response.json();
                const birthDate = userData.birthDate.substring(0, 10); // qui taglio la data per poter popolare l'input field con un valore compatibile
                
                setUser({ ...userData, birthDate });
            } catch (error) {
                console.error('Errore durante il recupero dei dati dell\'utente:', error);
            }
        };

        fetchUser();
    }, [userId, accessToken]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    // Qui fetcho per la modifica dei campi
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`https://localhost:44365/api/Users/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify(user)
            });

            if (!response.ok) {
                throw new Error('Errore durante l\'aggiornamento dei dati dell\'utente');
            }

            setSuccessMessage('Dati dell\'utente aggiornati con successo');
        } catch (error) {
            console.error('Errore durante l\'aggiornamento dei dati dell\'utente:', error);
            setErrorMessage('Si è verificato un errore durante l\'aggiornamento dei dati dell\'utente');
        }
    };
    

    return (
        <Container>
            <h2>User Panel</h2>
            {successMessage && <Alert variant="success">{successMessage}</Alert>}
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
            <Form onSubmit={handleSubmit}>

                <Form.Group controlId="email">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control type="email" name="email" value={user.email} onChange={handleChange} />
                </Form.Group>

                <Form.Group controlId="password">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control type="password" name="password" placeholder='set your new password' value={user.password} onChange={handleChange} />
                </Form.Group>

                <Form.Group controlId="birthDate">
                    <Form.Label>Birth Date:</Form.Label>
                    <Form.Control type="date" name="birthDate" value={user.birthDate} onChange={handleChange} />
                </Form.Group>

                <Form.Group controlId="gender">
                    <Form.Label>Gender:</Form.Label>
                    <div>
                        <Form.Check
                            inline
                            type="radio"
                            label="Male"
                            name="gender"
                            value="male"
                            checked={user.gender === "male"}
                            onChange={handleChange}
                        />
                        <Form.Check
                            inline
                            type="radio"
                            label="Female"
                            name="gender"
                            value="female"
                            checked={user.gender === "female"}
                            onChange={handleChange}
                        />
                        <Form.Check
                            inline
                            type="radio"
                            label="Prefer not to say"
                            name="gender"
                            value="not_specified"
                            checked={user.gender === "not_specified"}
                            onChange={handleChange}
                        />
                    </div>
                </Form.Group>
                
                <Button variant="primary" type="submit">Save</Button>
            </Form>
        </Container>
    );
};

export default UserPanel;
