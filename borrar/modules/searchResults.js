let libros = [];
let librosFiltrados = [];
let paginaActual = 1;
const resultadosPorPagina = 5;
let seHaBuscado = false;

// Cargar los libros desde el endpoint, pero NO mostrar nada aún
async function cargarLibros() {
  const res = await fetch('/api/library/get/book/listBooks.php');
  libros = await res.json();
}

// Mostrar resultados solo si se ha hecho una búsqueda
function mostrarLibros() {
  const contenedor = document.getElementById('libros-lista');
  const mensaje = document.getElementById('mensaje-no-resultados');
  const paginacion = document.getElementById('paginacion');
  contenedor.innerHTML = '';
  paginacion.innerHTML = '';

  if (!seHaBuscado) {
    mensaje.style.display = 'none';
    return;
  }

  if (librosFiltrados.length === 0) {
    mensaje.style.display = 'block';
    return;
  }
  mensaje.style.display = 'none';

  // Paginación
  const totalPaginas = Math.ceil(librosFiltrados.length / resultadosPorPagina);
  if (paginaActual > totalPaginas) paginaActual = 1;
  const inicio = (paginaActual - 1) * resultadosPorPagina;
  const fin = inicio + resultadosPorPagina;
  const librosPagina = librosFiltrados.slice(inicio, fin);

  librosPagina.forEach(libro => {
    const div = document.createElement('div');
    div.className = "d-flex justify-content-between align-items-center border p-3 mb-2 rounded";
    div.innerHTML = `
      <div>
        <div class="fw-bold fs-5">${libro.titulo}</div>
        <div class="text-muted">${libro.autor || ''}</div>
        <div>
          ${(libro.temas || []).map(t => `<span class="badge bg-secondary me-1">${t}</span>`).join('')}
        </div>
      </div>
      <div>
        <button class="btn btn-warning btn-sm me-2" onclick="editarLibro('${libro.archivo}')">Editar</button>
        <button class="btn btn-danger btn-sm" onclick="eliminarLibro('${libro.archivo}')">Eliminar</button>
      </div>
    `;
    contenedor.appendChild(div);
  });

  // Controles de paginación
  if (totalPaginas > 1) {
    let pagHTML = '';
    pagHTML += `<button class="btn btn-outline-primary btn-sm me-2" ${paginaActual === 1 ? 'disabled' : ''} onclick="cambiarPagina(${paginaActual - 1})">Anterior</button>`;
    for (let i = 1; i <= totalPaginas; i++) {
      pagHTML += `<button class="btn btn${i === paginaActual ? '' : '-outline'}-primary btn-sm me-1" onclick="cambiarPagina(${i})">${i}</button>`;
    }
    pagHTML += `<button class="btn btn-outline-primary btn-sm ms-2" ${paginaActual === totalPaginas ? 'disabled' : ''} onclick="cambiarPagina(${paginaActual + 1})">Siguiente</button>`;
    paginacion.innerHTML = pagHTML;
  }
}

function cambiarPagina(nuevaPagina) {
  paginaActual = nuevaPagina;
  mostrarLibros();
}

function buscarLibro() {
  const texto = document.getElementById('busqueda').value.toLowerCase();
  const campo = document.getElementById('catalogo').value;
  seHaBuscado = true;
  paginaActual = 1;
  librosFiltrados = libros.filter(libro => {
    if (campo === 'tema') {
      return (libro.temas || []).some(t => t.toLowerCase().includes(texto));
    }
    return libro[campo] && libro[campo].toLowerCase().includes(texto);
  });
  mostrarLibros();
}

// Ejemplo de funciones para editar/eliminar (puedes personalizarlas)
function editarLibro(archivo) {
  alert('Editar: ' + archivo);
}
function eliminarLibro(archivo) {
  alert('Eliminar: ' + archivo);
}

// Inicializar: solo carga los libros, no muestra nada
cargarLibros();