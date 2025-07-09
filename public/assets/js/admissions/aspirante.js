/*document.addEventListener('DOMContentLoaded', function () {
    const nacionalidadSelect = document.getElementById('modalNacionalidad');
    const identidadContainer = document.getElementById('modalIdentidadContainer');
    const pasaporteContainer = document.getElementById('modalPasaporteContainer');
    const documentoIdentidadContainer = document.getElementById('modalDocumentoIdentidadContainer');
    const pasaporteDocumentoContainer = document.getElementById('modalPasaporteDocumentoContainer');
    const apostillaContainer = document.getElementById('modalApostillaContainer');
    const enviarBtn = document.getElementById('modalEnviarSolicitud');

    // Manejar cambio de nacionalidad
   nacionalidadSelect.addEventListener('change', function () {
        if (this.value === 'EX') {
            pasaporteContainer.style.display = 'block';
            pasaporteDocumentoContainer.style.display = 'block';
            apostillaContainer.style.display = 'block';
            documentoIdentidadContainer.style.display = 'none';

            // Actualizar requeridos
            document.getElementById('modalIdentidad').required = false;
            document.getElementById('modalDocumentoIdentidad').required = false;
            document.getElementById('modalPasaporte').required = true;
            document.getElementById('modalPasaporteDocumento').required = true;
        } else {
            pasaporteContainer.style.display = 'none';
            pasaporteDocumentoContainer.style.display = 'none';
            apostillaContainer.style.display = 'none';
            documentoIdentidadContainer.style.display = 'block';

            // Restaurar requeridos
            document.getElementById('modalIdentidad').required = true;
            document.getElementById('modalDocumentoIdentidad').required = true;
            document.getElementById('modalPasaporte').required = false;
            document.getElementById('modalPasaporteDocumento').required = false;
        }
    });

    // Manejar envío del formulario
    enviarBtn.addEventListener('click', function () {
        console.log("entro en btns.accions?? 177");
        const form = document.getElementById('formularioAdmisionModal');
        if (form.checkValidity()) {
            // Aquí iría la lógica para enviar el formulario
            alert('Solicitud enviada con éxito. Será revisada por el personal correspondiente.');
            // Cerrar el modal después de enviar
            const modal = bootstrap.Modal.getInstance(document.getElementById('solicitudModal'));
            modal.hide();
        } else {
            form.reportValidity();
        }
    });
});*/
