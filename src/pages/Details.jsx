import React, { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container';
import { useParams } from 'react-router-dom';
import DetailsCard from "../components/DetailsCard";

const Details = () => {
    const { cardId } = useParams();
    const [card, setCard] = useState(null);

    useEffect(() => {
        const fetchCard = async () => {
            try {
                const response = await fetch(`https://api.scryfall.com/cards/${cardId}`);
                if (!response.ok) {
                    throw new Error('Errore nella richiesta');
                }
                const cardData = await response.json();
                setCard(cardData);
                console.log(cardData);
            } catch (error) {
                console.error('Si è verificato un errore durante la richiesta:', error);
            }
        };

        fetchCard();
    }, [cardId]);

    return (
        <Container>
            {card && (
                <div className="d-flex justify-content-center">
                    <DetailsCard card={card} />
                </div>
            )}

        </Container>
    );
};

export default Details;
