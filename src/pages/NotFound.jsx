import React from "react";
import Container from 'react-bootstrap/Container';
import NotFoundImage from '../assets/images/notFound404.jpeg';

const NotFound = () => {
    return (
        <Container>
            <h2>File not found</h2>
            <img src={NotFoundImage} alt="File not found" className="rounded-circle w-50" />
        </Container>
    )
}

export default NotFound