import React from "react";
import Container from 'react-bootstrap/Container';
import NotFoundImage from '../assets/images/notFound404.jpeg';

const NotFound = () => {
    return (
        <Container className="d-flex justify-content-center">
            <div className="col-md-4 blurred-box">
            <h2 className="mb-0">Page not found</h2>
            <img src={NotFoundImage} alt="File not found" className="rounded-circle w-75 mt-3" />
            </div>
        </Container>
    )
}

export default NotFound