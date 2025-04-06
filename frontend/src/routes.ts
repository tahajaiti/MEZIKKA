import { FC } from 'react';
import Home from './pages/Home';
import CreateSongPage from './pages/CreateSongPage';
import Login from './pages/Login';
import Signup from './pages/Signup';

interface RouteConfig {
    path: string;
    component: FC;
    layout: string;
    auth: boolean;
}

const routeConfig: RouteConfig[] = [
    { path: '/', component: Home, layout: 'main', auth: true },
    { path: '/login', component: Login, layout: 'none', auth: false },
    { path: '/signup', component: Signup, layout: 'none' , auth: false},
    { path: '/create/song', component: CreateSongPage, layout: 'drum' , auth: true},
];

export default routeConfig;