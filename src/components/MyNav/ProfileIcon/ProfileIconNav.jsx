import "./profileIcon.css"
import profile from "../../../assets/profile.svg"
import { OffCanvasEx } from "./OffCanvassMenu/OffCanvasMenuBurger"



export const ProfileIcon = () => {
    return (
        <div className="d-flex justify-content-center align-items-center gap-2 p-1 profileCustom">
            <a href="#">
                <img src={profile} alt="profile" />
            </a>

            <OffCanvasEx/>
            

        </div>
    )
}