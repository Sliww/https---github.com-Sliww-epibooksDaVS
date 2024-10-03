import "./logo.css"
import logo from "../../../assets/books-svgrepo-com.svg"

export const Logo = () => {
    return (
        <div className="logo p-3 gap-2">
            <a href="#">
                <img src={logo} alt="logo" />
                
            </a>
            <h4 className="m-0">EPIBOOKS</h4>
        </div>
    )
}