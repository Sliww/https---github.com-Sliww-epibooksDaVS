import "./reviewandcomment.css"
import { Row, Col, Button, Modal, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from 'sweetalert2';

export const ReviewAndComment = () => {
    const { asin } = useParams();
    const [reviews, setReviews] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [selectedReview, setSelectedReview] = useState(null);
    const TOKEN = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzAzZjFhZmE5Njc4OTAwMTVlYWM4ZTUiLCJpYXQiOjE3MjgzMTE3MjcsImV4cCI6MTcyOTUyMTMyN30.RFtXCnYhEIeYAWT1GbuDE1HCPPssUpJPoUYZTk2slyU";
    const GET_ENDPOINT = `https://striveschool-api.herokuapp.com/api/books/${asin}/comments/`;

    const getReviews = async () => {
        try {
            const response = await fetch(GET_ENDPOINT, {
                method: "GET",
                headers: {
                    Authorization: TOKEN,
                    "Content-Type": "application/json",
                },
            });

            const result = await response.json();
            setReviews(result);
        } catch (error) {
            console.error("Error fetching reviews", error);
        }
    };

    const deleteReview = async (reviewId) => {
        const DELETE_ENDPOINT = `https://striveschool-api.herokuapp.com/api/comments/${reviewId}`;

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
                const response = await fetch(DELETE_ENDPOINT, {
                    method: "DELETE",
                    headers: {
                        Authorization: TOKEN,
                        "Content-Type": "application/json",
                    },
                });

                if (response.ok) {
                    setReviews(reviews.filter((review) => review._id !== reviewId));
                    Swal.fire('Deleted!', 'Your review has been deleted.', 'success');
                } else {
                    const errorMessage = await response.text();
                    console.error("Failed to delete the review:", errorMessage);
                }
            } catch (error) {
                console.error("Error deleting review:", error);
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

        const UPDATE_ENDPOINT = `https://striveschool-api.herokuapp.com/api/comments/${selectedReview._id}`;

        try {
            const response = await fetch(UPDATE_ENDPOINT, {
                method: "PUT",
                headers: {
                    Authorization: TOKEN,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedReview),
            });

            if (response.ok) {
                setReviews(reviews.map((review) => (review._id === updatedReview._id ? updatedReview : review)));
                Swal.fire('Updated!', 'Your review has been updated.', 'success');
            } else {
                const errorMessage = await response.text();
                console.error("Failed to update the review:", errorMessage);
            }
        } catch (error) {
            console.error("Error updating review:", error);
        } finally {
            handleCloseModal();
        }
    };

    // apre il modale per lasciare una reccensione
    const handleOpenCreateModal = () => {
        setShowCreateModal(true);
    };

    const handleCloseCreateModal = () => {
        setShowCreateModal(false); // poi lo chiude
    };

    const handleCreateReview = async (e) => {
        e.preventDefault();
        const newReview = {
            comment: e.target.comment.value,
            rate: e.target.rate.value,
            elementId: asin,
        };

        const CREATE_ENDPOINT = `https://striveschool-api.herokuapp.com/api/comments/`;

        try {
            const response = await fetch(CREATE_ENDPOINT, {
                method: "POST",
                headers: {
                    Authorization: TOKEN,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newReview),
            });

            if (response.ok) {
                const createdReview = await response.json();
                setReviews([...reviews, createdReview]);
                Swal.fire('Created!', 'Your review has been created.', 'success');
            } else {
                const errorMessage = await response.text();
                console.error("Failed to create the review:", errorMessage);
            }
        } catch (error) {
            console.error("Error creating review:", error);
        } finally {
            handleCloseCreateModal();
        }
    };

    useEffect(() => {
        if (asin) {
            getReviews();
        }
    }, [asin]);

    return (
        <>
            <Row>
                <Col sm={12} className="areaReview mt-5">
                    <h2>Leave Us a Review!</h2>
                    <div className="d-flex justify-content-between align-items-center mt-5">
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
                                <div>
                                    <h5>Author: {review.author}</h5>
                                    <p>Comment: {review.comment}</p>
                                    <p>Rate: {review.rate}/5</p>
                                </div>
                                <div className="d-flex gap-2">
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => {
                                            deleteReview(review._id);
                                        }}
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


            // MODALE PER L'EDIT DELLA RECENSIONE 

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

            //MODALE CREAZIONE RECENSIONE

            <Modal
                show={showCreateModal}
                onHide={handleCloseCreateModal}
                aria-labelledby="add-review-title"
                aria-describedby="add-review-description"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="add-review-title">Add Review</Modal.Title>
                </Modal.Header>
                <Modal.Body id="add-review-description">
                    <Form onSubmit={handleCreateReview}>
                        <Form.Group controlId="formComment">
                            <Form.Label>Comment</Form.Label>
                            <Form.Control
                                type="text"
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
                                name="rate"
                                required
                            />
                        </Form.Group>
                        <Button className="btnModal" variant="primary" type="submit">
                            Create Review
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
};