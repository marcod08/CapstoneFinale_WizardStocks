import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

const DetailsCard = ({ card, isFavorite, toggleFavorite }) => {
    return (
        <Container>
            <Row>
                <Col>
                    {(card.image_uris && card.image_uris.large) || (card.card_faces && card.card_faces[0]) ? (
                        <img
                            className="img-fluid"
                            src={(card.image_uris && card.image_uris.large) || (card.card_faces && card.card_faces[0].image_uris.large)}
                            alt={card.name}
                        />
                    ) : (
                        <div className="no-image-available">
                            <span>Immagine non disponibile</span>
                        </div>
                    )}
                </Col>

                <Col className='d-flex flex-column justify-content-center'>
                    <div className='d-flex flex-column align-items-center'>
                        <h2>{card.name}</h2>
                        <p>{card.type_line}</p>
                        <p>{card.oracle_text}</p>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>USD</th>
                                    <th>USD (Foil)</th>
                                    <th>EUR</th>
                                    <th>EUR (Foil)</th>
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

                        {!isFavorite && (
                            <Button variant="success" onClick={toggleFavorite}>
                                Aggiungi ai preferiti
                            </Button>
                        )}

                        {isFavorite && (
                            <Button variant="danger" onClick={toggleFavorite}>
                                Rimuovi dai preferiti
                            </Button>
                        )}
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default DetailsCard;
