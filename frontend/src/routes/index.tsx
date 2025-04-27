import { ComponentType } from 'react';
import DrumLayout from '../layouts/DrumLayout';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Profile from '../pages/Profile';
import CreateSong from '../pages/CreateSong';
import Song from '../pages/Song';
import NotFound from '../pages/NotFound';
import Search from '../pages/Search';
import Playlist from '../pages/Playlist';
import PlaylistDetails from '../pages/PlaylistDetails';
import Browse from '../pages/Browse';
import Dashboard from '../pages/Dashboard';
import AdminLayout from '../layouts/AdminLayout';

export interface Route {
    path: string;
    component: ComponentType;
    layout: ComponentType | null;
    auth: boolean;
    admin?: boolean;
}

const routes: Route[] = [
    { path: '/', component: Home, layout: MainLayout, auth: true },
    { path: '/login', component: Login, layout: null, auth: false },
    { path: '/signup', component: Signup, layout: null, auth: false },
    { path: '/profile/:id', component: Profile, layout: MainLayout, auth: true },
    { path: '/profile', component: Profile, layout: MainLayout, auth: true },
    { path: '/song', component: CreateSong, layout: DrumLayout, auth: true },
    { path: '/song/:id', component: Song, layout: MainLayout, auth: true },
    { path: '/search', component: Search, layout: MainLayout, auth: true },
    { path: '/playlist/:id', component: PlaylistDetails, layout: MainLayout, auth: true },
    { path: '/playlist', component: Playlist, layout: MainLayout, auth: true },
    { path: '/browse', component: Browse, layout: MainLayout, auth: true },
    { path: '/admin', component: Dashboard, layout: AdminLayout, auth: true, admin: true },
    { path: '*', component: NotFound, layout: null, auth: false },
];

export default routes;