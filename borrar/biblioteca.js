// Variables globales para paginación
let libros = [];
let librosFiltrados = [];
let paginaActual = 1;
const resultadosPorPagina = 4; // Mostrar solo 4 libros por página
let seHaBuscado = false;

// Funciones para el modal de la biblioteca (scope global)
window.abrirModalAgregar = function() {
    const modal = document.getElementById('modal-libro');
    const modalTitulo = document.getElementById('modal-titulo');
    const form = document.getElementById('form-libro');
    
    // Configurar el modal para agregar
    modalTitulo.textContent = 'Agregar Nuevo Libro';
    form.reset(); // Limpiar el formulario
    // Habilitar campo archivo
    form.archivo.disabled = false;
    // Mostrar/ocultar texto aclaratorio
    const archivoHelp = document.getElementById('archivo-help');
    if (archivoHelp) archivoHelp.style.display = 'block';
    const archivoEditHelp = document.getElementById('archivo-edit-help');
    if (archivoEditHelp) archivoEditHelp.style.display = 'none';
    // Limpiar chips de temas
    if (window.temasArray) {
        window.temasArray = [];
        if (window.updateTemasHidden) window.updateTemasHidden();
        if (window.renderChips) window.renderChips();
    }
    // Marcar como modo agregar
    form.dataset.modo = 'agregar';
    // Mostrar el modal
    modal.classList.remove('modal-oculto');
};

window.abrirModalEditar = function() {
    const modal = document.getElementById('modal-libro');
    const modalTitulo = document.getElementById('modal-titulo');
    const form = document.getElementById('form-libro');
    
    // Configurar el modal para editar
    modalTitulo.textContent = 'Editar Libro';
    
    // Aquí podrías cargar los datos del libro seleccionado desde el servidor
    // Por ahora usamos datos de ejemplo (sin el archivo)
    form.titulo.value = 'Título de Ejemplo';
    form.autor.value = 'Juan A. Pérez';
    
    // Cargar temas de ejemplo
    if (window.temasArray) {
        window.temasArray = ['Tema1', 'Tema2'];
        if (window.updateTemasHidden) window.updateTemasHidden();
        if (window.renderChips) window.renderChips();
    }
    
    // Marcar como modo editar
    form.dataset.modo = 'editar';
    // Mostrar el modal
    modal.classList.remove('modal-oculto');
};

window.cerrarModal = function() {
    const modal = document.getElementById('modal-libro');
    if (modal) {
        modal.classList.add('modal-oculto');
    }
};

window.eliminarLibro = function(idLibro) {
    if (confirm('¿Estás seguro de que deseas eliminar este libro?')) {
        // Enviar petición para eliminar el libro
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
                alert('Libro eliminado exitosamente: ' + data.message);
                // Aquí podrías recargar la lista de libros
                console.log('Libro eliminado:', data.libro_eliminado);
                cargarLibros(); // Actualizar la lista automáticamente
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

window.probarServidor = function() {
    console.log('Probando conexión con el servidor...');
    fetch('/classes/services/biblioteca/test.php')
        .then(response => {
            console.log('Respuesta de prueba:', response);
            return response.json();
        })
        .then(data => {
            console.log('Datos de prueba:', data);
            alert('Servidor funcionando: ' + data.message);
        })
        .catch(error => {
            console.error('Error en prueba:', error);
            alert('Error de conexión: ' + error.message);
        });
};

// Evento para cerrar el modal al hacer clic fuera de él
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('modal-libro');
    
    // Asegurar que el modal esté oculto al cargar la página
    if (modal) {
        modal.classList.add('modal-oculto');
        
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                cerrarModal();
            }
        });
    }
    
    // Manejar el envío del formulario
    const formLibro = document.getElementById('form-libro');
    if (formLibro) {
        formLibro.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obtener los datos del formulario
            const formData = new FormData(formLibro);
            const titulo = formData.get('titulo').trim();
            const autor = formData.get('autor').trim();
            const temas = formData.get('temas').trim();
            const archivo = formData.get('archivo');
            const modo = formLibro.dataset.modo || 'agregar';
            
            // Validar título
            if (titulo.length < 5 || titulo.length > 70) {
                alert('El título debe tener entre 5 y 70 caracteres.');
                return;
            }
            
            // Validar autor con validación paso a paso
            const palabras = autor.split(/\s+/);
            
            // Verificar que haya al menos 2 palabras (nombre y apellido)
            if (palabras.length < 2) {
                alert('El autor debe tener al menos un nombre y un apellido.');
                return;
            }
            
            // Validar cada palabra
            for (let palabra of palabras) {
                // Verificar que empiece con mayúscula
                if (!/^[A-ZÁÉÍÓÚÑ]/.test(palabra)) {
                    alert('Cada palabra debe empezar con mayúscula.');
                    return;
                }
                
                // Verificar que solo contenga letras y un punto al final (no en medio)
                if (!/^[A-ZÁÉÍÓÚÑ][a-záéíóúñ]*\.?$/.test(palabra)) {
                    alert('Las palabras solo pueden contener letras y un punto al final para iniciales.');
                    return;
                }
                
                // Verificar que no haya puntos en medio de la palabra
                if (palabra.includes('.') && !palabra.endsWith('.')) {
                    alert('Los puntos solo pueden estar al final de las palabras (ej: A. en lugar de Sofía.)');
                    return;
                }
                
                // Verificar que las iniciales (letras solas) tengan punto
                if (palabra.length === 1 && !palabra.endsWith('.')) {
                    alert('Las iniciales (letras solas) deben terminar con punto (ej: A. en lugar de A)');
                    return;
                }
            }
            
            // Validar temas con expresión regular
            const temasRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+(\s*,\s*[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+)*$/;
            if (!temasRegex.test(temas)) {
                alert('Los temas deben contener solo letras y espacios, separados por comas.');
                return;
            }
            
            // Validar archivo solo en modo agregar
            if (modo === 'agregar') {
                if (!archivo || archivo.size === 0) {
                    alert('Por favor, selecciona un archivo para subir.');
                    return;
                }
                
                // Validar el tipo de archivo - solo PDF
                if (archivo.type !== 'application/pdf') {
                    alert('Por favor, selecciona solo archivos PDF.');
                    return;
                }
                
                // Validar también la extensión del archivo
                const extension = archivo.name.split('.').pop().toLowerCase();
                if (extension !== 'pdf') {
                    alert('Por favor, selecciona solo archivos con extensión .pdf');
                    return;
                }
            }
            
            // Crear FormData para enviar al servidor
            const formDataToSend = new FormData();
            formDataToSend.append('titulo', titulo);
            formDataToSend.append('autor', autor);
            formDataToSend.append('temas', temas);
            formDataToSend.append('modo', modo);
            
            // Agregar ID del libro si es modo editar
            if (modo === 'editar') {
                const libroId = formLibro.dataset.libroId;
                if (libroId) {
                    formDataToSend.append('id', libroId);
                }
            }
            
            // Agregar archivo solo si es modo agregar
            if (modo === 'agregar' && archivo) {
                formDataToSend.append('archivo', archivo);
            }
            
            // Determinar endpoint según el modo
            const endpoint = modo === 'editar' ? '/classes/services/library/editFileService.php' : '/classes/services/library/saveFileService.php';
            
            // Enviar datos al servidor
            console.log('Enviando datos al servidor...', modo);
            fetch(endpoint, {
                method: 'POST',
                body: formDataToSend
            })
            .then(async response => {
                let data;
                try {
                    data = await response.json();
                } catch (e) {
                    throw new Error('Respuesta no es JSON: ' + await response.text());
                }
                if (!response.ok) {
                    // Mostrar el error detallado del backend
                    throw new Error(data.error || JSON.stringify(data));
                }
                return data;
            })
            .then(data => {
                const mensaje = modo === 'editar' ? 'Libro editado exitosamente' : 'Libro guardado exitosamente';
                alert(mensaje + ': ' + data.message);
                console.log('Libro procesado:', data.libro);
                cargarLibros(); // Actualizar la lista automáticamente
                cerrarModal(); // Cerrar el modal después de guardar
            })
            .catch(error => {
                console.error('Error detallado:', error);
                alert('Error al procesar el libro: ' + error.message);
            });
        });
    }

    // --- Chips de Temas ---
    const chipsContainer = document.getElementById('temas-chips-container');
    const chipsInput = document.getElementById('temas-input');
    const temasHidden = document.getElementById('temas');
    window.temasArray = [];

    window.renderChips = function() {
        // Elimina todos los chips menos el input
        chipsContainer.querySelectorAll('.chip-tema').forEach(chip => chip.remove());
        window.temasArray.forEach((tema, idx) => {
            const chip = document.createElement('span');
            chip.className = 'chip-tema';
            chip.style.cssText = 'background:#e0e0e0; border-radius:16px; padding:2px 8px; display:inline-flex; align-items:center; margin-right:4px; margin-bottom:2px;';
            chip.textContent = tema;
            // Botón eliminar
            const closeBtn = document.createElement('button');
            closeBtn.type = 'button';
            closeBtn.textContent = '×';
            closeBtn.style.cssText = 'background:none; border:none; color:#d90429; font-size:16px; margin-left:4px; cursor:pointer;';
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
        temasHidden.value = window.temasArray.join(', ');
    };

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
                // Eliminar el último tema si el input está vacío
                window.temasArray.pop();
                window.updateTemasHidden();
                window.renderChips();
            }
        });
    }

    // Inicializar si hay valor inicial (por ejemplo, al editar)
    if (temasHidden && temasHidden.value) {
        window.temasArray = temasHidden.value.split(',').map(t => t.trim()).filter(Boolean);
        window.renderChips();
    }
});

// Función para cargar y renderizar la lista de libros
window.cargarLibros = function() {
    fetch('/classes/services/library/listFileService.php')
     //fetch('/api/visualizarPdf.php')
        .then(response => response.json())
        .then(data => {
            if (data.success && Array.isArray(data.libros)) {
                libros = data.libros;
                if (data.libros.length === 0) {
                    document.getElementById('contenedor-resultados').innerHTML = '<div class="text-muted">No hay libros registrados.</div>';
                } else {
                    // Mostrar todos los libros sin búsqueda
                    seHaBuscado = true;
                    librosFiltrados = [...libros];
                    paginaActual = 1;
                    mostrarLibrosPaginados();
                }
            } else {
                document.getElementById('contenedor-resultados').innerHTML = '<div class="text-danger">No se pudieron cargar los libros.</div>';
            }
        })
        .catch(error => {
            document.getElementById('contenedor-resultados').innerHTML = '<div class="text-danger">Error al cargar los libros.</div>';
            console.error('Error al cargar libros:', error);
        });
};

// Llamar a cargarLibros al cargar la página
window.addEventListener('DOMContentLoaded', function() {
    cargarLibros();
});

// Función para abrir el modal de edición con los datos del libro seleccionado
window.abrirModalEditarLibro = function(idLibro) {
    fetch('/classes/services/library/listFileService.php')
        .then(response => response.json())
        .then(data => {
            if (!data.success || !Array.isArray(data.libros)) return;
            const libro = data.libros.find(l => l.id === idLibro);
            if (!libro) return;
            // Llenar el modal con los datos del libro
            const modal = document.getElementById('modal-libro');
            const modalTitulo = document.getElementById('modal-titulo');
            const form = document.getElementById('form-libro');
            modalTitulo.textContent = 'Editar Libro';
            form.titulo.value = libro.titulo;
            form.autor.value = libro.autor;
            // Guardar el ID del libro para la edición
            form.dataset.libroId = libro.id;
            // Temas (chips)
            if (window.temasArray) {
                window.temasArray = libro.temas.split(',').map(t => t.trim()).filter(Boolean);
                if (window.updateTemasHidden) window.updateTemasHidden();
                if (window.renderChips) window.renderChips();
            }
            // Deshabilitar campo archivo
            form.archivo.disabled = true;
            // Mostrar/ocultar texto aclaratorio
            const archivoHelp = document.getElementById('archivo-help');
            if (archivoHelp) archivoHelp.style.display = 'none';
            const archivoEditHelp = document.getElementById('archivo-edit-help');
            if (archivoEditHelp) archivoEditHelp.style.display = 'block';
            // Limpiar archivo (no se puede editar el archivo en HTML por seguridad)
            form.archivo.value = '';
            // Marcar como modo editar
            form.dataset.modo = 'editar';
            // Mostrar el modal
            modal.classList.remove('modal-oculto');
        });
};

// Función para cargar y renderizar la lista de libros filtrados por búsqueda
window.buscarLibros = function() {
    const inputBusqueda = document.getElementById('busqueda');
    const selectFiltro = document.getElementById('catalogo');
    const termino = (inputBusqueda ? inputBusqueda.value.trim().toLowerCase() : '');
    const filtro = (selectFiltro ? selectFiltro.value.toLowerCase() : '');
    
    // Cargar todos los libros si no se han cargado aún
    if (libros.length === 0) {
        fetch('/classes/services/library/listFileService.php')
            .then(response => response.json())
            .then(data => {
                if (data.success && Array.isArray(data.libros)) {
                    libros = data.libros;
                    procesarBusqueda(termino, filtro);
                } else {
                    document.getElementById('contenedor-resultados').innerHTML = '<div class="text-danger">No se pudieron cargar los libros.</div>';
                }
            })
            .catch(error => {
                document.getElementById('contenedor-resultados').innerHTML = '<div class="text-danger">Error al cargar libros.</div>';
                console.error('Error al cargar libros:', error);
            });
    } else {
        procesarBusqueda(termino, filtro);
    }
};

function procesarBusqueda(termino, filtro) {
    seHaBuscado = true;
    paginaActual = 1;
    
    // Filtrar libros por término de búsqueda y filtro seleccionado
    if (termino) {
        librosFiltrados = libros.filter(libro => {
            if (filtro === 'autor') {
                return libro.autor.toLowerCase().includes(termino);
            } else if (filtro === 'tema') {
                return libro.temas.toLowerCase().includes(termino);
            } else if (filtro === 'catálogo de biblioteca' || filtro === '' || filtro === 'todos') {
                // Búsqueda general
                return (
                    libro.titulo.toLowerCase().includes(termino) ||
                    libro.autor.toLowerCase().includes(termino) ||
                    libro.temas.toLowerCase().includes(termino)
                );
            } else {
                // Por defecto, búsqueda general
                return (
                    libro.titulo.toLowerCase().includes(termino) ||
                    libro.autor.toLowerCase().includes(termino) ||
                    libro.temas.toLowerCase().includes(termino)
                );
            }
        });
    } else {
        // Si no hay término de búsqueda, mostrar todos los libros
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
    const contenedor = document.getElementById('contenedor-resultados');
    const paginacion = document.getElementById('paginacion');
    const paginaActualSpan = document.getElementById('pagina-actual');
    
    if (!seHaBuscado || librosFiltrados.length === 0) {
        contenedor.innerHTML = '<div class="text-muted">Utiliza la barra de búsqueda para ver resultados.</div>';
        paginacion.style.display = 'none';
        return;
    }
    
    // Calcular paginación
    const totalPaginas = Math.ceil(librosFiltrados.length / resultadosPorPagina);
    if (paginaActual > totalPaginas) paginaActual = 1;
    
    const inicio = (paginaActual - 1) * resultadosPorPagina;
    const fin = inicio + resultadosPorPagina;
    const librosPagina = librosFiltrados.slice(inicio, fin);
    
    // Renderizar libros de la página actual
    let html = '<ul class="list-group">';
    librosPagina.forEach(libro => {
        html += `
        <li class="list-group-item d-flex justify-content-between align-items-start flex-wrap">
            <div style="flex:1; min-width:200px;">
                <div><strong><a href="http://localhost:8000/api/visualizarPdf.php?archivo=${libro.archivo}" target="_blank" class="text-decoration-none text-primary">${libro.titulo}</a></strong></div>
                <div><span class="text-secondary">Autor:</span> ${libro.autor}</div>
                <div><span class="text-secondary">Temas:</span> ${libro.temas}</div>
            </div>
            <div class="acciones-libro d-flex gap-2">
                <button class="btn btn-sm btn-primary" onclick="abrirModalEditarLibro('${libro.id}')">Editar</button>
                <button class="btn btn-sm btn-danger" onclick="eliminarLibro('${libro.id}')">Eliminar</button>
            </div>
        </li>`;
    });
    html += '</ul>';
    contenedor.innerHTML = html;
    
    // Actualizar controles de paginación
    if (paginaActualSpan) {
        paginaActualSpan.textContent = paginaActual;
    }
    
    // Mostrar/ocultar botones de paginación
    const btnAnterior = paginacion.querySelector('button:first-child');
    const btnSiguiente = paginacion.querySelector('button:last-child');
    
    if (btnAnterior) {
        btnAnterior.disabled = paginaActual === 1;
    }
    if (btnSiguiente) {
        btnSiguiente.disabled = paginaActual === totalPaginas;
    }
    
    // Mostrar información de paginación
    if (totalPaginas > 1) {
        paginacion.style.display = 'flex';
        // Agregar información de páginas si no existe
        if (!paginacion.querySelector('.info-paginas')) {
            const infoPaginas = document.createElement('span');
            infoPaginas.className = 'info-paginas mx-2';
            infoPaginas.textContent = `Página ${paginaActual} de ${totalPaginas} (${librosFiltrados.length} libros)`;
            paginacion.insertBefore(infoPaginas, btnSiguiente);
        } else {
            paginacion.querySelector('.info-paginas').textContent = `Página ${paginaActual} de ${totalPaginas} (${librosFiltrados.length} libros)`;
        }
    } else {
        paginacion.style.display = 'none';
    }
}

// Al cargar la página, cargar todos los libros
window.addEventListener('DOMContentLoaded', function() {
    // Cargar todos los libros al inicio
    cargarLibros();
    
    // Asignar evento al botón "Ir"
    const btnIr = document.querySelector('.buscador-btn');
    if (btnIr) {
        btnIr.addEventListener('click', function(e) {
            e.preventDefault();
            buscarLibros();
        });
    }
    
    // Asignar evento Enter al campo de búsqueda
    const inputBusqueda = document.getElementById('busqueda');
    if (inputBusqueda) {
        inputBusqueda.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                buscarLibros();
            }
        });
    }
});
