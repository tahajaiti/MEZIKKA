import { Home } from "lucide-react";
import CreateSongPage from "./pages/CreateSongPage";
import Login from "./pages/Login";


interface RouteConfig {
    path: string;
    component: React.FC;
    layout?: boolean;
}

const routeConfig: RouteConfig[] = [
    { path: '/', component: Home, layout: true },
    { path: '/login', component: Login, layout: false },
    { path: '/create/song', component: CreateSongPage, layout: true },
];

export default routeConfig;