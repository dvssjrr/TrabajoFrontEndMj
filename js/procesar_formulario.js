document.addEventListener('DOMContentLoaded', function () {
    let formulario = document.getElementById('form_registro');
    let campoNombre = document.getElementById('input_nombre');
    let campoRut = document.getElementById('input_rut');
    let campoEmail = document.getElementById('input_email');
    let campoFechaNacimiento = document.getElementById('input_fecha_nacimiento');
    let contrasena = document.getElementById('input_contrasena');
    let confirmacionContrasena = document.getElementById('input_confirm_contrasena');
    let btnCancelar = document.getElementById('btn_cancelar');

    function validarRUT(rut) {
        let rutLimpio = rut.replace(/\./g, '').replace('-', '').trim();
        if (!rutLimpio || rutLimpio.length < 8) return false;
        let numero = rutLimpio.substring(0, rutLimpio.length - 1);
        let digito = rutLimpio.substring(rutLimpio.length - 1).toUpperCase();
        numero = parseInt(numero, 10);
        if (isNaN(numero)) return false;
        let suma = 0, multiplicador = 2;
        for (; numero; numero = Math.floor(numero / 10)) {
            suma += (numero % 10) * multiplicador;
            multiplicador += 1;
            if (multiplicador === 8) multiplicador = 2;
        }
        let residuo = suma % 11, dv = 11 - residuo;
        let dvString = dv === 11 ? '0' : dv === 10 ? 'K' : dv.toString();
        return digito === dvString;
    }

    function validarFecha(fecha) {
        const regexFecha = /^\d{2}\/\d{2}\/\d{4}$/;
        if (!regexFecha.test(fecha)) return false;
        const [dia, mes, anio] = fecha.split('/').map(Number);
        if (mes < 1 || mes > 12) return false;
        const diasEnMes = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        if (anio % 4 === 0 && (anio % 100 !== 0 || anio % 400 === 0)) diasEnMes[1] = 29;
        return dia >= 1 && dia <= diasEnMes[mes - 1];
    }

    function validarEmail(email) {
        return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
    }

    function validarContrasena(password) {
        return password.length >= 8 && password.length <= 12 && 
               /[A-Z]/.test(password) && /[a-z]/.test(password) && 
               /[0-9]/.test(password) && /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
    }


    function validarFormulario(event) {
        event.preventDefault();
        if (!campoNombre.value.trim()) { alert('El campo Nombre es obligatorio'); campoNombre.focus(); return false; }
        if (!campoRut.value.trim()) { alert('El campo RUT es obligatorio'); campoRut.focus(); return false; }
        
        if (!validarRUT(campoRut.value)) { alert('El RUT ingresado no es válido'); campoRut.focus(); return false; }
        if (!campoEmail.value.trim()) { alert('El campo Email es obligatorio'); campoEmail.focus(); return false; }
        
        if (!validarEmail(campoEmail.value)) { alert('El formato de Email no es válido. Use: nombre_usuario@servidor.dominio'); campoEmail.focus(); return false; }
        if (campoFechaNacimiento.value.trim() && !validarFecha(campoFechaNacimiento.value)) { alert('El formato de fecha debe ser dd/MM/yyyy'); campoFechaNacimiento.focus(); return false; }
        if (!contrasena.value.trim()) { alert('El campo Contraseña es obligatorio'); contrasena.focus(); return false; }
        
        if (!validarContrasena(contrasena.value)) { alert('La contraseña debe tener:\n- Mínimo 8 caracteres, máximo 12\n- Al menos 1 letra mayúscula\n- Al menos 1 letra minúscula\n- Al menos 1 número\n- Al menos 1 carácter especial (!@#$%^&*()_+-=[]{};\':"|,.<>/?)'​); contrasena.focus(); return false; }
        if (!confirmacionContrasena.value.trim()) { alert('El campo Confirmar Contraseña es obligatorio'); confirmacionContrasena.focus(); return false; }
        if (contrasena.value !== confirmacionContrasena.value) { alert('Las contraseñas no coinciden'); confirmacionContrasena.focus(); return false; }
        alert('Los datos han sido enviados correctamente.');
        limpiarFormulario();
        return false;
    }

    function limpiarFormulario() { formulario.reset(); campoNombre.focus(); }

    btnCancelar && btnCancelar.addEventListener('click', limpiarFormulario);
    formulario && formulario.addEventListener('submit', validarFormulario);
});