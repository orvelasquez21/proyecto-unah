


class unahSidebar extends HTMLElement {
    
   connectedCallback() {
    this.displayUnahSidebar();
   }

 displayUnahSidebar() {

  let html = `<aside class="sidebar border-end">
      <div class="list-group list-group-flush">
        <a href="#solicitudes-pendientes" class="list-group-item list-group-item-action active" aria-current="true">
          <i class="bi bi-person-lines-fill me-2"></i> Admisiones
        </a>
        <a href="#solicitudes-pendientes" class="list-group-item list-group-item-action ps-4">
          <i class="bi bi-clipboard-check me-2"></i> Solicitudes Pendientes
        </a>
        <a href="#" class="list-group-item list-group-item-action ps-4">
          <i class="bi bi-card-checklist me-2"></i> Solicitudes Revisadas
        </a>
        <a href="#" class="list-group-item list-group-item-action ps-4">
          <i class="bi bi-x-circle me-2"></i> Historial de Rechazos
        </a>
        <a href="#" class="list-group-item list-group-item-action mt-3">
          <i class="bi bi-gear me-2"></i> Configuración
        </a>
        <a href="#" class="list-group-item list-group-item-action">
          <i class="bi bi-info-circle me-2"></i> Ayuda
        </a>
      </div>
    </aside>`
    
  this.innerHTML = html;
  }
}

export {
    unahSidebar
}