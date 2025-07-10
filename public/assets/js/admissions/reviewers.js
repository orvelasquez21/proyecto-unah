
document.addEventListener("DOMContentLoaded", function () {
    // Elementos de la interfaz
    const pendingRequest = document.getElementById('solicitudes-pendientes');
    const detalleSolicitudSection = document.getElementById('detalle-solicitud');
    const btnVolverSolicitudes = document.getElementById('btnVolverSolicitudes');
    const rechazarSolicitudRadio = document.getElementById('rechazarSolicitud');
    const observacionesRechazo = document.getElementById('observacionesRechazo');
    const aprobarSolicitudRadio = document.getElementById('aprobarSolicitud');
    const solicitudIdDisplay = document.getElementById('solicitud-id-display');




    // Función para cargar datos desde el API //---->cambiar a funciones tipo flecha con constantes 
    function cargarSolicitudes() {
        fetch("/api/admissions/admissionsListRequests.php")
            .then(async response => {
                console.log("Respuesta recibida, estado:", response.status);

                if (!response.ok) {
                    // Si la respuesta no es exitosa, intentamos leer el cuerpo del error
                    const errorText = await response.text();
                    throw new Error(`Error ${response.status}: ${errorText || 'Sin detalles'}`);
                }

                // Primero obtenemos el texto para verificar el contenido
                const text = await response.text();
                console.log("Respuesta cruda:", text);
                try {
                    // Intentamos parsear como JSON
                    const data_1 = JSON.parse(text);
                    console.log("JSON parseado correctamente");
                    return data_1;
                } catch (e) {
                    // Si falla el parseo, verificamos si es un error común
                    if (text.trim().startsWith("<")) {
                        throw new Error("El servidor devolvió HTML en lugar de JSON. Posible error PHP.");
                    }
                    throw new Error("La respuesta no es JSON válido: " + text.substring(0, 100) + "...");
                }
            })
            .then(data => {
                console.log("Datos procesados:", data);

                // Verificamos que los datos tengan la estructura esperada
                if (!Array.isArray(data)) {
                    throw new Error("La respuesta no es un array");
                }

                if (data.length > 0 && !data[0].ID_REGISTRO) {

                    throw new Error("La estructura de los datos no coincide con lo esperado");
                }

                const tbody = document.querySelector("#solicitudes-pendientes tbody");
                tbody.innerHTML = "";

                data.forEach(solicitud => {
                    const tr = document.createElement("tr");
                    tr.innerHTML = `<tr>
                                            <td><span class="badge bg-info text-dark">${solicitud.ID_REGISTRO}</span></td>
                                            <td>${solicitud.NOMBRES} ${solicitud.APELLIDOS}</td>
                                            <td>${solicitud.NOMBRE_CARRERA}</td>
                                            <td>${solicitud.FECHA_RECIBIDA}</td>
                                            <td><span class="badge bg-secondary">-</span></td>
                                            <td>
                                                <button class="btn btn-primary btn-sm btn-revisar" data-solicitud-id="${solicitud.ID_REGISTRO}">Revisar</button>
                                            </td>
                                        </tr>`;
                    tbody.appendChild(tr);
                });

                asignarEventosRevisar();
            })
            .catch(error => {
                console.error('Error en cargarSolicitudes:', error);


                let errorMessage = "Error al cargar las solicitudes";

                if (error.message.includes("HTML")) {
                    errorMessage += ": El servidor está devolviendo una página de error. Verifica la consola para más detalles.";
                } else if (error.message.includes("JSON")) {
                    errorMessage += ": Formato de datos incorrecto recibido del servidor.";
                } else {
                    errorMessage += `: ${error.message}`;
                }

                // Mostrar el error en la interfaz
                const tbody = document.querySelector("#solicitudes-pendientes tbody");
                tbody.innerHTML = `
                <tr>
                    <td colspan="6" class="text-center text-danger">
                        ${errorMessage}
                        <button class="btn btn-sm btn-warning ms-2" onclick="cargarSolicitudes()">Reintentar</button>
                    </td>
                </tr>
            `;
            });
    }



    // Función para determinar la clase CSS según el estado
    function getState(state) {
        switch (state.toLowerCase()) {
            case 'pendiente': return 'bg-warning text-dark';
            case 'aprobado': return 'bg-success text-white';
            case 'rechazado': return 'bg-danger text-white';
            default: return 'bg-secondary text-white';
        }
    }




    // Función para asignar eventos a los botones "Revisar"
    function assingEventReview() {

        const revisarButtons = document.querySelectorAll('.btn-revisar');

        revisarButtons.forEach(button => {
            button.addEventListener('click', function () {
                const solicitudId = this.dataset.solicitudId;

                solicitudIdDisplay.textContent = solicitudId;

                // Ocultar lista y mostrar detalle
                pendingRequest.style.display = 'none';
                detalleSolicitudSection.style.display = 'block';
                console.log("se asignarion los eventos a los botones");
                // Aquí deberías hacer otro fetch para cargar los detalles específicos
                cargarDetalleSolicitud(solicitudId);
            });
            console.log("se asignarion los eventos a los botones");
        });
    }




    // Función para cargar el detalle de una solicitud (simplificado)
    function cargarDetalleSolicitud(solicitudId) {
        // Aquí iría tu llamada al backend para obtener los detalles
        // Por ahora usamos un ejemplo estático
        console.log(`Cargando detalles para solicitud ${solicitudId}`);


        rederCheckBoxs();
        // Restablecer el estado de los campos de decisión y observaciones
        aprobarSolicitudRadio.checked = false;
        rechazarSolicitudRadio.checked = false;
        observacionesRechazo.value = '';
        observacionesRechazo.disabled = true;
        document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => checkbox.checked = false);
    }

    // Evento para volver a la lista
    btnVolverSolicitudes.addEventListener('click', function () {
        detalleSolicitudSection.style.display = 'none';
        pendingRequest.style.display = 'block';
    });

    // Habilitar/deshabilitar el campo de observaciones según la decisión
    rechazarSolicitudRadio.addEventListener('change', function () {
        observacionesRechazo.disabled = !this.checked;
    });

    aprobarSolicitudRadio.addEventListener('change', function () {
        if (this.checked) {
            observacionesRechazo.value = '';
            observacionesRechazo.disabled = true;
        }
    });

    // Lógica para el botón Guardar Decisión
    /* document.getElementById('btnGuardarDecision').addEventListener('click', function () {
         const decision = document.querySelector('input[name="decisionRevisor"]:checked');
         if (!decision) {
             alert('Por favor, selecciona si apruebas o rechazas la solicitud.');
             return;
         }
 
         const solicitudId = solicitudIdDisplay.textContent;
         const decisionValue = decision.value;
         const observaciones = observacionesRechazo.value;
 
         // Aquí iría tu llamada al backend para guardar la decisión
         console.log(`Decisión para ${solicitudId}: ${decisionValue} - ${observaciones}`);
         alert(`Decisión registrada para solicitud ${solicitudId}`);
     });*/

    // Cargar las solicitudes al inicio
    cargarSolicitudes();

    let valuesData = ["Nombre coincide con titulo",
        "Apellidos conincie con tiutlo",
        "DOcumento es el titulo",
        "Documento es legible",
        "Idenidad es consistente",
        "Pasaporte es consistente"
    ];


    function rederCheckBoxs() {

        const container = document.getElementById("contenedorValidaciones");

        let htmlCheckBoxs = "";

        valuesData.forEach((content, index) => {
            let contLower = content.toLocaleUpperCase()

            htmlCheckBoxs += `<div class="form-check">
                <input class="form-check-input" type="checkbox" id="${index}">
                <label class="form-check-label" for="${index}">
                  ${content}
                </label>
              </div>`;
        });

        container.innerHTML = htmlCheckBoxs;
    }
});










