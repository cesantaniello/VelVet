class UI{

    imprimirAlerta(mensaje, tipo){
        // Crear el div
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert', 'd-block', 'col-12');

        // Agregar clase en base al tipo de error
        (tipo === 'error') 
            ? divMensaje.classList.add('alert-danger')
            : divMensaje.classList.add('alert-success')

        // Mensaje de error
        divMensaje.textContent = mensaje;

        // Agregar al DOM
        document.querySelector('#contenido').insertBefore(divMensaje, document.querySelector('.agregar-cita'));

        // Quitar la alerta después de 5 segundos
        setTimeout(() => {
            divMensaje.remove();
        }, 5000);
    }

    imprimirCitas({citas}){

        this.limpiarHTML();

        citas.forEach(cita => {
            const {mascota,propietario,telefono,fecha,hora,sintomas,id} = cita;

            const divCita = document.createElement('div');
            divCita.classList.add('cita','p-3');
            divCita.dataset.id = id;

            // Scripting de los elementos de la cita
            const mascotaParrafo = document.createElement('h2');
            mascotaParrafo.classList.add('card-title', 'font-weight-bolder');
            mascotaParrafo.textContent = mascota;

            const propietarioParrafo = document.createElement('p');
            propietarioParrafo.innerHTML = `
            <span class="font-weight-bolder">Propietario</span> ${propietario}`;

            const telefonoParrafo = document.createElement('p');
            telefonoParrafo.innerHTML = `
            <span class="font-weight-bolder">Telefono</span> ${telefono}`;

            const fechaParrafo = document.createElement('p');
            fechaParrafo.innerHTML = `
            <span class="font-weight-bolder">Fecha</span> ${fecha}`;

            const horaParrafo = document.createElement('p');
            horaParrafo.innerHTML = `
            <span class="font-weight-bolder">Hora</span> ${hora}`;

            const sintomasParrafo = document.createElement('p');
            sintomasParrafo.innerHTML = `
            <span class="font-weight-bolder">Sintomas</span> ${sintomas}`;

            // Botón para eliminar esta cita
            const btnEliminar = document.createElement('button');
            btnEliminar.classList.add('btn', 'btn-danger', 'mr-2');
            btnEliminar.innerHTML = 'Eliminar <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>';
            btnEliminar.onclick = () => eliminarCita(id);

            // Agrega un botón para editar
            const btnEditar = document.createElement('button');
            btnEditar.classList.add('btn', 'btn-info');
            btnEditar.innerHTML = 'Editar <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>';
            btnEditar.onclick = () => cargarEdicion(cita);

            // Agrega los párrafos al divCita
            divCita.appendChild(mascotaParrafo);
            divCita.appendChild(propietarioParrafo);
            divCita.appendChild(telefonoParrafo);
            divCita.appendChild(fechaParrafo);
            divCita.appendChild(horaParrafo);
            divCita.appendChild(sintomasParrafo);
            divCita.appendChild(btnEliminar);
            divCita.appendChild(btnEditar);

            // Agrega las citas al HTML
            contenedorCitas.appendChild(divCita);
        });
    }

    limpiarHTML(){
        while(contenedorCitas.firstChild){
            contenedorCitas.removeChild(contenedorCitas.firstChild)
        }
    }
}

export default UI;