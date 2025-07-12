import { getLibrosFiltrados } from './book-manager.js';

let paginaActual = 1;
const resultadosPorPagina = 4;

export function initializePagination() {
    // No se necesita inicialización adicional en este caso
}

export function mostrarLibrosPaginados() {
    const librosFiltrados = getLibrosFiltrados();
    const totalPaginas = Math.ceil(librosFiltrados.length / resultadosPorPagina);
    if (paginaActual > totalPaginas) paginaActual = 1;
    
    const inicio = (paginaActual - 1) * resultadosPorPagina;
    const fin = inicio + resultadosPorPagina;
    const librosPagina = librosFiltrados.slice(inicio, fin);
    
    let html = '';
    librosPagina.forEach(libro => {
        html += `
<div class="card mb-3 shadow-sm">
  <div class="row g-0">
    <div class="col-md-2 d-flex align-items-center justify-content-center bg-light p-2">
      <a href="http://localhost:30000/public/api/library/get/book/"
         target="_blank" 
         class="btn btn-sm btn-primary d-flex flex-column align-items-center"
         style="width: 80px; height: 80px; padding: 10px;">
         <unah-view-file></unah-view-file>
         <i class="bi bi-file-earmark-pdf" style="font-size: 1.5rem;"></i>
         <span class="mt-1" style="font-size: 0.7rem;">Ver PDF tor</span>
      </a>
    </div>
    <div class="col-md-10">
      <div class="card-body py-2">
        <h5 class="card-title mb-1">${libro.titulo}</h5>
        <p class="card-text mb-1"><small class="text-muted"><i class="bi bi-person"></i> ${libro.autor}</small></p>
        <p class="card-text"><small class="text-muted"><i class="bi bi-tags"></i> ${libro.temas}</small></p>
        
        <div class="d-flex justify-content-end gap-2 mt-2">
          <button class="btn btn-sm btn-primary" 
                  onclick="abrirModalEditarLibro('${libro.id}')">
            <i class="bi bi-pencil"></i> Editar
          </button>
          <button class="btn btn-sm btn-danger" 
                  onclick="eliminarLibro('${libro.id}')">
            <i class="bi bi-trash"></i> Eliminar
          </button>
        </div>
      </div>
    </div>
  </div>
</div>`;
    });
    
    const contenedorResultados = document.getElementById('contenedor-resultados');
    contenedorResultados.innerHTML = html || '<div class="alert alert-info">No se encontraron resultados.</div>';
    
    // Actualizar controles de paginación
    const btnAnterior = document.querySelector('#paginacion button:first-child');
    const btnSiguiente = document.querySelector('#paginacion button:last-child');
    const paginaActualElement = document.getElementById('pagina-actual');
    
    if (paginaActualElement) paginaActualElement.textContent = paginaActual;
    if (btnAnterior) btnAnterior.disabled = paginaActual === 1;
    if (btnSiguiente) btnSiguiente.disabled = paginaActual === totalPaginas;
}

export function paginaAnterior() {
    if (paginaActual > 1) {
        paginaActual--;
        mostrarLibrosPaginados();
    }
}

export function paginaSiguiente() {
    const librosFiltrados = getLibrosFiltrados();
    const totalPaginas = Math.ceil(librosFiltrados.length / resultadosPorPagina);
    if (paginaActual < totalPaginas) {
        paginaActual++;
        mostrarLibrosPaginados();
    }
}