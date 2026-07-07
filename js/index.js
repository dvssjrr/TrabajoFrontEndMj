document.addEventListener('DOMContentLoaded', function () {
    const tabla = document.getElementById('tablaUsuarios');

    function obtenerRegistrosLocales() {
        try {
            return JSON.parse(localStorage.getItem('usuariosRegistrados') || '[]');
        } catch (error) {
            console.error('No se pudieron leer los registros locales.', error);
            return [];
        }
    }

    async function cargarUsuarios() {
        const registrosLocales = obtenerRegistrosLocales();
        let registrosApi = [];

        try {
            const respuesta = await fetch('https://jsonplaceholder.typicode.com/users');
            if (!respuesta.ok) throw new Error('No se pudo obtener la data desde JSONPlaceholder');
            registrosApi = await respuesta.json();
        } catch (error) {
            console.error(error);
        }

        const datos = [
            ...registrosApi.map((usuario) => ({
                id: usuario.id,
                nombre: usuario.name,
                usuario: usuario.username,
                fechaIngreso: '01/01/2024',
                email: usuario.email,
                sitioWeb: usuario.website
            })),
            ...registrosLocales.map((usuario) => ({
                id: usuario.id,
                nombre: usuario.nombre,
                usuario: usuario.usuario,
                fechaIngreso: usuario.fechaIngreso,
                email: usuario.email,
                sitioWeb: usuario.sitioWeb
            }))
        ];

        if (tabla) {
            const tbody = tabla.querySelector('tbody');
            if (tbody) {
                tbody.innerHTML = datos.map((usuario, index) => `
                    <tr>
                        <td>${index + 1}</td>
                        <td>${usuario.nombre}</td>
                        <td>${usuario.usuario}</td>
                        <td>${usuario.fechaIngreso}</td>
                        <td>${usuario.email}</td>
                        <td>${usuario.sitioWeb || '-'}</td>
                    </tr>
                `).join('');
            }
        }

        if (window.jQuery) {
            $('#tablaUsuarios').DataTable({
                language: {
                    url: 'https://cdn.datatables.net/plug-ins/2.1.8/i18n/es-ES.json'
                },
                pageLength: 5,
                lengthMenu: [5, 10, 20]
            });
        }
    }

    cargarUsuarios();
});
