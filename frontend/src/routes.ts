import { FC } from 'react';
import Home from './pages/Home';
import CreateSongPage from './pages/CreateSongPage';
import Login from './pages/Login';
import Signup from './pages/Signup';

interface RouteConfig {
    path: string;
    component: FC;
    layout: string;
}

const routeConfig: RouteConfig[] = [
    { path: '/', component: Home, layout: 'main' },
    { path: '/login', component: Login, layout: 'none' },
    { path: '/signup', component: Signup, layout: 'none' },
    { path: '/create/song', component: CreateSongPage, layout: 'drum' },
];

export default routeConfig;