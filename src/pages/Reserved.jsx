import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Alert, Pagination } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import MainCard from "../components/MainCard";

function Reserved() {
    const [reservedCards, setReservedCards] = useState([]);
    const [filterValue, setFilterValue] = useState('');
    const [filteredCards, setFilteredCards] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [cardsPerPage] = useState(8);

    // Fetch delle carte della reserved list
    useEffect(() => {
        const fetchReservedListCards = async () => {
            try {
                const response = await fetch('https://api.scryfall.com/cards/search?q=is%3Areserved');
                const data = await response.json();
                if (!response.ok) {
                    throw new Error('Failed to fetch reserved list cards');
                }
                const cards = data.data.filter(card => card.prices.usd);
                const sortedCards = cards.sort((a, b) => parseFloat(b.prices.usd) - parseFloat(a.prices.usd));
                setReservedCards(sortedCards);
                setErrorMessage('');
            } catch (error) {
                setErrorMessage(error.message);
            }
        };

        fetchReservedListCards();
    }, []);

    useEffect(() => {
        const filtered = reservedCards.filter(card => {
            if (filterValue === '') {
                return true;
            } else {
                return parseFloat(card.prices?.usd || 0) >= parseFloat(filterValue);
            }
        });
        setFilteredCards(filtered);
    }, [reservedCards, filterValue]);

    const handleInputChange = (event) => {
        setFilterValue(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
    };

    // Funzioni e variabili per la paginazione
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const currentCards = filteredCards.slice(indexOfFirstCard, indexOfLastCard);

    return (
        <Container className="d-flex justify-content-center">
            <div className="col-md-9 blurred-box">
                {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
                <h2 className='fw-bold mb-0'>Reserved List</h2>
                <Form className="mt-2" onSubmit={handleSubmit}>
                    <Form.Group as={Row} className='d-flex justify-content-center'>
                        <Form.Label column md={2}>
                            Filter by price 
                        </Form.Label>
                        <Col md={2}>
                            <Form.Control
                                type="number"
                                value={filterValue}
                                onChange={handleInputChange}
                            />
                        </Col>
                    </Form.Group>
                </Form>

                <Row>
                    {currentCards.map((card) => (
                        <Col md={3} key={card.id}>
                            <Link to={{ pathname: `/details/${card.id}` }}>
                                <MainCard card={card} />
                            </Link>
                        </Col>
                    ))}
                </Row>

                {/* Pagination */}
                {filteredCards.length > cardsPerPage && (
                    <div className="d-flex justify-content-center mt-3">
                        <Pagination className="mb-0">
                            {currentPage > 1 && (
                                <>
                                    <Pagination.First className="pagination-custom" onClick={() => paginate(1)} disabled={currentPage === 1} />
                                    <Pagination.Prev className="pagination-custom" onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} />
                                </>
                            )}
                            {currentPage > 1 && (
                                <Pagination.Item className="pagination-custom" onClick={() => paginate(currentPage - 1)}>
                                    {currentPage - 1}
                                </Pagination.Item>
                            )}
                            <Pagination.Item className="pagination-custom" active>{currentPage}</Pagination.Item>
                            {currentPage < Math.ceil(filteredCards.length / cardsPerPage) && (
                                <Pagination.Item onClick={() => paginate(currentPage + 1)}>
                                    {currentPage + 1}
                                </Pagination.Item>
                            )}
                            {currentPage < Math.ceil(filteredCards.length / cardsPerPage) && (
                                <>
                                    <Pagination.Next
                                    className="pagination-custom"
                                        onClick={() => paginate(currentPage + 1)}
                                        disabled={currentPage === Math.ceil(filteredCards.length / cardsPerPage)}
                                    />
                                    <Pagination.Last className="pagination-custom" onClick={() => paginate(Math.ceil(filteredCards.length / cardsPerPage))} />
                                </>
                            )}
                        </Pagination>
                    </div>
                )}
            </div>
        </Container>
    );
}

export default Reserved;
