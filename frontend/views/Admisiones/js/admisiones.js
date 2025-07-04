
document.addEventListener('DOMContentLoaded', function() {
            const solicitudesPendientesSection = document.getElementById('solicitudes-pendientes');
            const detalleSolicitudSection = document.getElementById('detalle-solicitud');
            const revisarButtons = document.querySelectorAll('.btn-revisar'); // Selector más específico
            const btnVolverSolicitudes = document.getElementById('btnVolverSolicitudes');
            const rechazarSolicitudRadio = document.getElementById('rechazarSolicitud');
            const observacionesRechazo = document.getElementById('observacionesRechazo');
            const aprobarSolicitudRadio = document.getElementById('aprobarSolicitud');
            const solicitudIdDisplay = document.getElementById('solicitud-id-display');

            // Mostrar la sección de Solicitudes Pendientes al cargar
            solicitudesPendientesSection.style.display = 'block';
            detalleSolicitudSection.style.display = 'none';

            revisarButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const solicitudId = this.dataset.solicitudId; // Obtener el ID del atributo data-
                    solicitudIdDisplay.textContent = solicitudId; // Mostrar el ID en la sección de detalle

                    // Ocultar la lista y mostrar el detalle
                    solicitudesPendientesSection.style.display = 'none';
                    detalleSolicitudSection.style.display = 'block';

                    // Aquí podrías cargar dinámicamente los datos de la solicitud usando AJAX
                    // Por ahora, usamos datos de ejemplo
                    console.log(`Cargando datos para la solicitud: ${solicitudId}`);
                    // Ejemplo de cómo actualizar algunos campos (para demostración)
                    if (solicitudId === 'UNAH-001') {
                        document.getElementById('nombreEstudiante').value = 'Ana Sofía';
                        document.getElementById('apellidosEstudiante').value = 'Martínez López';
                        document.getElementById('carreraPrincipal').value = 'Medicina';
                    } else if (solicitudId === 'UNAH-002') {
                        document.getElementById('nombreEstudiante').value = 'Carlos David';
                        document.getElementById('apellidosEstudiante').value = 'Orellana Paz';
                        document.getElementById('carreraPrincipal').value = 'Ingeniería Civil';
                    }
                     // Restablecer el estado de los campos de decisión y observaciones
                    aprobarSolicitudRadio.checked = false;
                    rechazarSolicitudRadio.checked = false;
                    observacionesRechazo.value = '';
                    observacionesRechazo.disabled = true;
                    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => checkbox.checked = false);
                });
            });

            btnVolverSolicitudes.addEventListener('click', function() {
                detalleSolicitudSection.style.display = 'none';
                solicitudesPendientesSection.style.display = 'block';
            });

            // Habilitar/deshabilitar el campo de observaciones según la decisión
            rechazarSolicitudRadio.addEventListener('change', function() {
                if (this.checked) {
                    observacionesRechazo.removeAttribute('disabled');
                }
            });

            aprobarSolicitudRadio.addEventListener('change', function() {
                if (this.checked) {
                    observacionesRechazo.setAttribute('disabled', 'true');
                    observacionesRechazo.value = ''; // Limpiar el campo si se aprueba
                }
            });


            // Lógica para el botón Guardar Decisión (aquí iría tu AJAX o lógica de envío)
            document.getElementById('btnGuardarDecision').addEventListener('click', function() {
                const decision = document.querySelector('input[name="decisionRevisor"]:checked');
                if (!decision) {
                    alert('Por favor, selecciona si apruebas o rechazas la solicitud.');
                    return;
                }

                const solicitudId = solicitudIdDisplay.textContent;
                const decisionValue = decision.value;
                const observaciones = observacionesRechazo.value;

                alert(`Decisión para Solicitud ${solicitudId}: ${decisionValue}. Observaciones: "${observaciones}". (Implementar lógica de envío a backend)`);

                // Después de guardar, podrías volver a la lista de solicitudes
                // detalleSolicitudSection.style.display = 'none';
                // solicitudesPendientesSection.style.display = 'block';
            });
        });