import React from 'react';
import { Table, ButtonGroup, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function TopPricedCardTable({ top10PricedCards, handleResetFilter, handleFilter }) {
    return (
        <>
            <Row className='d-flex justify-content-center'>
                <Col>
                    <ButtonGroup className='mt-3'>
                        <Button onClick={handleResetFilter}>All formats</Button>
                        <Button onClick={() => handleFilter('vintage')}>Vintage</Button>
                        <Button onClick={() => handleFilter('oldschool')}>OldSchool</Button>
                        <Button onClick={() => handleFilter('legacy')}>Legacy</Button>
                        <Button onClick={() => handleFilter('premodern')}>Pre Modern</Button>
                        <Button onClick={() => handleFilter('modern')}>Modern</Button>
                        {/* filtri con pochi risultati
                        <Button onClick={() => handleFilter('pioneer')}>Pioneer</Button>
                        <Button onClick={() => handleFilter('standard')}>Standard</Button>
                        */}
                    </ButtonGroup>
                </Col>
            </Row>
            <Row className='d-flex justify-content-center'>
                <Col md={6}>
                    <Table className='mt-3 mb-0' bordered hover>
                        <thead>
                            <tr>
                                <th scope="col">Card name</th>
                                <th scope="col">Price (USD)</th>
                                <th scope="col">Price (EUR)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {top10PricedCards.map(card => (
                                <tr key={card.id}>
                                    <td>
                                        <Link className="p-0 d-flex justify-content-center align-items-center" to={`/details/${card.id}`}>
                                            {card.name}
                                        </Link>
                                    </td>
                                    <td>{card.prices.usd}$</td>
                                    <td>{card.prices.eur}€</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>

        </>
    );
}

export default TopPricedCardTable;
