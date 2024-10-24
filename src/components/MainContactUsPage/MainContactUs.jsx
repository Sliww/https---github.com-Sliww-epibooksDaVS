import "./maincontactus.css"
import { Container, Row, Col } from "react-bootstrap";

export const MainContactUs = () => {
    return (
        <Container>
            <Row>
                <Col className="textColor">
                    <h1 className="text-center">CONTACTS</h1>

                    <ul className="d-flex flex-column gap-5">
                        <li><strong>Telephone: </strong>+1 (555) 123-4567</li>
                        <li><strong>Email: </strong>info@epibooks.com</li>
                        <li><strong>Fax: </strong>+1 (555) 987-6543</li>
                        <li><strong>Facebook: </strong>facebook.com/epibooks</li>
                        <li><strong>Youtube: </strong>youtube.com/epibooks</li>
                        <li><strong>Linkedin: </strong>linkedin.com/company/epibooks</li>
                        <li><strong>Telegram: </strong>@Epibooks</li>
                        <li><strong>PEC: </strong>epibooks@pec.it</li>
                        <li><strong>Carrier Pigeon: </strong>Edwidge</li>
                    </ul>

                </Col>
            </Row>
        </Container>
    )
}