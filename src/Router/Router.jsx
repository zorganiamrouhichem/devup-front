import { Routes, Route } from 'react-router-dom';
import Home from '../Component/Home';
import Login from '../Component/Login';
import Register from '../Component/Register';
import UserDashboard from '../Component/UserDashboard';




const Routercomponent = () => {
    return (
        <Routes >
            <Route path="/"element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {/* Protéger l'accès au tableau de bord */}
            <Route path="/dashboard" element={<UserDashboard />} />
        </Routes>
    );
}
export default Routercomponent;