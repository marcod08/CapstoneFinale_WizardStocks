import React from 'react';
import { Table, ButtonGroup, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function TopPricedCardTable({ top10PricedCards, handleResetFilter, handleFilter }) {
    return (
        <div>
            <ButtonGroup>
                <Button onClick={handleResetFilter}>All formats</Button>
                <Button onClick={() => handleFilter('vintage')}>Vintage</Button>
                <Button onClick={() => handleFilter('oldschool')}>OldSchool</Button> 
                <Button onClick={() => handleFilter('legacy')}>Legacy</Button>
                <Button onClick={() => handleFilter('premodern')}>Pre Modern</Button>
                <Button onClick={() => handleFilter('modern')}>Modern</Button>
                <Button onClick={() => handleFilter('pioneer')}>Pioneer</Button>
                <Button onClick={() => handleFilter('standard')}>Standard</Button>
            </ButtonGroup>
            <Table bordered hover>
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
        </div>
    );
}

export default TopPricedCardTable;
