import "./navbar.css"
import { Logo } from "./Logo/Logonav"
import { MenuLinks } from "./NavLinks/MenuLinks"
import { ProfileIcon } from "./ProfileIcon/ProfileIconNav"
import { InputBooks } from "./SearchBooks/InputBooks"


export const Navbar = () => {
    return (
        <nav className="navPersonal container-fluid">
            <div className="row">
                <div className="navProperties col ">
                    <div className="d-flex logolinks gap-4">
                        <Logo />
                        <MenuLinks />
                    </div>
                    <div className="d-flex align-items-center gap-5">
                        <InputBooks />

                        <ProfileIcon />
                    </div>
                </div>
            </div>
        </nav>
    )
}