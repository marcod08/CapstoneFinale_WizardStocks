import React, { useState } from "react";
import { Container, Pagination, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import SearchBar from "../components/SearchBar";
import MainCard from "../components/MainCard";


const Home = () => {
    const [searchResults, setSearchResults] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [cardsPerPage] = useState(3);
    const [errorMessage, setErrorMessage] = useState('');

    // Fetch del searchbar
    const handleSearch = async (query) => {
        try {
            const response = await fetch(`https://api.scryfall.com/cards/search?q=${query}`);
            if (!response.ok) {
                throw new Error('Error in search.');
            }
            const data = await response.json();
            setSearchResults(data.data);
            setErrorMessage('');
        } catch (error) {
            console.error('Error in search:', error);
            setSearchResults([]);
            if (error.message === 'Error in search.') {
                setErrorMessage('No results found.');
            } else {
                setErrorMessage('An error occurred during the search.');
            }
        }
    };

    // Funzioni e variabili per la paginazione
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const currentCards = searchResults.slice(indexOfFirstCard, indexOfLastCard);

    return (
        <Container>
            <SearchBar handleSearch={handleSearch} />
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

            <div className="row">
                {currentCards.map(card => (
                    <div className="col-md-4" key={card.id}>
                        <Link to={{ pathname: `/details/${card.id}` }}>
                            <MainCard card={card} />
                        </Link>
                    </div>
                ))}
            </div>

            {/* Pagination */}
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
