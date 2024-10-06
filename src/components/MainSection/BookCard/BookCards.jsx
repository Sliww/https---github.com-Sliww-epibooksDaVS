import { useContext, useState } from "react";
import { BookContext } from "../../../context/bookContext";
import "./bookcard.css"
import { Col } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export const BookCards = ({ title, img, price, category, asin }) => {

    const { isSelected, onChangeSelected, handleSelectBook, selectedBook } = useContext(BookContext);
    const [show, setShow] = useState(false);

    const onChangeShowReview = () => {
        setShow(!show)
    }

    return (
        <Col sm={2}>
            <Card 
            onClick={()=>onChangeSelected(asin)}
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
                        <Button className="buttonDetails">Details</Button>
                    </div>

                </Card.Body>
            </Card>
        </Col>
    )
}