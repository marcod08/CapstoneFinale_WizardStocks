import React, { useState, useEffect, useCallback } from "react";
import Container from 'react-bootstrap/Container';
import { useParams } from 'react-router-dom';
import DetailsCard from "../components/DetailsCard";
import { Alert } from "react-bootstrap";

const Details = () => {
    const { cardId } = useParams();
    const [card, setCard] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCard = async () => {
            try {
                const response = await fetch(`https://api.scryfall.com/cards/${cardId}`);
                if (!response.ok) {
                    throw new Error('Errore nella richiesta');
                }
                const cardData = await response.json();
                setCard(cardData);
            } catch (error) {
                setError('Si è verificato un errore durante il recupero della carta.');
            } finally {
                setLoading(false);
            }
        };

        fetchCard();
    }, [cardId]);

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (userId) {
            const fetchFavorites = async () => {
                try {
                    const favsResponse = await fetch(`https://localhost:44365/api/favs/${userId}`);
                    if (!favsResponse.ok) {
                        throw new Error('Errore nella richiesta dei preferiti');
                    }
                    const favsData = await favsResponse.json();
                    setIsFavorite(favsData.includes(cardId));
                } catch (error) {
                    setError('Si è verificato un errore durante il recupero dei preferiti.');
                }
            };

            fetchFavorites();
        }
    }, [cardId]);

    const toggleFavorite = useCallback(async () => {
        const userId = localStorage.getItem('userId');
        try {
            const response = await fetch(`https://localhost:44365/api/favs`, {
                method: isFavorite ? 'DELETE' : 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: userId, cardId: cardId })
            });
            if (!response.ok) {
                throw new Error('Errore nella richiesta');
            }
            setIsFavorite(!isFavorite);
        } catch (error) {
            setError('Si è verificato un errore durante l\'aggiunta o la rimozione dai preferiti.');
        }
    }, [isFavorite, cardId]);

    return (
        <Container>
            {loading && <Alert variant="info">Caricamento...</Alert>}
            {error && <Alert variant="danger">{error}</Alert>}
            {card && (
                <div className="d-flex justify-content-center">
                    <DetailsCard 
                        card={card} 
                        isFavorite={isFavorite} 
                        toggleFavorite={toggleFavorite} 
                    />
                </div>
            )}
        </Container>
    );
};

export default Details;
