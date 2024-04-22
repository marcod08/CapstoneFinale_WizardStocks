import React, { useState, useEffect } from 'react';
import MainCard from '../components/MainCard';
import { Link } from 'react-router-dom';
import { Container, Pagination } from 'react-bootstrap';

const Favs = () => {
  const userId = localStorage.getItem('userId');
  const accessToken = localStorage.getItem('accessToken');
  const [favoriteCards, setFavoriteCards] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage] = useState(3);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        if (userId && accessToken) {
          const response = await fetch(`https://localhost:44365/api/favs/${userId}`, {
            headers: {
              'Authorization': `Bearer ${accessToken}`
            }
          });
          if (!response.ok) {
            throw new Error('Errore nella richiesta dei preferiti');
          }
          const data = await response.json();

          const fetchedCards = [];

          for (const cardId of data) {
            const cardResponse = await fetch(`https://api.scryfall.com/cards/${cardId}`);
            if (!cardResponse.ok) {
              throw new Error('Errore nella richiesta dei dettagli della carta');
            }
            const cardData = await cardResponse.json();
            fetchedCards.push(cardData);
          }

          setFavoriteCards(fetchedCards);
        }
      } catch (error) {
        console.error('Si è verificato un errore durante il recupero dei preferiti:', error);
      }
    };

    fetchFavorites();
  }, [userId, accessToken]);

  // funzioni e variabili per la pagination
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = favoriteCards.slice(indexOfFirstCard, indexOfLastCard);

  return (
    <Container>
      <h2>Favorite Cards</h2>

      {/* Blocco che genera le cards favorite */}
      <div className='row'>
        {currentCards.map(card => (
          <div className="col-md-4" key={card.id}>
            <Link to={{ pathname: `/details/${card.id}` }}>
              <MainCard card={card} />
            </Link>
          </div>
        ))}
      </div>

      {/* Pagination dei risultati */}
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
          {currentPage < Math.ceil(favoriteCards.length / cardsPerPage) && (
            <Pagination.Item onClick={() => paginate(currentPage + 1)}>
              {currentPage + 1}
            </Pagination.Item>
          )}
          {currentPage < Math.ceil(favoriteCards.length / cardsPerPage) && (
            <>
              <Pagination.Next
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === Math.ceil(favoriteCards.length / cardsPerPage)}
              />
              <Pagination.Last onClick={() => paginate(Math.ceil(favoriteCards.length / cardsPerPage))} />
            </>
          )}
        </Pagination>
      </div>
    </Container>
  );
};

export default Favs;
