import React, { useState, useEffect } from 'react';
import { Container, Alert } from 'react-bootstrap';
import TopPricedCardTable from '../components/TopPricedCardsTable';

function Stocks() {
    const [top10PricedCards, setTop10PricedCards] = useState([]);
    const [filterFormat, setFilterFormat] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        const fetchTopPricedCards = async () => {
            try {
                // Fetch delle carte da scryfall che costano piu di 20 dollari
                const response = await fetch(`https://api.scryfall.com/cards/search?q=usd%3E%3D20&order=usd`);
                const data = await response.json();
                let cards = data.data.filter(card => card.prices.usd);
                let filteredCards = [];

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
                const top10Cards = sortedCards.slice(0, 10);
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
        <Container>
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
            <h2>Top expensive cards today</h2>
            <TopPricedCardTable
                top10PricedCards={top10PricedCards}
                handleResetFilter={handleResetFilter}
                handleFilter={handleFilter}
            />
        </Container>
    );
}

export default Stocks;
