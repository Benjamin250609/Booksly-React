
const MICRO_BIBLIOTECA_URL = 'http://100.30.140.229:8081';
const MICRO_SOCIAL_URL = 'http://98.95.129.147:8082';
const GOOGLE_BOOKS_BASE_URL = 'https://www.googleapis.com/books/v1/volumes';

async function fetchData(url, options = {}) {
    try {
        const response = await fetch(url, options);
        
        if (!response.ok) {
            const errorBody = await response.text(); 
            throw new Error(errorBody || `Error HTTP! estado: ${response.status}`);
        }

        if (response.status === 204) return null;

        const text = await response.text();
        
        return text ? JSON.parse(text) : {};

    } catch (error) {
        console.error(`Falló la petición a ${url}:`, error);
        throw error;
    }
}

export async function login(email, password) {
    return await fetchData(`${MICRO_BIBLIOTECA_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });
}

export async function registrarUsuario(datosUsuario) {
    return await fetchData(`${MICRO_BIBLIOTECA_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datosUsuario)
    });
}

export async function getLibrosUsuario(userId) {
    return await fetchData(`${MICRO_BIBLIOTECA_URL}/api/library/books?userId=${userId}`);
}

export async function agregarLibro(nuevoLibro, userId) {
    return await fetchData(`${MICRO_BIBLIOTECA_URL}/api/library/books?userId=${userId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoLibro)
    });
}

export async function actualizarProgreso(libroId, progreso) {
    return await fetchData(`${MICRO_BIBLIOTECA_URL}/api/library/books/${libroId}/progress`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(progreso)
    });
}

export async function getPosts() {
    return await fetchData(`${MICRO_SOCIAL_URL}/api/social/feed`);
}

export async function crearPost(nuevoPost) {
    return await fetchData(`${MICRO_SOCIAL_URL}/api/social/post`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoPost)
    });
}

export async function darLike(postId) {
    return await fetchData(`${MICRO_SOCIAL_URL}/api/social/post/${postId}/like`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    });
}

export async function comentarPost(postId, comentarioDTO) {
    return await fetchData(`${MICRO_SOCIAL_URL}/api/social/post/${postId}/comentar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(comentarioDTO)
    });
}

export async function searchGoogleBooks(query, maxResults = 12) {
    const url = `${GOOGLE_BOOKS_BASE_URL}?q=${encodeURIComponent(query)}&maxResults=${maxResults}`;
    return await fetchData(url);
}

export async function getEventosCalendario() {
    return { eventos: {} }; 
}