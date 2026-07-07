document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form_registro');
    const campos = {
        nombre: document.getElementById('input_nombre'),
        usuario: document.getElementById('input_usuario'),
        fecha: document.getElementById('input_fecha_ingreso'),
        email: document.getElementById('input_email'),
        sitio: document.getElementById('input_sitio_web')
    };
    const btnCancelar = document.getElementById('btn_cancelar');

    const validar = {
        nombre: () => validarCampo(campos.nombre, /^[A-Za-zÁÉÍÓÚáéíóúÑñ ]{2,}$/),
        usuario: () => validarCampo(campos.usuario, /^[A-Za-z0-9._-]{3,}$/),
        fecha: () => {
            if (!campos.fecha.value) return marcar(campos.fecha, false);
            const fecha = new Date(campos.fecha.value);
            return marcar(campos.fecha, !isNaN(fecha.getTime()) && fecha <= new Date());
        },
        email: () => validarCampo(campos.email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/),
        sitio: () => {
            if (!campos.sitio.value) return marcar(campos.sitio, true);
            return validarCampo(campos.sitio, /^(https?:\/\/)/);
        }
    };

    function validarCampo(campo, regex) {
        return marcar(campo, regex.test(campo.value.trim()));
    }

    function marcar(campo, valido) {
        campo.classList.remove('is-invalid', 'is-valid');
        campo.classList.add(valido ? 'is-valid' : 'is-invalid');
        return valido;
    }

    function limpiar() {
        form.reset();
        Object.values(campos).forEach(campo => campo.classList.remove('is-invalid', 'is-valid'));
        campos.nombre.focus();
    }

    Object.entries(campos).forEach(([clave, campo]) => {
        campo.addEventListener('input', () => validar[clave]());
    });

    btnCancelar.addEventListener('click', limpiar);
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const ok = Object.values(validar).every(fn => fn());
        if (!ok) {
            alert('Por favor corrige los campos marcados.');
            return;
        }
        alert('Los datos han sido enviados correctamente.');
        limpiar();
    });
});
