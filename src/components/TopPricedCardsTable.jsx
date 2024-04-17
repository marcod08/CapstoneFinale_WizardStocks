import React from "react";
import { Table } from 'react-bootstrap';
import { Link } from "react-router-dom";

const TopPricedCardsTable = ({ title, topPricedCards }) => {
    return (
        <div>
            <h2>{title}</h2>
            <Table bordered hover>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Prezzo</th>
                    </tr>
                </thead>
                <tbody>
                    {topPricedCards.map(card => (
                        <tr key={card.id}>
                            <td>
                                <Link className="p-0 d-flex justify-content-center align-items-center" to={`/details/${card.id}`}>
                                    {card.name}
                                </Link>
                            </td>
                            <td>{title.includes("USD") ? `${card.prices.usd} $` : `${card.prices.eur} €`}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default TopPricedCardsTable;