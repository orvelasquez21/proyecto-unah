class unahHeader extends HTMLElement {

  connectedCallback() {
    this.displayHeader();
  }

  displayHeader() {
    let html = `<header>
    <nav class="navbar bg-body-tertiary fixed-top">
      <div class="container-fluid">
        <a class="navbar-brand d-flex align-items-center" href="#">
          <img src="../../assets/img/unah_azul.png" alt="Logo UNAH" width="60" height="70" class="d-inline-block align-text-top me-2">
          <span class="fs-4 fw-bold">Admisiones UNAH</span>
        </a>
        <div class="d-flex align-items-center">
          <span class="me-3">Bienvenido, [Nombre Revisor]</span>
          <button class="btn btn-outline-secondary" type="button">Cerrar Sesión</button>
        </div>
      </div>
    </nav>
  </header>`


    this.innerHTML = html;

  }

 

}
export {
  unahHeader
}