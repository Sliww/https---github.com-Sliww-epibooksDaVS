import { useState } from 'react'
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useSession from '../../../../../hooks/useSession';
import './addbook.css'



export const AddBook = () => {
    const [formData, setFormData] = useState({})
    const [file, setFile] = useState(null)
    const navigate = useNavigate();

    const session = useSession();
    console.log(session);

    const onChangeFile = (event) => {
        setFile(event.target.files[0])
    }

    const onChangeInput = (event) => {
        const { name, value } = event.target
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const uploadFile = async (file) => {
        const fileData = new FormData();
        fileData.append("img", file);

        try {
            const res = await fetch(`${import.meta.env.VITE_SERVER_BASE_URL_EPI}/books/upload/cloud`, {
                method: 'POST',
                body: fileData
            });
            if (!res.ok) {
                throw new Error("File upload failed");
            }
            return await res.json();
        } catch (error) {
            console.log(error.message);
            return null;
        }
    }

    const submitForm = async (event) => {
        event.preventDefault();
    
        if (file) {
            try {
                const uploadedFile = await uploadFile(file);
                const postFormData = {
                    ...formData,
                    img: uploadedFile.img,
                };
    
                const res = await fetch(`${import.meta.env.VITE_SERVER_BASE_URL_EPI}/books/create`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(postFormData),
                });
    
                if (res.ok) {
                    const createdBook = await res.json();
                    console.log("Libro creato:", createdBook);
    
                    
                    setFormData({});
                    setFile(null);
    
                    Swal.fire({
                        title: "Success!",
                        text: "The book has been added successfully!",
                        icon: "success",
                        confirmButtonText: "OK",
                        confirmButtonColor: '#ff7f11',
                        background: '#1a1a1a',
                        color: '#fff'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            navigate('/');
                            window.location.reload();
                        }
                    });
                } else {
                    const errorData = await res.json();
                    
                    Swal.fire({
                        title: "Error!",
                        text: errorData.message,
                        icon: "error",
                        confirmButtonText: "OK",
                    });
                }
            } catch (error) {
                console.log("Errore durante la creazione del libro:", error.message);
            }
        }
    };


    return (
        
            <Container>
                <Row className='d-flex justify-content-center'>
                    <Col sm={8}>
                        <h2 className='titleColor text-center p-5'>ADD YOUR BOOK</h2>
                        <p className='bodyText text-center p-3'>
                            Use this form to add a new book to our collection. Please enter the book’s unique <strong>ASIN</strong> (10-digit code),<strong>title</strong> , and <strong>category</strong>. Include the <strong>price</strong> and <strong>upload a cover image</strong> for a complete entry. Each field helps enhance the visibility and discoverability of the book within our catalog. Thank you for expanding our collection!
                        </p>
                        <span>
                            <strong>Book Categories:</strong>
                            <ul className='text-white p-3'>
                                <li>horror</li>
                                <li>scifi</li>
                                <li>romance</li>
                                <li>fantasy</li>
                                <li>history</li>
                            </ul>
                        </span>
                    </Col>
                    <Col sm={7}>
                        <div className='formAddBook d-flex mb-5 p-3'>
                            <form
                                onSubmit={submitForm}
                                encType='multipart/form-data'
                                className='d-flex flex-column gap-3 w-100 personalForm'>
                                <input
                                    className='form-control'
                                    name="asin"
                                    type="text"
                                    placeholder='Insert ASIN: 10 random numbers'
                                    onChange={onChangeInput}
                                />

                                <input
                                    className='form-control'
                                    name="title"
                                    type="text"
                                    placeholder='Insert a title'
                                    onChange={onChangeInput}
                                />

                                <input
                                    className='form-control'
                                    name="category"
                                    type="text"
                                    placeholder='Insert a category'
                                    onChange={onChangeInput}
                                />

                                <input
                                    className='form-control'
                                    name="price"
                                    type="number"
                                    min="0"
                                    placeholder='Insert a price'
                                    onChange={onChangeInput}
                                />

                                <input
                                    className='form-control'
                                    name="img"
                                    type="file"
                                    placeholder='Insert book image'
                                    onChange={onChangeFile}
                                />
                                <div className='d-flex justify-content-center'>
                                    <button
                                        className="buttonCustom ms-2 p-2"
                                        type="submit"
                                    >
                                        Add Book
                                    </button>
                                </div>

                            </form>
                        </div>
                    </Col>
                </Row>
            </Container>

        

    )
}