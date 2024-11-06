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

    const endPoint = `http://localhost:4010/books/byid/${id}`;

    const getBookFromApi = async () => {
        try {
            setLoading(true);
            const response = await fetch(endPoint);

            if (!response.ok) {
                throw new Error('Book not found');
            }

            const data = await response.json();
            setBook(data.book);
            setReviews(data.book.reviews || []);
            console.log(data.book)
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
                    <img className="w-100 p-5" src={book.img} alt={book.title} style={{ maxHeight: '500px', objectFit: 'contain' }} />
                </Col>
                <Col sm={6} className="p-5 d-flex flex-column justify-content-between bodyCardDetail">
                    <h1>{book.title}</h1>
                    <p className="pElementsDetailas"><strong>Category:</strong> {book.category}</p>
                    <p className="pElementsDetailas"><strong>Price:</strong> {book.price.$numberDecimal} $</p>
                </Col>
            </Row>
            <ReviewAndComment reviews={book.comments || []} bookId={id} onReviewCreated={handleReviewUpdate} />
        </Container>
    );
};



