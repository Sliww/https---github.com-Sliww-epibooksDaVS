import "./reviewandcomment.css";
import { Row, Col, Button, Modal, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import Swal from 'sweetalert2';
import useSession from '../../../hooks/useSession';

export const ReviewAndComment = ({ reviews: initialReviews, bookId, onReviewCreated }) => {
    const [reviews, setReviews] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [selectedReview, setSelectedReview] = useState(null);
    const session = useSession();

    const deleteReview = async (reviewId) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "Do you really want to delete this review?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
        });

        if (result.isConfirmed) {
            try {
                const response = await fetch(`${import.meta.env.VITE_SERVER_BASE_URL_EPI}/comments/delete/${reviewId}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (response.ok) {
                    setReviews(reviews.filter((review) => review._id !== reviewId));
                    Swal.fire('Deleted!', 'Your review has been deleted.', 'success');
                }
            } catch (error) {
                Swal.fire('Error!', 'Failed to delete review', 'error');
            }
        }
    };

    const handleEditClick = (review) => {
        setSelectedReview(review);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedReview(null);
    };

    const handleUpdateReview = async (e) => {
        e.preventDefault();
        const updatedReview = {
            ...selectedReview,
            comment: e.target.comment.value,
            rate: e.target.rate.value,
        };

        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_BASE_URL_EPI}/comments/update/${selectedReview._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedReview),
            });

            if (response.ok) {
                setReviews(reviews.map((review) => (review._id === updatedReview._id ? updatedReview : review)));
                Swal.fire('Updated!', 'Your review has been updated.', 'success');
                handleCloseModal();
            }
        } catch (error) {
            Swal.fire('Error!', 'Failed to update review', 'error');
        }
    };

    const handleOpenCreateModal = () => {
        setShowCreateModal(true);
    };

    const handleCloseCreateModal = () => {
        setShowCreateModal(false);
    };

    const handleCreateReview = async (e) => {
        e.preventDefault();

        if (!session) {
            Swal.fire({
                title: 'Error!',
                text: 'You must be logged in to leave a review',
                icon: 'error',
                confirmButtonColor: '#ff7f11',
                background: '#1a1a1a',
                color: '#fff'
            });
            return;
        }

        const newReview = {
            comment: e.target.comment.value,
            rate: parseInt(e.target.rate.value),
            user: session.userId,
            book: bookId
        };

        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_BASE_URL_EPI}/comment/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newReview),
            });

            if (response.ok) {
                const data = await response.json();
                setReviews(prevReviews => [...prevReviews, data.comment]);
                if (onReviewCreated) {
                    onReviewCreated(data.comment);
                }
                handleCloseCreateModal();
                Swal.fire({
                    title: 'Success!',
                    text: 'Review created successfully',
                    icon: 'success',
                    confirmButtonColor: '#ff7f11',
                    background: '#1a1a1a',
                    color: '#fff'
                });
            }
        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: 'Failed to create review',
                icon: 'error',
                confirmButtonColor: '#ff7f11',
                background: '#1a1a1a',
                color: '#fff'
            });
        }
    };

    useEffect(() => {
        if (initialReviews?.comments) {
            setReviews(initialReviews.comments);
        } else if (Array.isArray(initialReviews)) {
            setReviews(initialReviews);
        }
    }, [initialReviews]);

    return (
        <>
            <Row>
                <Col sm={12} className="areaReview mt-5">
                    <h2>Leave Us a Review!</h2>
                    <div className="d-flex bodyReviews justify-content-between align-items-center mt-5">
                        <p>Your opinion is very important to us! Leave a review on one of the books you've read to provide feedback for other interested users.</p>
                        <Button variant="primary" onClick={handleOpenCreateModal}>Add Review</Button>
                    </div>
                </Col>
                <Col sm={12} className="areaReview mt-5">
                    <h2>Reviews</h2>
                </Col>
                <Col>
                    <ul>
                        {reviews && reviews.map((review) => (
                            <li key={review._id} className="d-flex justify-content-between align-items-center reviewArea">
                                <div className="bodyReviews">
                                    <h5>Author: {
                                        review.user && typeof review.user === 'object'
                                            ? (review.user.username || `${review.user.name} ${review.user.surname}` || review.user.email || "Unknown")
                                            : "User"
                                    }</h5>
                                    <p>Comment: {review.comment}</p>
                                    <p>Rate: {review.rate}/5</p>
                                </div>
                                <div className="d-flex gap-2">
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => deleteReview(review._id)}
                                    >
                                        Delete
                                    </button>
                                    <button
                                        className="btn btn-warning"
                                        onClick={() => handleEditClick(review)}
                                    >
                                        Edit
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </Col>
            </Row>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Review</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedReview && (
                        <Form onSubmit={handleUpdateReview}>
                            <Form.Group controlId="formComment">
                                <Form.Label>Comment</Form.Label>
                                <Form.Control
                                    type="text"
                                    defaultValue={selectedReview.comment}
                                    name="comment"
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="formRate">
                                <Form.Label>Rate (1-5)</Form.Label>
                                <Form.Control
                                    type="number"
                                    min="1"
                                    max="5"
                                    defaultValue={selectedReview.rate}
                                    name="rate"
                                    required
                                />
                            </Form.Group>
                            <Button className="btnModal" variant="primary" type="submit">
                                Update Review
                            </Button>
                        </Form>
                    )}
                </Modal.Body>
            </Modal>

            <Modal show={showCreateModal} onHide={handleCloseCreateModal} className="text-white">
                <Modal.Header closeButton className="bg-dark">
                    <Modal.Title>Add Review</Modal.Title>
                </Modal.Header>
                <Modal.Body className="bg-dark">
                    <Form onSubmit={handleCreateReview}>
                        <Form.Group controlId="formComment">
                            <Form.Label className="text-white">Comment</Form.Label>
                            <Form.Control
                                type="text"
                                name="comment"
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formRate">
                            <Form.Label className="text-white">Rate (1-5)</Form.Label>
                            <Form.Control
                                type="number"
                                min="1"
                                max="5"
                                name="rate"
                                required
                            />
                        </Form.Group>
                        <Button className="btnModal mt-3" variant="primary" type="submit">
                            Create Review
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
};
