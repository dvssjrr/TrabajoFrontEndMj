document.addEventListener('DOMContentLoaded', function () {
    let formulario = document.getElementById('form_registro');
    let campoNombre = document.getElementById('input_nombre');
    let campoRut = document.getElementById('input_rut');
    let campoEmail = document.getElementById('input_email');
    let campoFechaNacimiento = document.getElementById('input_fecha_nacimiento');
    let generoInputs = document.querySelectorAll('input[name="genero"]');
    let contrasena = document.getElementById('input_contrasena');
    let confirmacionContrasena = document.getElementById('input_confirm_contrasena');

    function validarGenero() {
        return Array.from(generoInputs).some(function (radio) {
            return radio.checked;
        });
    }

    function validarFormulario(event) {
        if (campoNombre.value.trim() === '') {
            alert('El campo Nombre es obligatorio');
            campoNombre.focus();
            event.preventDefault();
            return;
        }

        if (campoRut.value.trim() === '') {
            alert('El campo RUT es obligatorio');
            campoRut.focus();
            event.preventDefault();
            return;
        }

        if (campoEmail.value.trim() === '') {
            alert('El campo Email es obligatorio');
            campoEmail.focus();
            event.preventDefault();
            return;
        }

        if (!campoEmail.checkValidity()) {
            alert('Por favor ingrese un Email válido');
            campoEmail.focus();
            event.preventDefault();
            return;
        }

        if (campoFechaNacimiento.value === '') {
            alert('El campo Fecha de nacimiento es obligatorio');
            campoFechaNacimiento.focus();
            event.preventDefault();
            return;
        }

        if (!validarGenero()) {
            alert('Por favor seleccione un género');
            event.preventDefault();
            return;
        }

        if (contrasena.value.trim() === '') {
            alert('El campo Contraseña es obligatorio');
            contrasena.focus();
            event.preventDefault();
            return;
        }

        if (confirmacionContrasena.value.trim() === '') {
            alert('El campo Confirmar Contraseña es obligatorio');
            confirmacionContrasena.focus();
            event.preventDefault();
            return;
        }

        if (contrasena.value !== confirmacionContrasena.value) {
            alert('Las contraseñas no coinciden');
            confirmacionContrasena.focus();
            event.preventDefault();
            return;
        }

        alert('Todos los datos son válidos. Formulario listo para enviar.');
    }

    if (formulario) {
        formulario.addEventListener('submit', validarFormulario);
    }
});