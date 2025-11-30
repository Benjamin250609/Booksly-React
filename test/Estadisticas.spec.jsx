import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Estadisticas from '../src/pages/Estadisticas.jsx'; 



import * as ApiService from '../src/services/ApiService.jsx';
vi.mock('../src/services/ApiService.jsx', () => ({
  getLibrosUsuario: vi.fn(),
}));


const mockLogout = vi.fn(); 
vi.mock('../src/context/AuthContext.jsx', () => ({
  useAuth: () => ({
    user: { id: 'usuario-simulado-123' },
    logout: mockLogout, 
  }),
}));


vi.mock('react-router-dom', () => ({
  useNavigate: () => vi.fn(), 
}));


vi.mock('../src/components/TarjetaEstadistica.jsx', () => ({
  default: ({ valor, etiqueta }) => (
    <div data-testid="tarjeta">
      <span>{etiqueta}</span>: <span>{valor}</span>
    </div>
  ),
}));
vi.mock('../src/components/ListaLibrosProgreso.jsx', () => ({
  default: ({ titulo, libros }) => (
    <div data-testid="lista-libros">
      <h3>{titulo}</h3>
      <span>Total: {libros.length}</span>
    </div>
  ),
}));



describe('Componente Estadisticas', () => {

  beforeEach(() => {
    vi.clearAllMocks();
  });

  // Prueba 1: Cálculo de estadísticas
  it('calcula y muestra las estadísticas correctamente después de cargar los datos', async () => {
    
    // 1. Preparar datos falsos
    const mockLibros = [
      { id: 1, totalPages: 100, currentPage: 100 }, // Finalizado
      { id: 2, totalPages: 200, currentPage: 50 },  // En curso
      { id: 3, totalPages: 100, currentPage: 10 },  // En curso
    ];


    ApiService.getLibrosUsuario.mockResolvedValue(mockLibros);
    

    render(<Estadisticas />);
    
  
    
    // Esperamos por el título
    expect(await screen.findByText('Mi Progreso de Lectura')).toBeInTheDocument();
    
    // Buscamos la estadística
    const tarjetas = await screen.findAllByTestId('tarjeta');
    expect(tarjetas[0]).toHaveTextContent('Libros Terminados: 1');
    expect(tarjetas[1]).toHaveTextContent('Páginas Leídas: 160'); 
    expect(tarjetas[2]).toHaveTextContent('Páginas / Hora: 30');
    
    // Buscamos las listas de libros
    const listas = await screen.findAllByTestId('lista-libros');
    expect(listas[0]).toHaveTextContent('Libros en Curso');
    expect(listas[0]).toHaveTextContent('Total: 2');
    expect(listas[1]).toHaveTextContent('Libros Finalizados');
    expect(listas[1]).toHaveTextContent('Total: 1');
  });

  // Prueba 2: Interacción con el botón 
  it("llama a la función 'logout' al hacer clic en 'Cerrar Sesión'", async () => {
    
    ApiService.getLibrosUsuario.mockResolvedValueOnce([]);
    
    // 2. Renderizar
    render(<Estadisticas />);
    
    // 3. Buscar el botón 
    const botonLogout = await screen.findByRole('button', { name: /Cerrar Sesión/i });
    
    // 4. Simular el clic
    fireEvent.click(botonLogout);
    
    // 5. Verificar que la función fue llamada
    expect(mockLogout).toHaveBeenCalledTimes(1);
  });
});