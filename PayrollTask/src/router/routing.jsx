import React,{lazy} from 'react';
import { createBrowserRouter } from 'react-router-dom';
import HomeLayout from '../components/layout/HomeLayout';
import PrivateRoute from '../routes/PrivateRoute';
import PublicRoute from '../routes/PublicRoute';
const Login = lazy(() => import('../pages/Login'));
const Dashboard=lazy(()=>import('../pages/Dashboard'))
const MyTask=lazy(()=>import('../pages/myTask/MyTask'))

export const routing = createBrowserRouter([
  {
    path: '/login',
    element: <PublicRoute component={Login} />
  },
  {
    path: '/', 
    element: <PrivateRoute component={HomeLayout} />,
    children: [
      { path: 'dashboard', element: <Dashboard /> }, 
      { path: 'mytask', element: <MyTask /> }, 
    ],
  },


]);
