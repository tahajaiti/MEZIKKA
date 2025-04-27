import { JSX, useEffect } from 'react';
import { useNavigate } from 'react-router';
import useAuthStore from '../stores/authStore';

interface ProtectedRouteProps {
    children: JSX.Element;
    admin?: boolean;
}

const ProtectedRoute = ({ children, admin }: ProtectedRouteProps) => {
    const { isAuthenticated } = useAuthStore();
    const { user } = useAuthStore();
    const navigate = useNavigate();

    const isAdmin = user?.role.name === 'admin';

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login', { replace: true });
        }

        if (admin && !isAdmin) {
            navigate('/', { replace: true });
        }
    }, [isAuthenticated, navigate, admin, isAdmin]);

    if (!isAuthenticated) {
        return null;
    }

    if (admin && !isAdmin) {
        return null;
    }

    return children;
};

export default ProtectedRoute;