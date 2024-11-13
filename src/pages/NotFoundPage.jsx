import { Container, Row, Col } from "react-bootstrap";

export const NotFound = () => {
    return (
        <Container>
            <Row>
                <Col>
                    <h1 className="text-white">Oops!! Questa pagina non esiste...</h1>
                </Col>
            </Row>
        </Container>
    )
}