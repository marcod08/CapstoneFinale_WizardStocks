import React from 'react';
import Card from 'react-bootstrap/Card';

const MainCard = ({ card }) => {
    return (
        <Card className='mt-3'>
            {/* le carte double face non possiedono image_uris ma card_faces (0 è il davanti l'1 è il dietro) */}
            {((card.image_uris && card.image_uris.large) || (card.card_faces && card.card_faces[0])) && (
                <Card.Img
                    variant="top"
                    src={(card.image_uris && card.image_uris.large) || (card.card_faces && card.card_faces[0].image_uris.large)}
                    alt={card.name}
                />
            )}
        </Card>
    );
}

export default MainCard;
