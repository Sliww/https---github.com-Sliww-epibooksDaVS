import './offcanvasmenu.css'
import { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import burgerMenu from '../../../../assets/menu-sharp.svg';
import { Link } from "react-router-dom"

export const OffCanvasEx = ({ name, ...props }) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <button onClick={handleShow} className="buttonMenuBurger">
                <div className='threeLines'>
                    <img src={burgerMenu} />
                </div>

            </button>

            <Offcanvas placement="end" show={show} onHide={handleClose} {...props} className="offColorBackground">
                <Offcanvas.Header className='headerText'>
                    <Offcanvas.Title>Hello! USER</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className='bodyText'>
                    <ul className='d-flex flex-column gap-4 menuLinks'>
                        <Link to='/login'>
                            <li>LOGIN</li>
                        </Link>
                        <li><a href='#'>SIGN IN</a></li>
                        <hr></hr>
                        <li><strong>From now you can also add your own book for sale!</strong></li>
                        <Link to='/addbook'>
                        <li>Add a Book</li>
                        </Link>
                        
                    </ul>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}

