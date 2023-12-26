import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Login from './pages/Login';
import DashboardApp from './pages/DashboardApp';
import NotFound from './pages/Page404';
import Admin from './pages/Admin';
import Memer from './pages/Memers';
import Campaign from './pages/Campaign';
import Platform from './pages/Platform';
import Tags from './pages/Tags';
import Memedd from './pages/Memedd';
import ResetPassword from './pages/ResetPassword';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: 'app', element: <DashboardApp /> },
        { path: 'users', element: <Admin /> },
        { path: 'memerr', element: <Memer /> },
        { path: 'memedd', element: <Memedd/> },
        { path: 'campaign', element: <Campaign /> },
        { path: 'social-platform', element: <Platform /> },
        { path: 'tags', element: <Tags /> },
        { path: 'reset-password', element: <ResetPassword /> },
      ]
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Navigate to="/dashboard/app" /> },
        { path: 'login', element: <Login /> },
        // { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}
