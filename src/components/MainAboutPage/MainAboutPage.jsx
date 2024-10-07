import "./mainaboutpage.css"
import { Container, Row, Col } from "react-bootstrap";
import AboutImg from "../../assets/aboutt.jpg"

export const MainAboutPage = () => {
    return (
        <Container>
            <Row>
                <Col>
                    <h1>About Us</h1>

                    <h3>Welcome to Epibooks, your go-to destination for exploring endless worlds through the pages of a book. Our passion is to fuel the desire for knowledge, adventure, and inspiration by offering readers a carefully curated selection of works ranging from timeless classics to the most captivating contemporary titles.</h3>
                    <h4>Epibooks was born from the idea that every book is a window into a new experience, a journey that can transform the way you see the world. Whether you're seeking immersive novels, enlightening essays, or short and powerful stories, you'll always find something here that resonates with your spirit.</h4>

                    <Row className="mt-5">

                        <Col sm={6} className="d-flex">
                            <h5>Our commitment goes beyond offering a wide variety of books. At Epibooks, we aim to create a community of curious and passionate readers. You’ll find not only virtual shelves filled with titles but also curated reviews, personalized reading recommendations, and a space to share your love for books.
                                We are here to guide you through every step of your literary adventure, with the hope of helping you discover stories that leave a lasting impact and enrich your life. We believe in the power of books to inspire and connect people, and we can't wait to share this experience with you.
                                Thank you for choosing Epibooks. May your next great story begin here.
                                Happy reading!</h5>
                        </Col>
                        <Col sm={6} className="ps-5 pe-5 pb-5">
                            <img className="imgAbout" src={AboutImg} alt="" />
                        </Col>
                    </Row>


                </Col>
            </Row>
        </Container>
    )
}