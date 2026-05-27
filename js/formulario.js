function lenguaje(){
    alert('Cargando un script externo...')

    console.log('Mensaje por consola...')

    let nombre_personal;
    nombre_personal = 'Damian Bravo';
    console.log(nombre_personal)
    console.log(typeof(nombre_personal))

    nombre_personal = 789
    console.log(nombre_personal)
    console.log(typeof(nombre_personal))

    //var variable_antigua;

    const apellido = 'Bravo';
    console.log(apellido)

    /*
    apellido = 'Damian'
    console.log(apellido)
    */

    let Apellido_Paterno = 'Bravo'
    let apellido_paterno = 'bravo'

    console.log(Apellido_Paterno)
    console.log(apellido_paterno)

    // Las definicones en JS deben ser camelCase
    let apellidoPaternoPeronalEstudiante; // definición en estilo camelCase

    /*
    Palabras reservadas del lenguaje que no se pueden usar para nombrar variables
    let let;
    let return;
    let function;
    let class;
    let 1numero;
    */
    let $;
    let _;
    let $nombre;
    let _apellido;
    let a1b2;

    const COLOR_BLANCO = '#fff'
    const COLOR_AZUL = '#3907ce'
}

// document.body.style.backgroundColor=COLOR_AZUL
window.onload = function(){
    //document.body.style.backgroundColor=COLOR_AZUL
}

function enviarFormulario(url){
    alert('Enviando datos...')
    // location.reload()
}