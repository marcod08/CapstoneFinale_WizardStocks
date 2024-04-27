import React, { useState, useEffect } from 'react';
import { Container, Alert } from 'react-bootstrap';
import TopPricedCardTable from '../components/TopPricedCardsTable';

function Expensive() {
    const [top10PricedCards, setTop10PricedCards] = useState([]);
    const [filterFormat, setFilterFormat] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        const fetchTopPricedCards = async () => {
            try {
                // Fetch delle carte da scryfall che costano piu di 20 dollari
                const response = await fetch(`https://api.scryfall.com/cards/search?q=usd%3E%3D20&order=usd`);
                const data = await response.json();
                const cards = data.data.filter(card => card.prices.usd);
                const filteredCards = [];

                if (filterFormat) {
                    for (let i = 0; i < cards.length; i++) {
                        const card = cards[i];
                        if (card.legalities && card.legalities[filterFormat] && card.legalities[filterFormat] === 'legal') {
                            filteredCards.push(card);
                        }
                    }
                    cards = filteredCards;
                }

                const sortedCards = cards.sort((a, b) => parseFloat(b.prices.usd) - parseFloat(a.prices.usd));
                const top10Cards = sortedCards.slice(0, 12);
                setTop10PricedCards(top10Cards);
            } catch (error) {
                console.error('Error fetching cards:', error);
                setErrorMessage('An error occurred while fetching cards');
            }
        };

        fetchTopPricedCards();
    }, [filterFormat]);

    const handleFilter = (format) => {
        setFilterFormat(format);
    };

    const handleResetFilter = () => {
        setFilterFormat(null);
    };

    return (
        <Container className="d-flex justify-content-center">
            <div className="col-md-9 blurred-box">
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
            <h2 className='mb-0'>Top expensive cards of the day</h2>
            <TopPricedCardTable
                top10PricedCards={top10PricedCards}
                handleResetFilter={handleResetFilter}
                handleFilter={handleFilter}
            />
            </div>
        </Container>
    );
}

export default Expensive;
