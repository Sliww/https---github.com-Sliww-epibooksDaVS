import "./mainsection.css"
import { Container, Row, Col } from "react-bootstrap";
import { BookCards } from "./BookCard/BookCards";
import { useContext } from "react";
import { BookContext } from "../../context/bookcontext";
import { HeroSection } from "../MyHero/myHero";
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic.css';

export const MainSection = () => {



    const { books, page, pageSize, setPage, totalPages } = useContext(BookContext)
    return (
        <>
            <HeroSection />
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
                {books.length > 0 && (
                    <Row>
                        <Col className="p-5 customPaginationButtons">
                            <ResponsivePagination
                                current={page}
                                total={totalPages}
                                onPageChange={setPage}
                            />
                        </Col>
                    </Row>
                )}

            </Container>
        </>

    )
}