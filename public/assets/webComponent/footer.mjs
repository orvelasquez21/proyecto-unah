class unahFooter extends HTMLElement {

  connectedCallback() {
    this.displayFooter();
  }

  displayFooter() {
    let html = `<footer class="bg-dark text-white py-5">
        <div class="container">
            <div class="row">
                <div class="col-lg-4">
                    <img src="../../assets/img/logo-unah-blanco.png" alt="UNAH" height="50" class="mb-3">
                    <p>Universidad Nacional Autónoma de Honduras</p>
                    <p>Ciudad Universitaria, Tegucigalpa</p>
                </div>
                <div class="col-lg-4">
                    <h5>Contacto</h5>
                    <ul class="list-unstyled">
                        <li><i class="bi bi-telephone"></i> +504 2216-6100</li>
                        <li><i class="bi bi-envelope"></i> admisiones@unah.edu.hn</li>
                        <li><i class="bi bi-clock"></i> Lunes a Viernes: 8:00 AM - 4:00 PM</li>
                    </ul>
                </div>
                <div class="col-lg-4">
                    <h5>Enlaces Rápidos</h5>
                    <ul class="list-unstyled">
                        <li><a href="#" class="text-white">Oferta Académica</a></li>
                        <li><a href="#" class="text-white">Becas y Ayudas</a></li>
                        <li><a href="#" class="text-white">Preguntas Frecuentes</a></li>
                    </ul>
                </div>
            </div>
            <hr>
            <div class="text-center">
                <p class="mb-0">&copy; 2025 UNAH. Todos los derechos reservados.</p>
            </div>
        </div>
    </footer>`


    this.innerHTML = html;

  }

 

}
export {
  unahFooter
}