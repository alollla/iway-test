import {
  Routes,
  Route,
  Outlet,
  Navigate,
  useLocation
} from "react-router-dom";

import './App.scss';
import HomePage from "@/pages/Home";
import LoginPage from "@/pages/Login";
// import TripDetails from "@/pages/Trip";
import { store } from "@/store";
import { isAuth } from "@/store/authSlice";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={
          <RequireAuth>
            <HomePage />
          </RequireAuth>
        } />
        <Route path="/login" element={<LoginPage />} />
      </Route>
    </Routes>
  )
}

function RequireAuth({ children }: { children: JSX.Element }) {
  const location = useLocation();

  if (!isAuth(store.getState())) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

function Layout() {
  return (
    <div>
      <Outlet />
    </div>
  );
}

export default App
