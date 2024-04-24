import React, { useState, useEffect } from 'react';
import MainCard from '../components/MainCard';
import { Link } from 'react-router-dom';
import { Container, Pagination, Alert } from 'react-bootstrap';

const Favs = () => {
  const userId = localStorage.getItem('userId');
  const accessToken = localStorage.getItem('accessToken');
  const [favoriteCards, setFavoriteCards] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage] = useState(3);
  const [errorMessage, setErrorMessage] = useState('');

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
            throw new Error('Error fetching favorites');
          }
          const data = await response.json();

          const fetchedCards = [];

          for (const cardId of data) {
            const cardResponse = await fetch(`https://api.scryfall.com/cards/${cardId}`);
            if (!cardResponse.ok) {
              throw new Error('Error fetching card details');
            }
            const cardData = await cardResponse.json();
            fetchedCards.push(cardData);
          }

          setFavoriteCards(fetchedCards);
        }
      } catch (error) {
        console.error('An error occurred while fetching favorites:', error);
        setErrorMessage('An error occurred while fetching favorites');
      }
    };

    fetchFavorites();
  }, [userId, accessToken]);

  // Funzioni e variabili per la paginazione
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = favoriteCards.slice(indexOfFirstCard, indexOfLastCard);

  return (
    <Container>
      <h2>Favorite Cards</h2>
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

      <div className='row'>
        {currentCards.map(card => (
          <div className="col-md-4" key={card.id}>
            <Link to={{ pathname: `/details/${card.id}` }}>
              <MainCard card={card} />
            </Link>
          </div>
        ))}
      </div>

      {/* Pagination */}
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
