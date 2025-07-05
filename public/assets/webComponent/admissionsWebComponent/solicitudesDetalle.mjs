
class unahSolicitudesDetalle extends HTMLElement {


    connectedCallback (){
        this.displaySolicitudesDetalle();
    }

    displaySolicitudesDetalle(){
        let html = `<section id="detalle-solicitud" class="mb-4" style="display: none;">
        <h2>Revisión de Solicitud de Admisión (<span id="solicitud-id-display"></span>)</h2>
        <div class="card p-4 shadow-sm">
          <div class="row">
            <div class="col-lg-6 mb-4 mb-lg-0">
              <h4>Datos del Estudiante</h4>
              <hr>
              <form>
                <div class="mb-3">
                  <label for="nombreEstudiante" class="form-label fw-bold">Nombre:</label>
                  <input type="text" class="form-control" id="nombreEstudiante" value="Ana Sofía" readonly>
                </div>
                <div class="mb-3">
                  <label for="apellidosEstudiante" class="form-label fw-bold">Apellidos:</label>
                  <input type="text" class="form-control" id="apellidosEstudiante" value="Martínez López" readonly>
                </div>
                <div class="mb-3">
                  <label for="identidadEstudiante" class="form-label fw-bold">Identidad:</label>
                  <input type="text" class="form-control" id="identidadEstudiante" value="0801-2005-12345" readonly>
                </div>
                <div class="mb-3">
                  <label for="telefonoEstudiante" class="form-label fw-bold">Teléfono:</label>
                  <input type="text" class="form-control" id="telefonoEstudiante" value="+504 9988-7766" readonly>
                </div>
                <div class="mb-3">
                  <label for="correoEstudiante" class="form-label fw-bold">Correo Personal:</label>
                  <input type="email" class="form-control" id="correoEstudiante" value="ana.martinez@example.com"
                    readonly>
                </div>
                <div class="mb-3">
                  <label for="centroRegional" class="form-label fw-bold">Centro Regional:</label>
                  <input type="text" class="form-control" id="centroRegional" value="Valle de Sula" readonly>
                </div>
                <div class="mb-3">
                  <label for="carreraPrincipal" class="form-label fw-bold">Carrera Principal:</label>
                  <input type="text" class="form-control" id="carreraPrincipal" value="Medicina" readonly>
                </div>
                <div class="mb-3">
                  <label for="carreraSecundaria" class="form-label fw-bold">Carrera Secundaria:</label>
                  <input type="text" class="form-control" id="carreraSecundaria" value="Ninguna" readonly>
                </div>
              </form>
            </div>

            <div class="col-lg-6">
              <h4>Certificado de Secundaria</h4>
              <hr>
              <div class="border border-primary rounded p-3 mb-3 text-center bg-light">
                <p class="text-muted mb-2">Previsualización del Certificado</p>
                <img src="https://via.placeholder.com/400x300?text=Certificado+de+Secundaria"
                  alt="Certificado de Secundaria" class="img-fluid rounded shadow-sm" style="max-height: 350px;">
                <div class="mt-3">
                  <button class="btn btn-outline-primary btn-sm"><i class="bi bi-download me-1"></i> Descargar
                    Certificado</button>
                </div>
              </div>
              <p class="small text-muted text-center">
                Tipo de Archivo: <span class="fw-bold" id="cert-tipo">JPG</span> |
                Tamaño: <span class="fw-bold" id="cert-tamano">1.8 MB</span> |
                Dimensión: <span class="fw-bold" id="cert-dimension">2500x1800 px</span>
              </p>

              <h5 class="mt-4">Validación del Certificado</h5>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="docLegible">
                <label class="form-check-label" for="docLegible">
                  Documento Legible
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="dimensionesValidas">
                <label class="form-check-label" for="dimensionesValidas">
                  Dimensiones y Peso Válidos
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="formatoCorrecto">
                <label class="form-check-label" for="formatoCorrecto">
                  Formato de Archivo Correcto (JPG, PNG, PDF)
                </label>
              </div>
              <div class="form-check mb-3">
                <input class="form-check-input" type="checkbox" id="contenidoAdecuado">
                <label class="form-check-label" for="contenidoAdecuado">
                  Contenido Relevante y Completo
                </label>
              </div>

              <h5 class="mt-4">Decisión del Revisor</h5>
              <div class="form-check">
                <input class="form-check-input" type="radio" name="decisionRevisor" id="aprobarSolicitud"
                  value="aprobado">
                <label class="form-check-label text-success fw-bold" for="aprobarSolicitud">
                  Aprobar Solicitud
                </label>
              </div>
              <div class="form-check mb-3">
                <input class="form-check-input" type="radio" name="decisionRevisor" id="rechazarSolicitud"
                  value="rechazado">
                <label class="form-check-label text-danger fw-bold" for="rechazarSolicitud">
                  Rechazar Solicitud
                </label>
              </div>
              <div class="mb-3">
                <label for="observacionesRechazo" class="form-label">Observaciones/Motivo de Rechazo (Opcional):</label>
                <textarea class="form-control" id="observacionesRechazo" rows="3"
                  placeholder="Escribe el motivo del rechazo..." disabled></textarea>
              </div>

              <div class="d-flex justify-content-end mt-4">
                <button class="btn btn-secondary me-2" id="btnVolverSolicitudes">Volver a Solicitudes</button>
                <button class="btn btn-success" id="btnGuardarDecision">Guardar Decisión</button>
              </div>
            </div>
          </div>
        </div>
      </section>`

         this.innerHTML = html;
    }
}
export{
    unahSolicitudesDetalle
}