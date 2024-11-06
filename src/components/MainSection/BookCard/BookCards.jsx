import { Col } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";
import "./bookcard.css";

export const BookCards = ({ title, img, price, category, id }) => { // Cambiato da asin a id
    return (
        <Col sm={2} md={4} lg={2} className="d-flex justify-content-center">
            <Card className="cardBodyGeneral">
                <Card.Img variant="top" src={img} className="card-img-top" />
                <Card.Body className="card-body">
                    <Card.Title
                        data-bs-toggle="tooltip"
                        title={title}
                        className="bookTitle"
                    >
                        {title}
                    </Card.Title>
                    <Card.Text className="categoryBook">
                        <strong>Category:</strong> {category}
                    </Card.Text>
                    <div className="d-flex align-items-center gap-3 justify-content-between">
                        <Card.Text className="m-0">
                            <strong>{price} $</strong>
                        </Card.Text>
                        <Link to={`/books/byid/${id}`}>
                            <Button className="buttonDetails">Details</Button>
                        </Link>
                    </div>
                </Card.Body>
            </Card>
        </Col>
    );
};

