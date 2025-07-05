
class unahPagination extends HTMLElement {

connectedCallback (){
    this.displayUnahPagination();
}

displayUnahPagination(){
let html =`<nav aria-label="Paginación de Solicitudes" class="mt-3">
            <ul class="pagination justify-content-center">
              <li class="page-item disabled"><a class="page-link" href="#" tabindex="-1"
                  aria-disabled="true">Anterior</a></li>
              <li class="page-item active"><a class="page-link" href="#">1</a></li>
              <li class="page-item"><a class="page-link" href="#">2</a></li>
              <li class="page-item"><a class="page-link" href="#">3</a></li>
              <li class="page-item"><a class="page-link" href="#">Siguiente</a></li>
            </ul>
          </nav>`

this.innerHTML = html;

}
}

export{
    unahPagination
}