import { Navigate, useLocation } from "react-router-dom";

import { store } from "@/store";
import { isAuth } from "@/store/authSlice";

function RequireAuth({ children }: { children: JSX.Element }) {
    const location = useLocation();

    if (!isAuth(store.getState())) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
}

export default RequireAuth