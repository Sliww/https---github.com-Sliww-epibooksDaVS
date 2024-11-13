import "./registernewuser.css";
import { useState } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export const RegisterNewUser = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        email: '',
        password: '',
        username: '',
        dob: '',
        gender: 'not specified',
        address: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_BASE_URL_EPI}/users/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Registration failed');
            }

            navigate('/login');
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="register-container mt-5">
            <h2 className="text-center mb-4 text-white">Create Your Account</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            
            <Form onSubmit={handleSubmit} className="register-form">
                <div className="row">
                    <div className="col-md-6">
                        <Form.Group className="mb-3">
                            <Form.Label>Name *</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                                minLength={2}
                                placeholder="Enter your name"
                            />
                        </Form.Group>
                    </div>
                    
                    <div className="col-md-6">
                        <Form.Group className="mb-3">
                            <Form.Label>Surname *</Form.Label>
                            <Form.Control
                                type="text"
                                name="surname"
                                value={formData.surname}
                                onChange={handleInputChange}
                                required
                                minLength={2}
                                placeholder="Enter your surname"
                            />
                        </Form.Group>
                    </div>
                </div>

                <Form.Group className="mb-3">
                    <Form.Label>Email *</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter your email"
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Username *</Form.Label>
                    <Form.Control
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        required
                        minLength={8}
                        placeholder="Choose a username (min 8 characters)"
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Password *</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                        minLength={8}
                        placeholder="Choose a password (min 8 characters)"
                    />
                </Form.Group>

                <div className="row">
                    <div className="col-md-6">
                        <Form.Group className="mb-3">
                            <Form.Label>Date of Birth *</Form.Label>
                            <Form.Control
                                type="date"
                                name="dob"
                                value={formData.dob}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                    </div>
                    
                    <div className="col-md-6">
                        <Form.Group className="mb-3">
                            <Form.Label>Gender</Form.Label>
                            <Form.Select
                                name="gender"
                                value={formData.gender}
                                onChange={handleInputChange}
                            >
                                <option value="not specified">Not Specified</option>
                                <option value="M">Male</option>
                                <option value="F">Female</option>
                            </Form.Select>
                        </Form.Group>
                    </div>
                </div>

                <Form.Group className="mb-3">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Enter your address (optional)"
                    />
                </Form.Group>

                <Button 
                    variant="primary" 
                    type="submit" 
                    disabled={loading}
                    className="w-100 mt-3"
                >
                    {loading ? 'Creating Account...' : 'Create Account'}
                </Button>
            </Form>
        </Container>
    );
};


