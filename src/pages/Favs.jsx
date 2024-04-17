import React, { useState, useEffect } from 'react';
import MainCard from '../components/MainCard';
import Pagination from 'react-bootstrap/Pagination';

const Favs = ({ userId }) => {
  const [favoriteCards, setFavoriteCards] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage] = useState(10);

  // Qui fetcho sulle mie api le carte preferite in base all'utente
  useEffect(() => {
    const fetchFavoriteCards = async () => {
      try {
        const response = await fetch(`http://localhost:44344/api/Favs?userId=${userId}`);
        const data = await response.json();
        setFavoriteCards(data);
      } catch (error) {
        console.error('Errore durante il recupero delle carte preferite:', error);
      }
    };

    fetchFavoriteCards();
  }, [userId]);

  // Qui fetcho le carte preferite da scryfall
  useEffect(() => {
    const fetchCardDetails = async () => {
      try {
        const cardDetails = await Promise.all(
          favoriteCards.map(async (fav) => {
            const response = await fetch(`https://api.scryfall.com/cards/${fav.cardId}`);
            return response.json();
          })
        );
        setFavoriteCards(cardDetails);
      } catch (error) {
        console.error('Errore durante il recupero dei dettagli delle carte da Scryfall:', error);
      }
    };

    if (favoriteCards.length > 0) {
      fetchCardDetails();
    }
  }, [favoriteCards]);

  // funzioni e variabili per la pagination
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = favoriteCards.slice(indexOfFirstCard, indexOfLastCard);

  return (
    <div>
      <h2>Favorite Cards</h2>
      {currentCards.map((card) => (
        <div key={card.id}>
          <MainCard card={card} />
        </div>
      ))}

      {/* Pagination dei risultati */}
      {favoriteCards.length > 0 && (
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
      )}
    </div>
  );
};

export default Favs;
