import "./menuLinks.css"
import { Link } from "react-router-dom"

export const MenuLinks = () => {
    return (
        <ul className="menuLinks d-none d-md-flex gap-5 p-0">
            <Link to='/'>
                <li>Home</li>
            </Link>
            <Link to='/about'>
                <li>About</li>
            </Link>
            <Link to='/contactus'>
                <li>Contact Us</li>
            </Link>

        </ul>
    )
}