

class unahSolicitudesTable extends HTMLElement {


    connectedCallback() {
        this.displaySolicitudesTable();
    }

    displaySolicitudesTable() {
        let html = `<section id="solicitudes-pendientes" class="mb-4">
        <h2>Solicitudes de Admisión Pendientes</h2>
        <div class="card p-3 shadow-sm">
          <div class="d-flex flex-wrap align-items-center mb-3 gap-2">
            <input type="text" class="form-control flex-grow-1" style="max-width: 250px;"
              placeholder="Buscar por nombre o ID...">
            <select class="form-select flex-grow-1" style="max-width: 200px;">
              <option selected>Filtrar por Carrera</option>
              <option value="ingenieria">Ingeniería en Sistemas</option>
              <option value="medicina">Medicina</option>
              <option value="derecho">Derecho</option>
            </select>
            <input type="date" class="form-control flex-grow-1" style="max-width: 180px;">
            <button class="btn btn-outline-primary">Aplicar Filtros</button>
          </div>

          <div class="table-responsive">
            <table class="table table-striped table-hover align-middle">
              <thead>
                <tr>
                  <th scope="col">ID Solicitud</th>
                  <th scope="col">Nombre del Estudiante</th>
                  <th scope="col">Carrera Principal</th>
                  <th scope="col">Fecha de Envío</th>
                  <th scope="col">Estado</th>
                  <th scope="col">Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><span class="badge bg-info text-dark">UNAH-001</span></td>
                  <td>Ana Sofía Martínez</td>
                  <td>Medicina</td>
                  <td>2025-06-25</td>
                  <td><span class="badge bg-warning text-dark">Pendiente</span></td>
                  <td>
                    <button class="btn btn-primary btn-sm btn-revisar" data-solicitud-id="UNAH-001">Revisar</button>
                  </td>
                </tr>
                <tr>
                  <td><span class="badge bg-info text-dark">UNAH-002</span></td>
                  <td>Carlos David Orellana</td>
                  <td>Ingeniería Civil</td>
                  <td>2025-06-26</td>
                  <td><span class="badge bg-warning text-dark">Pendiente</span></td>
                  <td>
                    <button class="btn btn-primary btn-sm btn-revisar" data-solicitud-id="UNAH-002">Revisar</button>
                  </td>
                </tr>
                <tr>
                  <td><span class="badge bg-info text-dark">UNAH-003</span></td>
                  <td>Laura Elena Gómez</td>
                  <td>Derecho</td>
                  <td>2025-06-27</td>
                  <td><span class="badge bg-warning text-dark">Pendiente</span></td>
                  <td>
                    <button class="btn btn-primary btn-sm btn-revisar" data-solicitud-id="UNAH-003">Revisar</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <unah-pagination></unah-pagination>
        </div>
      </section>`

        this.innerHTML = html;
    }
}
export {
    unahSolicitudesTable
}