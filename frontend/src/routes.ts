import { Home } from "lucide-react";
import CreateSongPage from "./pages/CreateSongPage";
import Login from "./pages/Login";


interface RouteConfig {
    path: string;
    component: React.FC;
}

const routeConfig: RouteConfig[] = [
    {path: '/', component: Home},
    {path: '/login', component: Login},
    {path: '/create/song', component: CreateSongPage}
];

export default routeConfig;