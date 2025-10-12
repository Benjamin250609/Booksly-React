const API_BASE_URL = 'http://demo0319497.mockable.io/';
const GOOGLE_BOOKS_BASE_URL = 'https://www.googleapis.com/books/v1/volumes';

export async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error HTTP! estado: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Falló la petición fetch a ${url}:`, error);
        throw error;
    }
}


export async function login(email, password) {
    try {
        const users = await fetchData(`${API_BASE_URL}/users`);

        const EncontrarUsuario = users.find(
            user => user.correo === email && user.password === password
        );

        return EncontrarUsuario || null;

    } catch (error) {
        console.error("Login failed:", error);
        throw error;
    }
}


export async function getPosts() {
    return fetchData(`${API_BASE_URL}/posts`);
}

export async function getLibrosUsuario(userId) {
    return fetchData(`${API_BASE_URL}/users/${userId}/books`);
}

export async function searchGoogleBooks(query, maxResults = 12) {
    const url = `${GOOGLE_BOOKS_BASE_URL}?q=${encodeURIComponent(query)}&maxResults=${maxResults}`;
    return fetchData(url);
}