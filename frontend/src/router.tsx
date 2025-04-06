import { createRootRoute, createRoute, createRouter, } from '@tanstack/react-router';
import MainLayout from './layouts/MainLayout';
import routeConfig from './routes';
import DrumLayout from './layouts/DrumLayout';


const rootRoute = createRootRoute({});

interface LayoutProps {
    children: React.ReactNode;
}

const layouts: Record<string, React.FC<LayoutProps>> = {
    main: MainLayout,
    drum: DrumLayout,
    none: ({ children }) => <>{children}</>,
}

const childRoutes = routeConfig.map((r) => {
    const RouteComponent = r.component;
    const LayoutComponent = layouts[r.layout || 'none'];

    return createRoute({
        getParentRoute: () => rootRoute,
        path: r.path,
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