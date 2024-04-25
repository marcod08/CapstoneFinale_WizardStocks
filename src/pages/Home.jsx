import React, { useState } from "react";
import { Container, Row, Col, Pagination, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import SearchBar from "../components/SearchBar";
import MainCard from "../components/MainCard";
import Logo from "../assets/images/logo.jpg";


const Home = () => {
    const [searchResults, setSearchResults] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [cardsPerPage] = useState(8);
    const [errorMessage, setErrorMessage] = useState('');

    // Fetch della searchbar
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
        <Container className="d-flex justify-content-center"> {/* continua a lavorare da qui */}
            <div className="col-8" style={{ backdropFilter: 'blur(10px)' }}>
                {errorMessage && <Alert className='mt-3 mb-0' variant="danger">{errorMessage}</Alert>}

                <h1 className="mt-3"> <strong>WizardStock</strong> </h1>
                <p className="fw-light fs-4">is a search tool for "Magic: The Gathering" cards that helps you invest in them</p>

                <img src={Logo} alt="logo" className="mt-2 rounded-circle " style={{ width: '15%' }} ></img>



                <div className="d-flex justify-content-center mt-3">
                    <Col md={3}>
                        <SearchBar handleSearch={handleSearch} className='col-md-6' />
                    </Col>
                </div>

                <Row>
                    {currentCards.map(card => (
                        <Col md={3} key={card.id}>
                            <Link to={{ pathname: `/details/${card.id}` }}>
                                <MainCard card={card} />
                            </Link>
                        </Col>
                    ))}
                </Row>

                {/* Pagination */}
                {searchResults.length > 0 && (
                    <div className="d-flex justify-content-center mt-3">
                        <Pagination className="mb-0">
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

            </div>

        </Container>
    );
};

export default Home;
