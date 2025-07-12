

// Variables globales para paginación
let libros = [];
let librosFiltrados = [];
let paginaActual = 1;
const resultadosPorPagina = 4;
let seHaBuscado = false;

// Inicialización del modal de Bootstrap
const modalLibro = new bootstrap.Modal(document.getElementById('modal-libro'));

// Funciones para el modal
window.abrirModalEditar = function(idLibro) {
    fetch('/classes/services/library/listFileService.php')
        .then(response => response.json())
        .then(data => {
            if (!data.success || !Array.isArray(data.libros)) return;
            const libro = data.libros.find(l => l.id === idLibro);
            if (!libro) return;
            
            const form = document.getElementById('form-libro');
            document.getElementById('modal-titulo').textContent = 'Editar Libro';
            form.titulo.value = libro.titulo;
            form.autor.value = libro.autor;
            
            // Configurar temas (chips)
            if (window.temasArray) {
                window.temasArray = libro.temas.split(',').map(t => t.trim()).filter(Boolean);
                if (window.updateTemasHidden) window.updateTemasHidden();
                if (window.renderChips) window.renderChips();
            }
            
            form.archivo.disabled = true;
            document.getElementById('archivo-help').style.display = 'none';
            document.getElementById('archivo-edit-help').style.display = 'block';
            form.archivo.value = '';
            form.dataset.modo = 'editar';
            form.dataset.libroId = libro.id;
            
            modalLibro.show();
        });
};

// Funciones para chips de temas (se mantienen igual que en el original)
window.temasArray = [];

window.renderChips = function() {
    const chipsContainer = document.getElementById('temas-chips-container');
    const chipsInput = document.getElementById('temas-input');
    
    // Eliminar chips existentes
    chipsContainer.querySelectorAll('.chip-tema').forEach(chip => chip.remove());
    
    // Agregar nuevos chips
    window.temasArray.forEach((tema, idx) => {
        const chip = document.createElement('span');
        chip.className = 'chip-tema';
        chip.textContent = tema;
        
        const closeBtn = document.createElement('button');
        closeBtn.type = 'button';
        closeBtn.textContent = '×';
        closeBtn.onclick = function() {
            window.temasArray.splice(idx, 1);
            window.updateTemasHidden();
            window.renderChips();
        };
        
        chip.appendChild(closeBtn);
        chipsContainer.insertBefore(chip, chipsInput);
    });
};

window.updateTemasHidden = function() {
    document.getElementById('temas').value = window.temasArray.join(', ');
};

// Inicializar chips
document.addEventListener('DOMContentLoaded', function() {
    const chipsContainer = document.getElementById('temas-chips-container');
    const chipsInput = document.getElementById('temas-input');
    const temasHidden = document.getElementById('temas');
    
    function addTema(tema) {
        tema = tema.trim();
        if (tema && !window.temasArray.includes(tema)) {
            window.temasArray.push(tema);
            window.updateTemasHidden();
            window.renderChips();
        }
    }
    
    if (chipsInput && chipsContainer && temasHidden) {
        chipsInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ',' || e.key === 'Tab') {
                e.preventDefault();
                const valor = chipsInput.value.replace(/,/g, '').trim();
                if (valor) {
                    addTema(valor);
                    chipsInput.value = '';
                }
            } else if (e.key === 'Backspace' && chipsInput.value === '') {
                window.temasArray.pop();
                window.updateTemasHidden();
                window.renderChips();
            }
        });
    }
    
    // Inicializar si hay valor inicial
    if (temasHidden && temasHidden.value) {
        window.temasArray = temasHidden.value.split(',').map(t => t.trim()).filter(Boolean);
        window.renderChips();
    }
});


// Elementos del DOM
///const modalLibro = new bootstrap.Modal(document.getElementById('modalLibro'));
const formLibro = document.getElementById('form-libro');
const contenedorResultados = document.getElementById('contenedor-resultados');
const inputBusqueda = document.querySelector('input[type="text"]');
const selectCatalogo = document.querySelector('select:first-of-type');
const btnIr = document.querySelector('.btn-primary[type="submit"]');

// Funciones para el modal
/*window.abrirModalAgregar = function() {
    const modalTitulo = document.getElementById('modalLibroLabel');
    formLibro.reset();
    formLibro.archivo.disabled = false;
    modalTitulo.textContent = 'Agregar Nuevo Libro';
    formLibro.dataset.modo = 'agregar';
    modalLibro.show();
};*/
window.abrirModalAgregar = function() {
    // 1. Obtener referencias a los elementos con verificaciones
    ///const modalTitulo = document.getElementById('modalLibroLabel');
    const modalTitulo = document.getElementById('modal-titulo');
    const formLibro = document.getElementById('form-libro');
    
    // Verificar que los elementos existen
    if (!modalTitulo || !formLibro) {
        console.error('Error: Elementos del modal no encontrados');
        console.log('Elementos buscados:', {
            modalTitulo: !!modalTitulo,
            formLibro: !!formLibro
        });
        return;
    }

    // 2. Obtener referencia al input archivo con verificación
    const archivoInput = formLibro.querySelector('[name="archivo"]');
    if (!archivoInput) {
        console.error('Error: Input archivo no encontrado en el formulario');
        return;
    }

    // 3. Configurar el modal
    try {
        modalTitulo.textContent = 'Agregar Nuevo Libro';
        formLibro.reset();
        archivoInput.disabled = false;
        formLibro.dataset.modo = 'agregar';
        
        // 4. Mostrar el modal (usando Bootstrap 5)
        const modalElement = document.getElementById('modal-libro');
        if (modalElement) {
            const modal = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
            modal.show();
        } else {
            console.error('Error: Elemento modal no encontrado');
        }
    } catch (error) {
        console.error('Error al abrir modal de agregar:', error);
        alert('Ocurrió un error al preparar el formulario');
    }
};

/*window.abrirModalEditarLibro = function(idLibro) {
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
};*/

window.abrirModalEditarLibro = function(idLibro) {
    // Verificar que los elementos del modal existen primero
    const modal = document.getElementById('modal-libro');
    const modalTitulo = document.getElementById('modal-titulo');
    const form = document.getElementById('form-libro');
    const archivoInput = form ? form.querySelector('[name="archivo"]') : null;

    if (!modal || !modalTitulo || !form || !archivoInput) {
        console.error('Elementos del modal no encontrados');
        return;
    }

    fetch('/classes/services/library/listFileService.php')
        .then(response => response.json())
        .then(data => {
            if (!data.success || !Array.isArray(data.libros)) {
                throw new Error('Datos de libros no válidos');
            }

            const libro = data.libros.find(l => l.id === idLibro);
            if (!libro) {
                throw new Error('Libro no encontrado');
            }

            // Configurar el modal con los datos del libro
            modalTitulo.textContent = 'Editar Libro';
            form.titulo.value = libro.titulo || '';
            form.autor.value = libro.autor || '';
            
            // Configurar temas (chips)
            if (window.temasArray && libro.temas) {
                window.temasArray = libro.temas.split(',').map(t => t.trim()).filter(Boolean);
                if (window.updateTemasHidden) window.updateTemasHidden();
                if (window.renderChips) window.renderChips();
            }
            
            // Configurar archivo
            archivoInput.disabled = true;
            document.getElementById('archivo-help').style.display = 'none';
            document.getElementById('archivo-edit-help').style.display = 'block';
            
            // Configurar modo edición
            form.dataset.modo = 'editar';
            form.dataset.libroId = libro.id;
            
            // Mostrar el modal (usando Bootstrap)
            const bootstrapModal = new bootstrap.Modal(modal);
            bootstrapModal.show();
        })
        .catch(error => {
            console.error('Error al cargar libro para edición:', error);
            alert('Error al cargar los datos del libro: ' + error.message);
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
//--------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------

function mostrarLibrosPaginados() {
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
     <!-- <a href="http://localhost:8000/api/visualizarPdf.php?archivo=${libro.archivo}" -->
         <a href="http://localhost:3000/public/api/library/get/book/"
         target="_blank" 
         class="btn btn-sm btn-primary d-flex flex-column align-items-center"
         style="width: 80px; height: 80px; padding: 10px;">
         <unah-view-file></unah-view-file>
         <i class="bi bi-file-earmark-pdf" style="font-size: 1.5rem;"></i>
         <span class="mt-1" style="font-size: 0.7rem;">Ver PDF</span>
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
    
    contenedorResultados.innerHTML = html || '<div class="alert alert-info">No se encontraron resultados.</div>';
    
    // Actualizar paginación
   /// document.getElementById('pagina-actual').textContent = paginaActual;
   /// document.querySelector('.page-item:first-child .page-link').disabled = paginaActual === 1;
   /// document.querySelector('.page-item:last-child .page-link').disabled = paginaActual === totalPaginas;
   // Con esto:
const btnAnterior = document.querySelector('#paginacion button:first-child');
const btnSiguiente = document.querySelector('#paginacion button:last-child');

if (btnAnterior) btnAnterior.disabled = paginaActual === 1;
if (btnSiguiente) btnSiguiente.disabled = paginaActual === totalPaginas;
}

// Manejo del formulario
formLibro.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(formLibro);
    ////const id = formData.get('id').trim();
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