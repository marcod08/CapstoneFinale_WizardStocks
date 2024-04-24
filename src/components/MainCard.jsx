import React from 'react';
import Card from 'react-bootstrap/Card';

const MainCard = ({ card }) => {
    return (
        <Card>
            {/* le carte double face non possiedono image_uris ma card_faces (0 è il davanti l'1 è il dietro) */}
            {((card.image_uris && card.image_uris.large) || (card.card_faces && card.card_faces[0])) && (
                <Card.Img
                    variant="top"
                    src={(card.image_uris && card.image_uris.large) || (card.card_faces && card.card_faces[0].image_uris.large)}
                    alt={card.name}
                />
            )}
            <Card.Body>
                <Card.Title>{card.name}</Card.Title>
                <Card.Text>
                    {card.type_line}
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default MainCard;
