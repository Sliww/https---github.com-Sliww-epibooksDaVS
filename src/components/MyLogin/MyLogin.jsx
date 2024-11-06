import "./mylogin.css"
import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


export const MyLogin = () => {
    const [loginData, setLoginData] = useState({});

    const navigate = useNavigate();

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setLoginData({ ...loginData, [name]: value });
    };

    const postRequest = async (url, data) => {
        try {
            const res = await fetch(`${import.meta.env.VITE_SERVER_BASE_URL_EPI}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(loginData)
            })
            const data = await res.json();
            if (res.ok) {
                localStorage.setItem("auth", JSON.stringify(data.token))
                navigate("/", { replace: true });
            }
            return res
        } catch (error) {
            console.log(error.message);
        }
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        await postRequest();
    };

    return (
        <Container className="vh-100">
            <Row className="h-100">
                <Col className="h-100">
                    <div className="h-100 d-flex flex-column align-items-center justify-content-center">
                        <form
                            onSubmit={onSubmitHandler}
                            className="d-flex flex-column gap-4 personalBorder"
                        >
                            <h2 className="text-white">Login</h2>
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
                            <button type="submit">Login</button>
                            <button type="button">Login with Google</button>
                            <br />
                            <button type="button">Register</button>
                        </form>
                    </div>
                </Col>
            </Row>
        </Container>

    )
} 