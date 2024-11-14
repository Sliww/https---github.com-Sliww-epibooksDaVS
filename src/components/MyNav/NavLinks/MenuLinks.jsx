import "./menuLinks.css"
import { Link } from "react-router-dom"

export const MenuLinks = () => {
    return (
        <ul className="menuLinks p-0 d-flex gap-5">
            <Link to='/'>
                <li>Home</li>
            </Link>
            <div className="d-none d-md-flex gap-5">
                <Link to='/about'>
                    <li>About</li>
                </Link>
                <Link to='/contactus'>
                    <li>Contact Us</li>
                </Link>
            </div>
        </ul>
    )
}