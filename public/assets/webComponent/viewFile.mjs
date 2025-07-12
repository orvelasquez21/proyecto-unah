class unahViewFile extends HTMLElement {

    connectedCallback() {
    this.displayUnahViewFile();
  }

  displayUnahViewFile() {
    let html = `<div class="modal fade " id="pdfModal" tabindex="-1" aria-labelledby="pdfModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl modal-dialog-centered modal-fullscreen">
      <div class="modal-content ">
        <div class="modal-header">
          <h5 class="modal-title" id="pdfModalLabel">Visor de PDF margaro</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
        </div>
        <div class="modal-body">
          <iframe src="/public/api/library/get/book/index.php" style="width:100%; height:100%; border:none;"></iframe>
        </div>
      </div>
    </div>
  </div>`


    this.innerHTML = html;

  }

 


}
export{
    unahViewFile
}