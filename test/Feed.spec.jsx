import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Feed from '../src/pages/Feed.jsx' 
import { getPosts } from '../src/services/ApiService.jsx'; 

vi.mock('../src/services/ApiService.jsx', () => ({
  getPosts: vi.fn(), 
}));


vi.mock('../src/components/Publicacion.jsx', () => ({

  default: ({ post }) => (
    <div data-testid="mock-publicacion">
      {post.id}
    </div>
  ),
}));



describe('Componente Feed', () => {
  
  // Prueba 1: Estado Cargando
  it("muestra el mensaje 'Cargando posts...' inicialmente", () => {

    getPosts.mockResolvedValueOnce([]); 
    
    render(<Feed />);
    
    expect(screen.getByText('Cargando posts...')).toBeInTheDocument();
  });


  it('renderiza el título y las publicaciones después de cargar los datos', async () => {
    

    const mockPosts = [
      { id: 'p1', content: 'Post 1' },
      { id: 'p2', content: 'Post 2' },
    ];
    

    getPosts.mockResolvedValueOnce(mockPosts);
    

    render(<Feed />);
    
    // Esperamos por el título
    expect(await screen.findByText('Feed de la Comunidad')).toBeInTheDocument();
    
    // Esperamos por los posts 
    const publicaciones = await screen.findAllByTestId('mock-publicacion');
    
    // 5. Verificar los resultados
    expect(publicaciones).toHaveLength(2); 
    expect(publicaciones[0]).toHaveTextContent('p1'); 
  });
});