import { FC } from 'react';
import Home from './pages/Home';
import CreateSongPage from './pages/CreateSongPage';
import Login from './pages/Login';
import Signup from './pages/Signup';

interface RouteConfig {
    path: string;
    component: FC;
    layout?: boolean;
}

const routeConfig: RouteConfig[] = [
    { path: '/', component: Home, layout: true },
    { path: '/login', component: Login, layout: false },
    { path: '/signup', component: Signup, layout: false },
    { path: '/create/song', component: CreateSongPage, layout: true },
];

export default routeConfig;