document.querySelector("#btnRegistro").addEventListener("click", camposVaciosRegistro);
document.querySelector("#btnLogin").addEventListener("click", camposVaciosLogin);
document.querySelector("#ingresoDesdeRegistro").addEventListener("click", muestroLogin);
document.querySelector("#ingresoDesdeLogin").addEventListener("click", muestroRegistro);

function camposVaciosRegistro() {
    let name = document.querySelector("#txtNombre").value;
    let foto = document.querySelector("#txtFoto").value;
    let user = document.querySelector("#txtUser").value;
    let pass = document.querySelector("#txtPass").value;
    if (name === '') document.querySelector("#errorName").classList.remove("ocultar");
    if (foto === '') document.querySelector("#errorPerfil").classList.remove("ocultar");
    if (user === '') document.querySelector("#errorUser").classList.remove("ocultar");
    if (pass === '') document.querySelector("#errorPass").classList.remove("ocultar");
    document.querySelector("#contenedor").style.display="block";
    document.querySelector("#contenedorLogin").style.display="none";

}
function camposVaciosLogin() {
    let user = document.querySelector("#txtloginUser").value;
    let pass = document.querySelector("#txtloginPass").value;
    if (user === '') document.querySelector("#errorUserLogin").classList.remove("ocultar");
    if (pass === '') document.querySelector("#errorPassLogin").classList.remove("ocultar");
    document.querySelector("#contenedor").style.display="block";
    document.querySelector("#contenedorLogin").style.display="none";
}
function muestroLogin() {
    document.querySelector("#login").classList.remove("ocultar");
    document.querySelector("#registro").classList.add("ocultar");
}
function muestroRegistro() {
    document.querySelector("#login").classList.add("ocultar");
    document.querySelector("#registro").classList.remove("ocultar");
}

