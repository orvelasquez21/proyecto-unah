class unahLoging extends HTMLElement {

  connectedCallback() {
    this.displayLoging();
  }

  displayLoging() {
    let html = `<div class="modal fade" id="loginModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header bg-unah text-white">
                    <h5 class="modal-title">Acceso Empleados</h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="mb-3">
                            <label class="form-label">Usuario</label>
                            <input type="text" class="form-control" required>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Contraseña</label>
                            <input type="password" class="form-control" required>
                        </div>
                        <div class="d-grid">
                            <button type="submit" class="btn btn-unah">Ingresar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>`


    this.innerHTML = html;

  }

 

}
export {
  unahLoging
}