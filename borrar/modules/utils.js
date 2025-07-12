export function validarTitulo(titulo) {
    return titulo.length >= 5 && titulo.length <= 70;
}

export function validarAutor(autor) {
    const palabras = autor.split(/\s+/);
    return palabras.length >= 2;
}

export function validarTemas(temas) {
    const temasRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+(\s*,\s*[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+)*$/;
    return temasRegex.test(temas);
}

export function mostrarError(elemento, mensaje) {
    // Implementación para mostrar errores de validación
    if (!elemento) return;
    
    let errorElement = elemento.nextElementSibling;
    if (!errorElement || !errorElement.classList.contains('error-message')) {
        errorElement = document.createElement('div');
        errorElement.className = 'error-message text-danger';
        elemento.parentNode.insertBefore(errorElement, elemento.nextSibling);
    }
    
    errorElement.textContent = mensaje;
}

export function limpiarErrores() {
    document.querySelectorAll('.error-message').forEach(el => el.remove());
}