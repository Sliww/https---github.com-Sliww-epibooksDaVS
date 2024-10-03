import "./profileIcon.css"
import profile from "../../../assets/profile.svg"

export const ProfileIcon = () => {
    return (
        <div className="d-flex justify-content-center align-items-center p-3 profileCustom">
            <a href="#">
                <img src={profile} alt="profile" />
            </a>

        </div>
    )
}