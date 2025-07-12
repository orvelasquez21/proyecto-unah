import { mostrarLibrosPaginados } from './search-pagination.js';

let libros = [];
let librosFiltrados = [];
let seHaBuscado = false;

export async function cargarLibros() {
    try {
        const response = await fetch('/classes/services/library/listFileService.php');
        const data = await response.json();
        
        if (data.success && Array.isArray(data.libros)) {
            libros = data.libros;
            if (data.libros.length === 0) {
                document.getElementById('contenedor-resultados').innerHTML = '<div class="alert alert-info">No hay libros registrados.</div>';
            } else {
                seHaBuscado = true;
                librosFiltrados = [...libros];
                mostrarLibrosPaginados();
            }
        } else {
            document.getElementById('contenedor-resultados').innerHTML = '<div class="alert alert-danger">No se pudieron cargar los libros.</div>';
        }
    } catch (error) {
        document.getElementById('contenedor-resultados').innerHTML = '<div class="alert alert-danger">Error al cargar los libros.</div>';
        console.error('Error al cargar libros:', error);
    }
}

export function buscarLibros() {
    const inputBusqueda = document.querySelector('.buscador-input');
    const selectCatalogo = document.querySelector('.buscador-select');
    
    const termino = inputBusqueda.value.trim().toLowerCase();
    const filtro = selectCatalogo.value.toLowerCase();
    
    if (libros.length === 0) {
        cargarLibros().then(() => procesarBusqueda(termino, filtro));
    } else {
        procesarBusqueda(termino, filtro);
    }
}

function procesarBusqueda(termino, filtro) {
    seHaBuscado = true;
    
    if (termino) {
        librosFiltrados = libros.filter(libro => {
            if (filtro === 'autor') {
                return libro.autor.toLowerCase().includes(termino);
            } else if (filtro === 'tema') {
                return libro.temas.toLowerCase().includes(termino);
            } else {
                return (
                    libro.titulo.toLowerCase().includes(termino) ||
                    libro.autor.toLowerCase().includes(termino) ||
                    libro.temas.toLowerCase().includes(termino)
                );
            }
        });
    } else {
        librosFiltrados = [...libros];
    }
    
    mostrarLibrosPaginados();
}

export async function eliminarLibro(idLibro) {
    if (confirm('¿Estás seguro de que deseas eliminar este libro?')) {
        try {
            const response = await fetch('/classes/services/library/deleteFileService.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: 'id=' + encodeURIComponent(idLibro)
            });
            const data = await response.json();
            
            if (data.success) {
                alert('Libro eliminado exitosamente');
                cargarLibros();
            } else {
                alert('Error al eliminar el libro: ' + data.error);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error al comunicarse con el servidor');
        }
    }
}

export async function guardarLibro(formData) {
    try {
        const response = await fetch('/classes/services/library/saveFileService.php', {
            method: 'POST',
            body: formData
        });
        const data = await response.json();
        
        if (data.success) {
            alert('Libro guardado exitosamente');
            cargarLibros();
        } else {
            alert('Error: ' + (data.error || 'No se pudo procesar la solicitud'));
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error al comunicarse con el servidor');
    }
}

export async function editarLibro(formData) {
    try {
        const response = await fetch('/classes/services/library/editFileService.php', {
            method: 'POST',
            body: formData
        });
        const data = await response.json();
        
        if (data.success) {
            alert('Libro editado exitosamente');
            cargarLibros();
        } else {
            alert('Error: ' + (data.error || 'No se pudo procesar la solicitud'));
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error al comunicarse con el servidor');
    }
}

export function getLibros() {
    return libros;
}

export function getLibrosFiltrados() {
    return librosFiltrados;
}