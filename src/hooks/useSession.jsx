import { useAuth } from "../middlewares/ProtectedRoutes";
import { jwtDecode as jwt } from "jwt-decode";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useSession = () => {
    const session = useAuth();
    const decodedSession = session ? jwt(session) : null;

    const navigate = useNavigate();

    useEffect(() => {
        if (!session) {
            navigate("/");
        }
    }, [session, navigate]);

    return decodedSession;
}

export default useSession;
