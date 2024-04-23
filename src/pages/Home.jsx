import React, { useState } from "react";
import { Container, Pagination } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import SearchBar from "../components/SearchBar";
import MainCard from "../components/MainCard";


const Home = () => {
    const [searchResults, setSearchResults] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [cardsPerPage] = useState(3);

    // Qui fetcho la carta ricercata
    const handleSearch = async (query) => {
        try {
            const response = await fetch(`https://api.scryfall.com/cards/search?q=${query}`);
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
