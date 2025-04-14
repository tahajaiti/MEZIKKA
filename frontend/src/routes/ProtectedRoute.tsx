import { JSX } from 'react';
import { useNavigate } from 'react-router';
import useAuthStore from '../stores/authStore';

interface ProtectedRouteProps {
    children: JSX.Element;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { isAuthenticated } = useAuthStore();
    const navigate = useNavigate();
    if (!isAuthenticated) {
        navigate('/login', { replace: true });
        return null;
    }
    return children;
};

export default ProtectedRoute;