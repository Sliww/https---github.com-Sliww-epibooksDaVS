import './offcanvasmenu.css'
import { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import burgerMenu from '../../../../assets/menu-sharp.svg';
import { Link, useNavigate } from "react-router-dom";
import useSession from '../../../../hooks/useSession';

export const OffCanvasEx = ({ name, ...props }) => {
    const [show, setShow] = useState(false);
    const session = useSession();
    const navigate = useNavigate();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleLogout = () => {
        localStorage.removeItem('token');
        handleClose();
        navigate('/');
        window.location.reload();
    };

    return (
        <>
            <button onClick={handleShow} className="buttonMenuBurger">
                <div className='threeLines'>
                    <img src={burgerMenu} alt="menu" />
                </div>
            </button>

            <Offcanvas placement="end" show={show} onHide={handleClose} {...props} className="offColorBackground">
                <Offcanvas.Header className='headerText'>
                    <Offcanvas.Title>
                        Hello! {session?.name || 'USER'}
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className='bodyText'>
                    <ul className='d-flex flex-column gap-4 menuLinks'>
                        <Link to='/login'>
                            <li>LOGIN</li>
                        </Link>

                        {!session ? (
                            <Link to='/register'>
                                <li>REGISTER</li>
                            </Link>
                        ) : (
                            <Link>
                                <li onClick={handleLogout} style={{ cursor: 'pointer' }}>
                                    LOGOUT
                                </li>
                            </Link>

                        )}

                        <hr />
                        <li><strong>From now you can also add your own book for sale!</strong></li>
                        <Link to='/addbook'>
                            <li>Add a Book</li>
                        </Link>
                    </ul>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
};

