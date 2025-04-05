import { createRootRoute, createRoute, createRouter, } from '@tanstack/react-router';
import MainLayout from './layouts/MainLayout';
import routeConfig from './routes';


const rootRoute = createRootRoute({
    component: MainLayout,
});

const childRoutes = routeConfig.map((r) =>
    createRoute({
        getParentRoute: () => rootRoute,
        path: r.path,
        component: r.component,
    })
);

const routeTree = rootRoute.addChildren(childRoutes);

export const router = createRouter({
    routeTree,
})

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router;
    }
}