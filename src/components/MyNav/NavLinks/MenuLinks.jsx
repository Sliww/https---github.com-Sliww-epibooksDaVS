import "./menuLinks.css"
import { Link } from "react-router-dom"

export const MenuLinks = () => {
    return (
        <ul className="menuLinks d-flex gap-5 p-0">
            <Link to='/'>
                <li><a href="#" className="me-5">Home</a></li>
            </Link>
            <Link to='/about'>
                <li><a href="#" className="me-5">About</a></li>
            </Link>
            <Link to='/contactus'>
                <li><a href="#">Contact Us</a></li>
            </Link>

        </ul>
    )
}