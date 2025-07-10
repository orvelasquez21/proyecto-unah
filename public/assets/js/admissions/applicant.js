/*document.addEventListener('DOMContentLoaded', function () {
    const nacionalidadSelect = document.getElementById('modalNacionalidad');
    const identidadContainer = document.getElementById('modalIdentidad');
    const pasaporteContainer = document.getElementById('modalPasaporteContainer');

    const enviarBtn = document.getElementById('modalEnviarSolicitud');

    // Manejar cambio de nacionalidad
   nacionalidadSelect.addEventListener('change', function () {
        if (this.value === 'EX') {
            pasaporteContainer.style.display = 'block';
            const inputs = identidadContainer.getElementById('input, select, textarea');
            inputs.forEach(input => input.disabled = true);
            //identidadContainer.element.disabled = true;
            //documentoIdentidadContainer.style.display = 'none';

            // Actualizar requeridos
            document.getElementById('modalIdentidad').required = false;
            document.getElementById('modalPasaporte').required = true;
            
        } else {
            pasaporteContainer.style.display = 'none';
            apostillaContainer.style.display = 'none';
           

            // Restaurar requeridos
            document.getElementById('modalIdentidad').required = true;
            document.getElementById('modalPasaporte').required = false;
            
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
});
*/

document.addEventListener('DOMContentLoaded', function() {
    const nacionalidadSelect = document.getElementById('modalNacionalidad');
    const identidadContainer = document.getElementById('modalIdentidadContainer');
    const pasaporteContainer = document.getElementById('modalPasaporteContainer');
    const pasaporteInput = document.getElementById('modalPasaporte');
    const identidadInput = document.getElementById('modalIdentidad');

    nacionalidadSelect.addEventListener('change', function() {
        // Ocultar/mostrar campos según la selección
        if (this.value === 'HN') { // Hondureña
            identidadContainer.style.display = 'block';
            pasaporteContainer.style.display = 'none';
            pasaporteInput.value = ''; // Limpiar campo
            identidadInput.required = true; // Hacer requerido
        } else if (this.value === 'EX') { // Extranjera
            identidadContainer.style.display = 'none';
            pasaporteContainer.style.display = 'block';
            identidadInput.value = ''; // Limpiar campo
            pasaporteInput.required = true; // Hacer requerido
        } else { // Seleccione...
            identidadContainer.style.display = 'none';
            pasaporteContainer.style.display = 'none';
            identidadInput.value = '';
            pasaporteInput.value = '';
        }
    });

    // Ejecutar al cargar la página (por si ya hay un valor seleccionado)
    nacionalidadSelect.dispatchEvent(new Event('change'));
});