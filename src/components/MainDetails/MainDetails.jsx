import "./maindetails.css";
import { Container, Row, Col } from "react-bootstrap";
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { ReviewAndComment } from "./ReviewAndComment/ReviewAndComment";

export const MainDetailsPage = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [reviews, setReviews] = useState([]);

    const getBookFromApi = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${import.meta.env.VITE_SERVER_BASE_URL_EPI}/books/byid/${id}`);

            if (!response.ok) {
                throw new Error('Book not found');
            }

            const { book } = await response.json();
            setBook(book);
            setReviews(book.comments || []);
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: 'Failed to load book details',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getBookFromApi();
    }, [id]); 

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!book) {
        return null;
    }

    const handleReviewUpdate = (newReview) => {
        setReviews(prevReviews => [...prevReviews, newReview]);
    };

    return (
        <Container>
            <Row>
                <Col sm={6}>
                    <img 
                        className="w-100 p-5" 
                        src={book.img} 
                        alt={book.title} 
                        style={{ maxHeight: '500px', objectFit: 'contain' }} 
                    />
                </Col>
                <Col sm={6} className="p-5 d-flex flex-column justify-content-between bodyCardDetail">
                    <h1>{book.title}</h1>
                    <p className="pElementsDetailas">
                        <strong>Category:</strong> {book.category}
                    </p>
                    <p className="pElementsDetailas">
                        <strong>Price:</strong> {book.price.$numberDecimal} $
                    </p>
                </Col>
            </Row>
            <ReviewAndComment 
                reviews={reviews} 
                bookId={id} 
                onReviewCreated={handleReviewUpdate} 
            />
        </Container>
    );
};



