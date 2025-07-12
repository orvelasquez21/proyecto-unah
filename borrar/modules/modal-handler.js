import { guardarLibro, editarLibro } from './book-manager.js';

let modalLibro;

export function initializeModal() {
    modalLibro = new bootstrap.Modal(document.getElementById('modal-libro'));
    const formLibro = document.getElementById('form-libro');
    
    if (formLibro) {
        formLibro.addEventListener('submit', function(e) {
            e.preventDefault();
            const modo = this.dataset.modo || 'agregar';
            
            // Validaciones básicas
            const titulo = this.titulo.value.trim();
            const autor = this.autor.value.trim();
            const temas = this.temas.value.trim();
            
            if (titulo.length < 5 || titulo.length > 70) {
                alert('El título debe tener entre 5 y 70 caracteres.');
                return;
            }
            
            const palabras = autor.split(/\s+/);
            if (palabras.length < 2) {
                alert('El autor debe tener al menos un nombre y un apellido.');
                return;
            }
            
            const temasRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+(\s*,\s*[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+)*$/;
            if (!temasRegex.test(temas)) {
                alert('Los temas deben contener solo letras y espacios, separados por comas.');
                return;
            }
            
            if (modo === 'editar') {
                editarLibro(new FormData(this));
            } else {
                guardarLibro(new FormData(this));
            }
        });
    }
}

export function abrirModalAgregar() {
    const form = document.getElementById('form-libro');
    if (!form) {
        console.error('Error: Formulario no encontrado');
        return;
    }

    const modalTitulo = document.getElementById('modal-titulo');
    modalTitulo.textContent = 'Agregar Nuevo Libro';
    form.reset();
    form.archivo.disabled = false;
    document.getElementById('archivo-help').style.display = 'block';
    document.getElementById('archivo-edit-help').style.display = 'none';
    form.dataset.modo = 'agregar';
    
    modalLibro.show();
}

export function abrirModalEditarLibro(idLibro) {
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

            const form = document.getElementById('form-libro');
            const modalTitulo = document.getElementById('modal-titulo');
            modalTitulo.textContent = 'Editar Libro';
            
            form.titulo.value = libro.titulo || '';
            form.autor.value = libro.autor || '';
            
            // Configurar temas (chips)
            if (window.temasArray) {
                window.temasArray = libro.temas.split(',').map(t => t.trim()).filter(Boolean);
                if (window.updateTemasHidden) window.updateTemasHidden();
                if (window.renderChips) window.renderChips();
            }
            
            // Configurar archivo
            form.archivo.disabled = true;
            document.getElementById('archivo-help').style.display = 'none';
            document.getElementById('archivo-edit-help').style.display = 'block';
            
            // Configurar modo edición
            form.dataset.modo = 'editar';
            form.dataset.libroId = libro.id;
            
            modalLibro.show();
        })
        .catch(error => {
            console.error('Error al cargar libro para edición:', error);
            alert('Error al cargar los datos del libro: ' + error.message);
        });
}

export function cerrarModal() {
    modalLibro.hide();
}