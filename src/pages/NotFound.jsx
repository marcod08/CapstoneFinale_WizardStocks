import React from "react";
import Container from 'react-bootstrap/Container';
import NotFoundImage from '../assets/images/notFound404.jpeg';

const NotFound = () => {
    return (
        <Container>
            <h2 className="mt-3">Page not found</h2>
            <img src={NotFoundImage} alt="File not found" className="rounded-circle w-50 mt-3" />
        </Container>
    )
}

export default NotFound