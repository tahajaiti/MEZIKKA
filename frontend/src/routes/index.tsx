import { ComponentType } from 'react';
import DrumLayout from '../layouts/DrumLayout';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Profile from '../pages/Profile';
import CreateSong from '../pages/CreateSong';

export interface Route {
    path: string;
    component: ComponentType;
    layout: ComponentType | null;
    auth: boolean;
}

const routes: Route[] = [
    { path: '/', component: Home, layout: MainLayout, auth: true },
    { path: '/login', component: Login, layout: null, auth: false },
    { path: '/signup', component: Signup, layout: null, auth: false },
    { path: '/profile', component: Profile, layout: MainLayout, auth: true },
    { path: '/create/song', component: CreateSong, layout: DrumLayout, auth: true },
];

export default routes;