// Variables globales para paginación
let libros = [];
let librosFiltrados = [];
let paginaActual = 1;
const resultadosPorPagina = 4;
let seHaBuscado = false;

// Elementos del DOM
const modalLibro = new bootstrap.Modal(document.getElementById('modalLibro'));
const formLibro = document.getElementById('form-libro');
const contenedorResultados = document.getElementById('contenedor-resultados');
const inputBusqueda = document.querySelector('input[type="text"]');
const selectCatalogo = document.querySelector('select:first-of-type');
const btnIr = document.querySelector('.btn-primary[type="submit"]');

// Funciones para el modal
window.abrirModalAgregar = function() {
    const modalTitulo = document.getElementById('modalLibroLabel');
    formLibro.reset();
    formLibro.archivo.disabled = false;
    modalTitulo.textContent = 'Agregar Nuevo Libro';
    formLibro.dataset.modo = 'agregar';
    modalLibro.show();
};

window.abrirModalEditarLibro = function(idLibro) {
    fetch('/classes/services/library/listFileService.php')
        .then(response => response.json())
        .then(data => {
            if (!data.success || !Array.isArray(data.libros)) return;
            const libro = data.libros.find(l => l.id === idLibro);
            if (!libro) return;
            
            const modalTitulo = document.getElementById('modalLibroLabel');
            modalTitulo.textContent = 'Editar Libro';
            formLibro.titulo.value = libro.titulo;
            formLibro.autor.value = libro.autor;
            formLibro.temas.value = libro.temas;
            formLibro.dataset.libroId = libro.id;
            formLibro.archivo.disabled = true;
            formLibro.dataset.modo = 'editar';
            modalLibro.show();
        });
};

// Función para eliminar libro
window.eliminarLibro = function(idLibro) {
    if (confirm('¿Estás seguro de que deseas eliminar este libro?')) {
        fetch('/classes/services/library/deleteFileService.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'id=' + encodeURIComponent(idLibro)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Libro eliminado exitosamente');
                cargarLibros();
            } else {
                alert('Error al eliminar el libro: ' + data.error);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error al comunicarse con el servidor');
        });
    }
};

// Función para cargar libros
window.cargarLibros = function() {
    fetch('/classes/services/library/listFileService.php')
        .then(response => response.json())
        .then(data => {
            if (data.success && Array.isArray(data.libros)) {
                libros = data.libros;
                if (data.libros.length === 0) {
                    contenedorResultados.innerHTML = '<div class="alert alert-info">No hay libros registrados.</div>';
                } else {
                    seHaBuscado = true;
                    librosFiltrados = [...libros];
                    paginaActual = 1;
                    mostrarLibrosPaginados();
                }
            } else {
                contenedorResultados.innerHTML = '<div class="alert alert-danger">No se pudieron cargar los libros.</div>';
            }
        })
        .catch(error => {
            contenedorResultados.innerHTML = '<div class="alert alert-danger">Error al cargar los libros.</div>';
            console.error('Error al cargar libros:', error);
        });
};

// Función para buscar libros
window.buscarLibros = function() {
    const termino = inputBusqueda.value.trim().toLowerCase();
    const filtro = selectCatalogo.value.toLowerCase();
    
    if (libros.length === 0) {
        cargarLibros().then(() => procesarBusqueda(termino, filtro));
    } else {
        procesarBusqueda(termino, filtro);
    }
};

function procesarBusqueda(termino, filtro) {
    seHaBuscado = true;
    paginaActual = 1;
    
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

// Funciones de paginación
window.paginaAnterior = function() {
    if (paginaActual > 1) {
        paginaActual--;
        mostrarLibrosPaginados();
    }
};

window.paginaSiguiente = function() {
    const totalPaginas = Math.ceil(librosFiltrados.length / resultadosPorPagina);
    if (paginaActual < totalPaginas) {
        paginaActual++;
        mostrarLibrosPaginados();
    }
};

function mostrarLibrosPaginados() {
    const totalPaginas = Math.ceil(librosFiltrados.length / resultadosPorPagina);
    if (paginaActual > totalPaginas) paginaActual = 1;
    
    const inicio = (paginaActual - 1) * resultadosPorPagina;
    const fin = inicio + resultadosPorPagina;
    const librosPagina = librosFiltrados.slice(inicio, fin);
    
    let html = '';
    librosPagina.forEach(libro => {
        html += `
        <div class="card mb-3">
            <div class="card-body">
                <h5 class="card-title">
                    <a href="http://localhost:8000/api/visualizarPdf.php?archivo=${libro.archivo}" target="_blank">${libro.titulo}</a>
                </h5>
                <p class="card-text"><strong>Autor:</strong> ${libro.autor}</p>
                <p class="card-text"><strong>Temas:</strong> ${libro.temas}</p>
                <div class="d-flex gap-2">
                    <button class="btn btn-sm btn-primary" onclick="abrirModalEditarLibro('${libro.id}')">
                        <i class="bi bi-pencil"></i> Editar
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="eliminarLibro('${libro.id}')">
                        <i class="bi bi-trash"></i> Eliminar
                    </button>
                </div>
            </div>
        </div>`;
    });
    
    contenedorResultados.innerHTML = html || '<div class="alert alert-info">No se encontraron resultados.</div>';
    
    // Actualizar paginación
    document.getElementById('pagina-actual').textContent = paginaActual;
    document.querySelector('.page-item:first-child .page-link').disabled = paginaActual === 1;
    document.querySelector('.page-item:last-child .page-link').disabled = paginaActual === totalPaginas;
}

// Manejo del formulario
formLibro.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(formLibro);
    const titulo = formData.get('titulo').trim();
    const autor = formData.get('autor').trim();
    const temas = formData.get('temas').trim();
    const modo = formLibro.dataset.modo || 'agregar';
    
    // Validaciones básicas
    if (titulo.length < 5 || titulo.length > 70) {
        alert('El título debe tener entre 5 y 70 caracteres.');
        return;
    }
    
    // Validar autor (puedes mejorar esto)
    const palabras = autor.split(/\s+/);
    if (palabras.length < 2) {
        alert('El autor debe tener al menos un nombre y un apellido.');
        return;
    }
    
    // Validar temas
    const temasRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+(\s*,\s*[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+)*$/;
    if (!temasRegex.test(temas)) {
        alert('Los temas deben contener solo letras y espacios, separados por comas.');
        return;
    }
    
    // Enviar datos al servidor
    const endpoint = modo === 'editar' 
        ? '/classes/services/library/editFileService.php' 
        : '/classes/services/library/saveFileService.php';
    
    fetch(endpoint, {
        method: 'POST',
        body: new FormData(formLibro)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert(modo === 'editar' ? 'Libro editado exitosamente' : 'Libro guardado exitosamente');
            modalLibro.hide();
            cargarLibros();
        } else {
            alert('Error: ' + (data.error || 'No se pudo procesar la solicitud'));
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error al comunicarse con el servidor');
    });
});

// Eventos
document.addEventListener('DOMContentLoaded', function() {
    cargarLibros();
    
    if (btnIr) {
        btnIr.addEventListener('click', function(e) {
            e.preventDefault();
            buscarLibros();
        });
    }
    
    if (inputBusqueda) {
        inputBusqueda.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                buscarLibros();
            }
        });
    }
});