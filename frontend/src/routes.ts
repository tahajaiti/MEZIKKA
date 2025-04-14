import { FC } from 'react';
import Home from './pages/Home';
import Profile from './pages/Profile';
import CreateSong from './pages/CreateSong';
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
    { path: '/signup', component: Signup, layout: 'none', auth: false },
    { path: '/profile', component: Profile, layout: 'main', auth: true },
    { path: '/create/song', component: CreateSong, layout: 'drum', auth: true },
];

export default routeConfig;