import { Route } from 'react-router';
import { Route as RouteType } from '.';
import ProtectedRoute from './ProtectedRoute';

const render = (routes: RouteType[]) => {
    return routes.map(({ path, component: Component, layout: Layout, auth, admin }) => {
        const element = auth ? (
            <ProtectedRoute admin={admin}>
                <Component />
            </ProtectedRoute>
        ) : (
            <Component />
        );

        return (
            <Route
                key={path}
                path={path}
                element={Layout ? <Layout /> : element}
            >
                {Layout && <Route index element={element} />}
            </Route>
        );
    });
};

export default render;