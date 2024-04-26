import React, { useState } from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';
import { BsSearch } from 'react-icons/bs';

const SearchBar = ({ handleSearch }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleChange = async (e) => {
        setSearchQuery(e.target.value);

        // Fetch per il menu a tendina
        if (e.target.value.length >= 3) {
            try {
                const response = await fetch(`https://api.scryfall.com/cards/search?q=${e.target.value}`);
                if (!response.ok) {
                    throw new Error('Error in search.');
                }
                const data = await response.json();
                setSearchResults(data.data.slice(0, 5));
            } catch (error) {
                console.error('Error in search:', error);
                setSearchResults([]);
            }
        } else {
            setSearchResults([]);
        }
    };

    const handleItemClick = (cardName) => {
        setSearchQuery(cardName);
        setSearchResults([]);
        handleSearch(cardName);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSearchResults([]);
        handleSearch(searchQuery);
    };

    return (
        <>
            <Form onSubmit={handleSubmit} className='d-flex'>
                <FormControl
                    type="text"
                    placeholder="Search any cards"
                    className="mr-sm-2 text-center"
                    value={searchQuery}
                    onChange={handleChange}
                />
            </Form>
            {searchResults.length > 0 && (
                <div>
                    {searchResults.map((card) => (
                        <p className='mt-1 mb-1 me-5' key={card.id} onClick={() => handleItemClick(card.name)}>
                            {card.name}
                        </p>
                    ))}
                </div>
            )}
        </>
    );
};

export default SearchBar;
