import { createRootRoute, createRoute, createRouter, redirect, } from '@tanstack/react-router';
import MainLayout from './layouts/MainLayout';
import routeConfig from './routes';
import DrumLayout from './layouts/DrumLayout';
import useAuthStore from './stores/authStore';
import useToastStore from './stores/useToastStore';


const rootRoute = createRootRoute({});

interface LayoutProps {
    children: React.ReactNode;
}

const layouts: Record<string, React.FC<LayoutProps>> = {
    main: MainLayout,
    drum: DrumLayout,
    none: ({ children }) => <>{children}</>,
}


const requireAuth = async () => {
    const state = useAuthStore.getState();
    const isAuthenticated = state.isAuthenticated;

    if (!isAuthenticated) {
        const { showToast } = useToastStore.getState();
        showToast('Session expired. Please log in again.', 'error');
        throw redirect({
            to: '/login',
            replace: true,
        })
    }
}

const childRoutes = routeConfig.map((r) => {
    const RouteComponent = r.component;
    const LayoutComponent = layouts[r.layout || 'none'];

    return createRoute({
        getParentRoute: () => rootRoute,
        path: r.path,
        beforeLoad: r.auth ? requireAuth : undefined,
        component: () => (
            <LayoutComponent>
                <RouteComponent />
            </LayoutComponent>
        ),
    });
});

const routeTree = rootRoute.addChildren(childRoutes);

export const router = createRouter({
    routeTree,
});

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router;
    }

    interface RoutePaths {
        '/': '/';
        '/login': '/login';
        '/signup': '/signup';
        '/create/song': '/create/song';
    }
}