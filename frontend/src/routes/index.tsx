import { ComponentType } from 'react';
import DrumLayout from '../layouts/DrumLayout';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Profile from '../pages/Profile';
import CreateSong from '../pages/CreateSong';
import Song from '../pages/Song';

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
    { path: '/profile/:id', component: Profile, layout: MainLayout, auth: true },
    { path: '/song', component: CreateSong, layout: DrumLayout, auth: true },
    { path: '/song/:id', component: Song, layout: MainLayout, auth: true },
];

export default routes;