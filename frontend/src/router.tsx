import {
    createRootRoute,
    createRoute,
    createRouter,
} from '@tanstack/react-router';



import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import CreateSongPage from './pages/CreateSongPage';

const rootRoute = createRootRoute({
    component: MainLayout,
});

const homeRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: Home
});

const createSongRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/create-song',
    component: CreateSongPage
});

const routeTree = rootRoute.addChildren([
    homeRoute, 
    createSongRoute
]);

export const router = createRouter({
    routeTree,
})

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router;
    }
}