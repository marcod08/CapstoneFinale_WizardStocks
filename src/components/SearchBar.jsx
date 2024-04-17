import React, { useState } from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';

const SearchBar = ({ handleSearch }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleSearch(searchQuery);
    };

    return (
        <Form onSubmit={handleSubmit} className='d-flex'>
            <FormControl
                type="text"
                placeholder="Cerca"
                className="mr-sm-2"
                value={searchQuery}
                onChange={handleChange}
            />
            <Button type="submit" variant="outline-success">Cerca</Button>
        </Form>
    );
};

export default SearchBar;
