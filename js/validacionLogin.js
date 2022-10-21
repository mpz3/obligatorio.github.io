document.querySelector("#btnRegistro").addEventListener("click", registroValidacion);
document.querySelector("#btnLogin").addEventListener("click", loginValidacion);
document.querySelector("#ingresoDesdeRegistro").addEventListener("click", muestroLogin);
document.querySelector("#ingresoDesdeLogin").addEventListener("click", muestroRegistro);
let importadores = new Array();
inicio();
function inicio() {
    nuevoRegistro("camila", "camila", "camila", "camila");
    nuevoRegistro("miguel", "miguel", "miguel", "miguel");
}
function nuevoRegistro(nombre, foto, usuario, pass) {
    let user = new Usuario();
    user.nombre = nombre;
    user.foto = foto;
    user.user = usuario;
    user.contraseña = pass;
    importadores.push(user);
}

function buscarImportador(user, pass) {
    let i = 0;
    let encontrado = false;
    user = user.toLowerCase();
    while (!encontrado && i < importadores.length) {
        if (importadores[i].user.toLowerCase() === user && importadores[i].contraseña === pass) {
            encontrado = true;
        }
        i++
    }
    return encontrado;
}
function loginValidacion() {
    let user = document.querySelector("#txtloginUser").value;
    let pass = document.querySelector("#txtloginPass").value;
    if (user === '') document.querySelector("#errorUserLogin").classList.remove("ocultar");
    if (pass === '') document.querySelector("#errorPassLogin").classList.remove("ocultar");
    if (buscarImportador(user, pass)) {
        document.querySelector("#contenedor").style.display = "block";
        document.querySelector("#contenedorLogin").style.display = "none";
    }
}
function registroValidacion() {
    let name = document.querySelector("#txtNombre").value;
    let foto = document.querySelector("#txtFoto").value;
    let usuario = document.querySelector("#txtUser").value;
    let pass = document.querySelector("#txtPass").value;
    let error = false;
    if (name === '') {
        error = true
        document.querySelector("#errorName").classList.remove("ocultar");
    }
    if (foto === '') {
        error = true;
        document.querySelector("#errorPerfil").classList.remove("ocultar");
    }
    if (usuario === '') {
        error = true;
        document.querySelector("#errorUser").classList.remove("ocultar");
    }
    if (pass === '' || pass.length < 5) {
        error = true;
        document.querySelector("#errorPass").classList.remove("ocultar");
    }
    if (!error) {
        let i = 0;
        let encontrado = false;
        while (!encontrado && i < importadores.length) {
            if (importadores[i].user.toLowerCase() === usuario.toLowerCase()) {
                encontrado = true;
            }
            i++
        }
        if (!encontrado) {
            nuevoRegistro(name, foto, usuario, pass);
            muestroLogin();
        } else {
            document.querySelector("#errorUser").classList.remove("ocultar");
            document.querySelector("#errorUser").innerHTML = `Usuario ya en uso`;
        }
    }
}

function muestroLogin() {
    document.querySelector("#login").classList.remove("ocultar");
    document.querySelector("#registro").classList.add("ocultar");
}
function muestroRegistro() {
    document.querySelector("#login").classList.add("ocultar");
    document.querySelector("#registro").classList.remove("ocultar");
}
