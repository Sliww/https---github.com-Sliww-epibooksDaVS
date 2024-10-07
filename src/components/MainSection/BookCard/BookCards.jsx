import { useContext } from "react";
import { BookContext } from "../../../context/bookContext";
import "./bookcard.css"
import { Col } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom"

export const BookCards = ({ title, img, price, category, asin }) => {

    const { isSelected, onChangeSelected } = useContext(BookContext);


    return (
        <Col sm={2}>
            <Card
                className="cardBodyGeneral"
                onClick={() => onChangeSelected(asin)}
                style={{ outline: isSelected.includes(asin) ? "2px solid red" : "none" }}
            >
                <Card.Img variant="top" src={img} className="card-img-top" />
                <Card.Body className="card-body">
                    <Card.Title
                        data-bs-toggle="tooltip"
                        title={title}
                        className="bookTitle"
                    >{title}</Card.Title>
                    <Card.Text className="categoryBook">
                        <strong>Category:</strong> {category}
                    </Card.Text>
                    <div className="d-flex align-items-center gap-3 justify-content-between">
                        <Card.Text className="m-0">
                            <strong>{price} $</strong>
                        </Card.Text>
                        <Link to={`/details/${asin}`}>
                            <Button className="buttonDetails">Details</Button>
                        </Link>

                    </div>

                </Card.Body>
            </Card>
        </Col>
    )
}