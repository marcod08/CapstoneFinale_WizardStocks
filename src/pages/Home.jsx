import React, { useState, useEffect } from "react";
import { Container, Row, Col, Pagination } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import SearchBar from "../components/SearchBar";
import MainCard from "../components/MainCard";
import TopPricedCardsTable from "../components/TopPricedCardsTable";

const Home = () => {
    const [searchResults, setSearchResults] = useState([]);
    const [topPricedCardsUSD, setTopPricedCardsUSD] = useState([]);
    const [topPricedCardsEUR, setTopPricedCardsEUR] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [cardsPerPage] = useState(3);

    // Qui fetcho le 10 carte piu costose
    useEffect(() => {
        const fetchTopPricedCards = async () => {
            try {
                const response = await fetch("https://api.scryfall.com/cards/search?q=is%3Areserved");
                if (!response.ok) {
                    throw new Error('Errore nella ricerca delle carte più costose.');
                }
                const data = await response.json();
                const top10USD = data.data.sort((a, b) => b.prices.usd - a.prices.usd).slice(0, 10);
                const top10EUR = data.data.sort((a, b) => b.prices.eur - a.prices.eur).slice(0, 10);
                setTopPricedCardsUSD(top10USD);
                setTopPricedCardsEUR(top10EUR);
            } catch (error) {
                console.error('Errore nella ricerca delle carte più costose:', error);
            }
        };

        fetchTopPricedCards();
    }, []);

    // Qui fetcho la carta ricercata
    const handleSearch = async (query) => {
        try {
            const response = await fetch(`https://api.scryfall.com/cards/search?q=${encodeURIComponent(query)}`);
            if (!response.ok) {
                throw new Error('Errore nella ricerca.');
            }
            const data = await response.json();
            setSearchResults(data.data);
        } catch (error) {
            console.error('Errore nella ricerca:', error);
            setSearchResults([]);
        }
    };

    // funzioni e variabili per la pagination
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const currentCards = searchResults.slice(indexOfFirstCard, indexOfLastCard);

    return (
        <Container>

            {/* Searchbar */}
            <SearchBar handleSearch={handleSearch} />

            {/* Blocco che genera le tabelle */}
            {searchResults.length === 0 && (
                <Container>
                    <Row>
                        <Col><TopPricedCardsTable title="Top expensive cards in NA of the day" topPricedCards={topPricedCardsUSD} /></Col>
                        <Col><TopPricedCardsTable title="Top expensive cards in EU of the day" topPricedCards={topPricedCardsEUR} /></Col>
                    </Row>
                </Container>
            )}

            {/* Blocco che genera le cards cercate */}
            <div className="row">
                {currentCards.map(card => (
                    <div className="col-md-4" key={card.id}>
                        <Link to={{ pathname: `/details/${card.id}` }}>
                            <MainCard card={card} />
                        </Link>
                    </div>
                ))}
            </div>

            {/* Pagination dei risultati */}
            {searchResults.length > 0 && (
                <div className="d-flex justify-content-center">
                    <Pagination>
                        {currentPage > 1 && (
                            <>
                                <Pagination.First onClick={() => paginate(1)} disabled={currentPage === 1} />
                                <Pagination.Prev onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} />
                            </>
                        )}
                        {currentPage > 1 && (
                            <Pagination.Item onClick={() => paginate(currentPage - 1)}>
                                {currentPage - 1}
                            </Pagination.Item>
                        )}
                        <Pagination.Item active>{currentPage}</Pagination.Item>
                        {currentPage < Math.ceil(searchResults.length / cardsPerPage) && (
                            <Pagination.Item onClick={() => paginate(currentPage + 1)}>
                                {currentPage + 1}
                            </Pagination.Item>
                        )}
                        {currentPage < Math.ceil(searchResults.length / cardsPerPage) && (
                            <>
                                <Pagination.Next
                                    onClick={() => paginate(currentPage + 1)}
                                    disabled={currentPage === Math.ceil(searchResults.length / cardsPerPage)}
                                />
                                <Pagination.Last onClick={() => paginate(Math.ceil(searchResults.length / cardsPerPage))} />
                            </>
                        )}
                    </Pagination>
                </div>
            )}
        </Container>
    );
};

export default Home;
