import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';

const DetailsCard = ({ card, isFavorite, toggleFavorite }) => {

    const isLoggedIn = localStorage.getItem('accessToken') && localStorage.getItem('userId');

    return (
        <>
            <Row>
                <Col md={5} className='rounded-custom'>
                    <img
                        className='img-fluid rounded-custom'
                        src={(card.image_uris && card.image_uris.large) || (card.card_faces && card.card_faces[0].image_uris.large)}
                        alt={card.name}
                    />
                </Col>

                <Col md={7} className='d-flex flex-column justify-content-center'>
                    <div className='d-flex flex-column align-items-center'>
                        <h2>{card.name}</h2>
                        <p>{card.type_line}</p>
                        <p>{card.oracle_text}</p>
                        <table className="table opc">
                            <thead>
                                <tr>
                                    <th>USD</th>
                                    <th>Foil</th>
                                    <th>EUR</th>
                                    <th>Foil</th>
                                    <th>TIX</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{card.prices.usd ? `${card.prices.usd}$` : ''}</td>
                                    <td>{card.prices.usd_foil ? `${card.prices.usd_foil}$` : ''}</td>
                                    <td>{card.prices.eur ? `${card.prices.eur}€` : ''}</td>
                                    <td>{card.prices.eur_foil ? `${card.prices.eur_foil}€` : ''}</td>
                                    <td>{card.prices.tix}</td>
                                </tr>
                            </tbody>
                        </table>

                        {isLoggedIn && !isFavorite && (
                            <Button className='button-hover' variant="primary" onClick={toggleFavorite}>
                                Add to favorites
                            </Button>
                        )}

                        {isLoggedIn && isFavorite && (
                            <Button className='button-hover' variant="danger" onClick={toggleFavorite}>
                                Remove from favorites
                            </Button>
                        )}
                    </div>
                </Col>
            </Row>
        </>
    );
}

export default DetailsCard;
