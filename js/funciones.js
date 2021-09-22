const administrarCitas = new Citas();
const ui = new UI(administrarCitas);

let editando = false;

// Objeto con información de la cita
const citaObj = {
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas: ''
}

// Agrega datos al objeto de cita
export function datosCita(e) {
    citaObj[e.target.name] = e.target.value;
}

// Valida y agrega una nueva cita a la clase de citas
export function nuevaCita(e) {
    e.preventDefault();

    // Extraer la información del objeto de la cita
    const {mascota, propietario, telefono, fecha, hora, sintomas} = citaObj;

    // Validar datos
    if (mascota === '' || propietario === '' || telefono === '' || fecha === '' || hora === '' || sintomas === '') {
        ui.imprimirAlerta('Todos los campos son obligatorios', 'error');
        return;
    }

    if(editando){
        ui.imprimirAlerta('Editado correctamente');

        // Pasa el objeto de la cita a edición
        administrarCitas.editarCita({...citaObj})

        // Regresa el estado del botón a su estado original
        formulario.querySelector('button[type="submit"]').textContent = 'Crear cita';

        // Quitar modo edición
        editando = false;
    } else {
        // Generar un id único
        citaObj.id = Date.now();
    
        // Creando una nueva cita
        administrarCitas.agregarCita({...citaObj});

        // Mensaje de agregado correctamente
        ui.imprimirAlerta('Se agregó correctamente');
    }


    // Reiniciar el objeto para la validación
    reiniciarObjeto();

    // Reiniciar el formulario
    formulario.reset();

    // Mostrar el HTML de las citas
    ui.imprimirCitas(administrarCitas);
}

export function reiniciarObjeto() {
    citaObj.mascota = '';
    citaObj.propietario = '';
    citaObj.telefono = '';
    citaObj.fecha = '';
    citaObj.hora = '';
    citaObj.sintomas = '';
}

export function eliminarCita(id) {
    // Elimina la cita
    administrarCitas.eliminarCita(id);

    // Muestra un mensaje
    ui.imprimirAlerta('La cita se eliminó correctamente');

    // Refresca la cita
    ui.imprimirCitas(administrarCitas);
}

// Carga los datos y el modo edición
export function cargarEdicion(cita) {
    const {mascota, propietario, telefono, fecha, hora, sintomas, id} = cita;

    // Llena los inputs
    mascotaInput.value = mascota;
    propietarioInput.value = propietario;
    telefonoInput.value = telefono;
    fechaInput.value = fecha;
    horaInput.value = hora;
    sintomasInput.value = sintomas;

    // Llena el objeto
    citaObj.mascota = mascota;
    citaObj.propietario = propietario;
    citaObj.telefono = telefono;
    citaObj.fecha = fecha;
    citaObj.hora = hora;
    citaObj.sintomas = sintomas;
    citaObj.id = id;

    // Cambia el texto del botón
    formulario.querySelector('button[type="submit"]').textContent = 'Guardar cambios';

    editando = true;
}