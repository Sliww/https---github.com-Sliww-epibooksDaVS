import "./maindetails.css";
import { Container, Row, Col } from "react-bootstrap";
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { ReviewAndComment } from "./ReviewAndComment/ReviewAndComment";

export const MainDetailsPage = () => {
    const { asin } = useParams();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);

    const endPoint = `https://epibooks.onrender.com/${asin}`;

    const getBookFromApi = async () => {
        try {
            setLoading(true);
            const response = await fetch(endPoint);

            if (!response.ok) {
                throw new Error('Book not found');
            }

            const data = await response.json();
            setBook(data[0]);
        } catch (error) {
            Swal.fire({
                title: 'Book not found',
                text: 'The book you are looking for does not exist.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getBookFromApi();
    }, [asin]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!book) {
        return null;
    }

    return (
        <Container>
            <Row>
                <Col sm={6}>
                    <img className="w-100 p-5" src={book.img} alt={book.title} style={{ maxHeight: '500px', objectFit: 'contain' }} />
                </Col>
                <Col sm={6} className="p-5 d-flex flex-column justify-content-between">
                    <h1>{book.title}</h1>
                    <p className="pElementsDetailas"><strong>Category:</strong> {book.category}</p>
                    <p className="pElementsDetailas"><strong>Price:</strong> {book.price} $</p>
                </Col>
            </Row>
            <ReviewAndComment />
        </Container>
    );
};

