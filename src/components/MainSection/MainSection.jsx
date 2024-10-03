import "./mainsection.css"
import { Container, Row } from "react-bootstrap";
import { BookCards } from "./BookCard/BookCards";
import { useContext } from "react";
import { BookContext } from "../../context/bookContext";

export const MainSection = () => {

    const { books } = useContext(BookContext)

    return (
        <Container>
            <Row className="mt-4">

                {books.map((book, id) => {
                    return (
                    <BookCards
                        key={`book+${id}`}
                        title={book.title}
                        img={book.img}
                        category={book.category}
                        price={book.price}
                        asin={book.asin}
                    />
                    )
                })}
            </Row>
        </Container>
    )
}