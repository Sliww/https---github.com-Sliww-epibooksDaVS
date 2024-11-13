import "./loginsuccess.css"
import { Container, Row, Col } from "react-bootstrap"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export const LoginSuccess = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/');
        }, 2000);

        
        return () => clearTimeout(timer);
    }, []);

    return (
        <Container fluid className="vh-100">
            <Row className="h-100 align-items-center justify-content-center">
                <Col className="text-center">
                    <h1 className="text-white">Login with Google successfully</h1>
                    <p className="text-white mt-3">Redirecting to home...</p>
                </Col>
            </Row>
        </Container>
    )
}