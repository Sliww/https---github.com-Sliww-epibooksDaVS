import "./footer.css"
import { Container, Row, Col } from "react-bootstrap"

export const Footer = () => {
    return (
        <footer className="page-footer font-small blue pt-2 containerPersonal mt-5">
            <div className="container text-center text-md-left mt-4">
                <div className="row">
                    <div className="col-md-6 mt-md-0 mt-3">
                        <h5 className="text-uppercase h5title">Epibooks</h5>
                        <p>Immerse yourself in the joy of reading and let every book open the door to new ideas, adventures, and endless inspiration. Explore a world of stories waiting to be discovered, one page at a time.</p>
                    </div>

                    <hr className="clearfix w-100 d-md-none pb-0" />

                    <div className="col-md-3 mb-md-0 mb-3">
                        <h5 className="text-uppercase h5title">About</h5>
                        <ul className="list-unstyled">
                            <li><a href="#!">Work with Us</a></li>
                            <li><a href="#!">Be a Promoter</a></li>
                            <li><a href="#!">Promote your book</a></li>
                            <li><a href="#!">Send us your Idea</a></li>
                        </ul>
                    </div>

                    <div className="col-md-3 mb-md-0 mb-3">
                        <h5 className="text-uppercase h5title">Contacts</h5>
                        <ul className="list-unstyled">
                            <li><a href="#!">Numbers</a></li>
                            <li><a href="#!">Emails</a></li>
                            <li><a href="#!">Registered office</a></li>
                            <li><a href="#!">Linkedin</a></li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="footer-copyright text-center py-3">© 2024 Copyright: 
                <a href="#">Epibooks Official</a>
            </div>

        </footer>
    )
}