import "./maindetails.css"
import { Container, Row, Col } from "react-bootstrap"
import { useParams } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { BookContext } from '../../context/bookContext';
import Swal from 'sweetalert2';

export const MainDetailsPage = () => {

    const { asin } = useParams();
    const { books } = useContext(BookContext);

    const book = books.find(book => book.asin === asin);

    //Aggiunto sweetAlert nel caso il libro che si cerca non venga trovatoo!
    //(Provato ad eliminare 1 numero dall'ASIN per vedere se funziona)

    useEffect(() => {
        if (!book) {
            Swal.fire({
                title: 'Book not found',
                text: 'The book you are looking for does not exist.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    }, [book]);

    if (!book) {
        return null;
    }



    return (
        <Container>
            <Row>
                <Col sm={6}>
                    
                    <img className="w-100 p-5 " src={book.img} alt={book.title} />
                    
                </Col>
                <Col sm={6} className="p-5">
                <h1>{book.title}</h1>
                <p><strong>Price:</strong> {book.price} $</p>
                <p><strong>Category:</strong> {book.category}</p>
                </Col>
            </Row>
        </Container>
    )
}