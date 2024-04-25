import React, { useState, useEffect, useCallback } from "react";
import { Container, Row, Col, Alert } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import DetailsCard from "../components/DetailsCard";


const Details = () => {
    const { cardId } = useParams();
    const [card, setCard] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const accessToken = localStorage.getItem('accessToken');

    useEffect(() => {
        // Fetch della carta da Scryfall
        const fetchCard = async () => {
            try {
                const response = await fetch(`https://api.scryfall.com/cards/${cardId}`);
                if (!response.ok) {
                    throw new Error('Error in request');
                }
                const cardData = await response.json();
                setCard(cardData);
            } catch (error) {
                setErrorMessage('An error occurred while retrieving the card.');
            }
        };

        fetchCard();
    }, [cardId]);

    // Fetch per verificare se la carta è nei preferiti dell'utente
    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (userId) {
            const fetchFavorites = async () => {
                try {
                    const favsResponse = await fetch(`https://localhost:44365/api/favs/${userId}`, {
                        headers: {
                            'Authorization': `Bearer ${accessToken}`
                        }
                    });
                    if (!favsResponse.ok) {
                        throw new Error('Error in request for favorites');
                    }
                    const favsData = await favsResponse.json();
                    setIsFavorite(favsData.includes(cardId));
                } catch (error) {
                    setErrorMessage('An error occurred while retrieving favorites.');
                }
            };

            fetchFavorites();
        }
    }, [cardId, accessToken]);

    const toggleFavorite = useCallback(async () => {
        const userId = localStorage.getItem('userId');
        try {
            const response = await fetch(`https://localhost:44365/api/favs`, {
                method: isFavorite ? 'DELETE' : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify({ userId: userId, cardId: cardId })
            });
            if (!response.ok) {
                throw new Error('Error in request');
            }
            setIsFavorite(!isFavorite);
            setSuccessMessage(isFavorite ? 'Card removed from favorites.' : 'Card added to favorites.');
        } catch (error) {
            setErrorMessage('An error occurred while adding or removing from favorites.');
        }
    }, [isFavorite, cardId, accessToken]);

    return (
        <Container className="mt-3">
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
            {successMessage && <Alert variant="success">{successMessage}</Alert>}
            {card && (
                <div className="d-flex justify-content-center">
                    <Col md={7}>
                    <DetailsCard 
                        card={card} 
                        isFavorite={isFavorite} 
                        toggleFavorite={toggleFavorite} 
                    />
                    </Col>
                    
                </div>
            )}
        </Container>
    );
};

export default Details;
