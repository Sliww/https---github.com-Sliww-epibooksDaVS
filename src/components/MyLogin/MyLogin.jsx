import "./mylogin.css"
import { useState } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import googleLogo from "../../assets/google.svg";
import Swal from 'sweetalert2';

export const MyLogin = () => {
    const [loginData, setLoginData] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setLoginData({ ...loginData, [name]: value });
    };

    const postRequest = async () => {
        setIsLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));

            const res = await fetch(`${import.meta.env.VITE_SERVER_BASE_URL_EPI}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(loginData)
            });

            const responseData = await res.json();

            if (res.ok) {
                localStorage.setItem("token", JSON.stringify(responseData.token));
                navigate("/");
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Errore di accesso',
                    text: 'Email o password non corrette',
                    confirmButtonColor: '#ff7f11',
                    background: '#1a1a1a',
                    color: '#fff'
                });
                console.log("Errore login:", responseData);
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Errore',
                text: 'Si è verificato un errore durante il login. Riprova più tardi.',
                confirmButtonColor: '#ff7f11',
                background: '#1a1a1a',
                color: '#fff'
            });
            console.log("Errore nella richiesta:", error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        await postRequest();
    };

    const handleGoogleLogin = () => {
        window.location.href = `${import.meta.env.VITE_SERVER_BASE_URL_EPI}/auth/google`;
    };

    return (
        <Container className="vh-100">
            <Row className="h-100">
                <Col className="h-100">
                    <div className="h-100 d-flex flex-column align-items-center justify-content-center">
                        <form
                            onSubmit={onSubmitHandler}
                            className="d-flex flex-column gap-3 personalBorder p-4"
                        >
                            <h2 className="text-white text-center">LOGIN</h2>
                            <input
                                className="form-control"
                                onChange={onChangeHandler}
                                name="email"
                                type="email"
                                placeholder="Email" />
                            <input
                                className="form-control"
                                onChange={onChangeHandler}
                                name="password"
                                type="password"
                                placeholder="Password" />
                            <button
                                className="btn btn-primary"
                                type="submit"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <Spinner
                                            as="span"
                                            animation="border"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                        />
                                        <span>Loading...</span>
                                    </>
                                ) : (
                                    'Login'
                                )}
                            </button>
                            <button
                                className="btn btn-primary d-flex justify-content-center align-items-center gap-3"
                                onClick={handleGoogleLogin}
                                type="button"
                            >
                                <img src={googleLogo} alt="Google Logo" />
                                Login with Google
                            </button>
                            <br />
                            <Link to="/register">
                                <button
                                    className="btn btn-primary w-100"
                                    type="button">
                                    Register
                                </button>
                            </Link>
                        </form>
                    </div>
                </Col>
            </Row>
        </Container>

    )
} 