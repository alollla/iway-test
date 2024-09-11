import {
  Routes,
  Route,
} from "react-router-dom";

import './App.scss';
import HomePage from "@/pages/Home";
import LoginPage from "@/pages/Login";
import Layout from "@/components/Layout";
import RequireAuth from "@/components/RequireAuth";

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

export default App
