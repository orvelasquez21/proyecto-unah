// Importar todos los módulos necesarios
import { initializeModal, abrirModalAgregar, abrirModalEditarLibro } from './modules/modal-handler.js';
import { cargarLibros, buscarLibros, eliminarLibro, guardarLibro, editarLibro } from './modules/book-manager.js';
import { initializePagination, paginaAnterior, paginaSiguiente, mostrarLibrosPaginados } from './modules/search-pagination.js';
import { initializeChips, temasArray, renderChips, updateTemasHidden } from './modules/chips-handler.js';

// Asignar funciones al objeto window para que estén disponibles globalmente
window.abrirModalAgregar = abrirModalAgregar;
window.abrirModalEditarLibro = abrirModalEditarLibro;
window.eliminarLibro = eliminarLibro;
window.cargarLibros = cargarLibros;
window.buscarLibros = buscarLibros;
window.paginaAnterior = paginaAnterior;
window.paginaSiguiente = paginaSiguiente;
window.mostrarLibrosPaginados = mostrarLibrosPaginados;
window.temasArray = temasArray;
window.renderChips = renderChips;
window.updateTemasHidden = updateTemasHidden;

// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    initializeModal();
    initializePagination();
    initializeChips();
    cargarLibros();
    
    // Configurar evento de búsqueda
    const btnIr = document.querySelector('.buscador-btn');
    const inputBusqueda = document.querySelector('.buscador-input');
    
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