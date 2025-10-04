import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';


import AppLayout from './components/Sidebar';
import Home from './pages/Home';
import Login from './pages/Login';
import Registro from './pages/Registro';

import './styles/Registro-login.css'
import './styles/Estilos-comunes.css'

// Una página temporal para que el enlace "Inicio" de la barra lateral no dé error
const PaginaTemporal = () => <div>Página de Inicio (temporal)</div>;

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
        element: <PaginaTemporal />, 
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

