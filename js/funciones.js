document.querySelector("#btnRegistro").addEventListener("click", registroUI);
document.querySelector("#btnLogin").addEventListener("click", loginUI);
document.querySelector("#ingresoDesdeRegistro").addEventListener("click", muestroLogin);
document.querySelector("#pRegistrateAqui").addEventListener("click", registrateAqui);
document.querySelector("#btnIngresarMercaderia").addEventListener("click", btnUIMercaderia);
document.querySelector("#btnBuscarPendientes").addEventListener("click", buscarPendientesUI);
let importadores = new Array();
let solicitudesDeCarga = new Array();
inicio();
function inicio() {
    nuevoRegistro("camila", "camila", "camila", "camila");
    nuevoRegistro("miguel", "miguel", "miguel", "miguel");
}

function registroUI() {
    let name = document.querySelector("#txtNombre").value;
    let foto = document.querySelector("#txtFoto").value;
    let usuario = document.querySelector("#txtUser").value;
    let pass = document.querySelector("#txtPass").value;
    let error = false;
    if (name === "") {
        document.querySelector("#errorPname").style.display = "block";
        document.querySelector("#errorPname").innerHTML = `Campo Obligatorio (*)`;
        error = true;
    } else {
        document.querySelector("#errorPname").style.display = "none";
    }
    if (foto === "") {
        document.querySelector("#errorPfoto").style.display = "block";
        document.querySelector("#errorPfoto").innerHTML = `Campo Obligatorio (*)`;
        error = true;
    } else {
        document.querySelector("#errorPfoto").style.display = "none";
    }
    if (usuario === "") {
        document.querySelector("#errorPusuario").style.display = "block";
        document.querySelector("#errorPusuario").innerHTML = `Campo Obligatorio (*)`;
        error = true;
    } else {
        document.querySelector("#errorPusuario").style.display = "none";
    }

    if (pass === "") {
        document.querySelector("#errorPpass").style.display = "block";
        document.querySelector("#errorPpass").innerHTML = `Campo Obligatorio (*)`;
        error = true;
    } else if (!validarContrasena(pass)) {
        document.querySelector("#errorPpass").style.display = "block";
        document.querySelector("#errorPpass").innerHTML = `(?) Debe de contar con al menos una minuscula, mayuscula y un numero`;
        error = true;
    } else {
        document.querySelector("#errorPpass").style.display = "none";
    }

    if (!error) {
        let i = 0;
        let userEncontrado = false;
        while (!userEncontrado && i < importadores.length) {
            if (importadores[i].user.toLowerCase() === usuario.toLowerCase()) {//valido que no se repita el user con otro
                userEncontrado = true;
            }
            i++
        }
        if (!userEncontrado) {
            nuevoRegistro(name, foto, usuario, pass);
            document.querySelector("#contenedor").style.display = "block";
            document.querySelector("#contenedorLogin").style.display = "none";
            document.querySelector("#divEmpresa").style.display = "none";
        } else {
            document.querySelector("#errorPusuario").style.display = "none";
            document.querySelector("#errorPusuario").innerHTML = `Usuario ya en uso`;
        }
    }
}
function loginUI() {
    let user = document.querySelector("#txtloginUser").value;
    let pass = document.querySelector("#txtloginPass").value;
    let error = false;
    if (user === '') {
        document.querySelector("#errorUsuarioLogin").style.display = "none";
        document.querySelector("#errorUsuarioLogin").innerHTML = `Campo Obligatorio (*)`;
        error = true;
    } else {
        document.querySelector("#errorUsuarioLogin").style.display = "block";
    }
    if (pass === '') {
        document.querySelector("#errorPassLogin").style.display = "none";
        document.querySelector("#errorPassLogin").innerHTML = `Campo Obligatorio (*)`;
        error = true;
    } else {
        document.querySelector("#errorPassLogin").style.display = "block";
    }
    if (!error && buscarImportador(user, pass)) {
        document.querySelector("#contenedor").style.display = "block";
        document.querySelector("#contenedorLogin").style.display = "none";
        document.querySelector("#divEmpresa").style.display = "none";
    } else {
        document.querySelector("#errorUsuario").style.display = "none";
        document.querySelector("#errorUsuario").innerHTML = `Datos invalidos`;
    }
}

function registrateAqui() {
    document.querySelector("#login").style.display = "none";
    document.querySelector("#registro").style.display = "block";
}
function muestroLogin() {
    document.querySelector("#login").style.display = "block";
    document.querySelector("#registro").style.display = "none";
}
function btnUIMercaderia() {
    let desc = document.querySelector("#txtDescrip").value;
    let tipo = document.querySelector("#txtTipoCarga").value;
    let puerto = document.querySelector("#txtPuerto").value;
    let cantContenedores = document.querySelector("#txtCantContenedores").value;
    let idEmpresa = document.querySelector("#txtIdEmpresa").value;
    if (validarDatosMercaderia(desc, tipo, puerto, cantContenedores, idEmpresa)) {
        ingresarMercaderia(desc, tipo, puerto, cantContenedores, idEmpresa);
        document.querySelector("#pIDGeneradoMercaderia").innerHTML = `Se ingreso correctamente`;
    } else {
        document.querySelector("#pIDGeneradoMercaderia").innerHTML = `Ingrese datos validos`;
    }
}
function buscarPendientesUI() {
    let buscar = document.querySelector("#txtBuscarPendientes").value;
    busquedaSolicitudes(buscar);
}