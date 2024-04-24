import React, { useState } from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';

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
        handleSearch(searchQuery);
    };

    return (
        <div>
            <Form onSubmit={handleSubmit} className='d-flex'>
                <FormControl
                    type="text"
                    placeholder="Cerca"
                    className="mr-sm-2"
                    value={searchQuery}
                    onChange={handleChange}
                />
                <Button type="submit" variant="outline-success">Search</Button>
            </Form>
            {searchResults.length > 0 && (
                <div>
                    {searchResults.map((card) => (
                        <div key={card.id} onClick={() => handleItemClick(card.name)}>
                            {card.name}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchBar;
