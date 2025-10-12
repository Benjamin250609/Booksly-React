import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';


import AppLayout from './components/Sidebar';
import Home from './pages/Home';
import Login from './pages/Login';
import Registro from './pages/Registro';
import Feed from './pages/Feed';
import Principal from './pages/Principal';
import LibroDetalle from './pages/LibroDetalle';
import Buscar from './pages/Buscar';

import './styles/Registro-login.css'
import './styles/Estilos-comunes.css'
import Estadisticas from './pages/Estadisticas';






const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/registro',
    element: <Registro />,
  },
  {
    path: '/app',
    element: <AppLayout />,
    children: [
      {
        path: 'inicio',
        element: <  Principal />, 
      },
      {
        path: 'feed',
        element: <Feed />
      },
      {
        path: 'libro/:id',
        element : <LibroDetalle/>
      },
      {
        path: 'buscar',
        element : <Buscar />
      },
      {
        path: 'estadisticas',
        element : <Estadisticas />
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    </React.StrictMode>
);
