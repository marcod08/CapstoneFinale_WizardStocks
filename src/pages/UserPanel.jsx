import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Col } from 'react-bootstrap';

const UserPanel = ({ userId }) => {
    const [user, setUser] = useState({
        email: '',
        password: '',
        birthDate: '',
        gender: ''
    });

    // Qua fetcho i valori dell'utente sulle mie api
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`http://localhost:44344/api/Users/${userId}`);
                const userData = await response.json();
                setUser(userData);
            } catch (error) {
                console.error('Errore durante il recupero dei dati dell\'utente:', error);
            }
        };

        fetchUser();
    }, [userId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    // Qui fetcho per la modifica dei campi
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await fetch(`http://localhost:44344/api/Users/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });
            console.log('Dati dell\'utente aggiornati con successo');
        } catch (error) {
            console.error('Errore durante l\'aggiornamento dei dati dell\'utente:', error);
        }
    };

    return (
        <Container>
            <h2>User Panel</h2>
            <Form onSubmit={handleSubmit}>

                <Form.Group controlId="email">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control type="email" name="email" value={user.email} onChange={handleChange} />
                </Form.Group>

                <Form.Group controlId="password">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control type="password" name="password" value={user.password} onChange={handleChange} />
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
