import React, { useState, useEffect, useCallback } from "react";
import { Container, Col, Alert } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import DetailsCard from "../components/DetailsCard";
import Loader from "../components/Loader";
import { myApiDomain } from '../components/MyApiDomain';


const Details = () => {
    const { cardId } = useParams();
    const [card, setCard] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [loading, setLoading] = useState(true);
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
                setLoading(false);
            } catch (error) {
                setErrorMessage('An error occurred while retrieving the card.');
                setLoading(false);
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
                    const favsResponse = await fetch(`${myApiDomain}/api/favs/${userId}`, {
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
            const response = await fetch(`${myApiDomain}/api/favs`, {
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
        <Container className="d-flex justify-content-center">
            <div className="col-md-9 blurred-box">
                {loading &&
                    <div className="d-flex justify-content-center my-5">
                        <Loader />
                    </div>}
                {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
                {successMessage && <Alert variant="success">{successMessage}</Alert>}
                {card && !loading && (
                    <div className="d-flex justify-content-center">
                        <Col md={12}>
                            <DetailsCard
                                card={card}
                                isFavorite={isFavorite}
                                toggleFavorite={toggleFavorite}
                            />
                        </Col>

                    </div>
                )}
            </div>
        </Container>
    );
};

export default Details;
