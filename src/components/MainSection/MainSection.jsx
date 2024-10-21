import "./mainsection.css"
import { Container, Row } from "react-bootstrap";
import { BookCards } from "./BookCard/BookCards";
import { useContext } from "react";
import { BookContext } from "../../context/bookcontext";
import { HeroSection } from "../MyHero/myHero";

export const MainSection = () => {

    const { books } = useContext(BookContext)
    console.log('Books:', books);
    return (
        <>
            <HeroSection/>
            <Container>
                <Row className="mt-4">

                    {books.map((book, id) => {
                        return (
                            <BookCards
                                key={`book+${id}`}
                                title={book.title}
                                img={book.img}
                                category={book.category}
                                price={book.price.$numberDecimal}
                                asin={book.asin}
                            />
                        )
                    })}
                </Row>
            </Container>
        </>

    )
}