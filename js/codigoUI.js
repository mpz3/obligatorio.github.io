document.querySelector("#btnRegistro").addEventListener("click", registroUI);
document.querySelector("#btnLogin").addEventListener("click", loginUI);
document.querySelector("#ingresoDesdeRegistro").addEventListener("click", muestroLoginUI);
document.querySelector("#pRegistrateAqui").addEventListener("click", registrateAquiUI);
document.querySelector("#btnIngresarMercaderia").addEventListener("click", btnUIMercaderia);
document.querySelector("#btnBuscarPendientes").addEventListener("click", buscarPendientesUI);
document.querySelector("#btnCancelarSolicitud").addEventListener("click", cancelarSolicitudUI);
document.querySelector("#liEstadistica").addEventListener("click", estadisticaUI);
document.querySelector("#liNuevaSolicitud").addEventListener("click", mostrarNuevaSolicitudUI);
document.querySelector("#liConsultarSolictudes").addEventListener("click", mostrarConsultarSolictudesUI);
document.querySelector("#liCancelarSolicitud").addEventListener("click", mostrarCancelarSolicitudUI);

let importadores = new Array();
let solicitudesDeCarga = new Array();
let userOnline = "camila";

inicio();

function inicio() {
    nuevoRegistro("camila", "fotoCM.jpg", "camila", "123", "importador");
    nuevoRegistro("miguel", "fotoMP.jpg", "miguel", "miguelMP123", "importador");
}

function registrateAquiUI() {
    document.querySelector("#login").style.display = "none";
    document.querySelector("#registro").style.display = "block";
}

function muestroLoginUI() {
    document.querySelector("#login").style.display = "block";
    document.querySelector("#registro").style.display = "none";
}


function registroUI() {
    let name = document.querySelector("#txtNombre").value;
    let foto = document.querySelector("#txtFoto").value;
    let usuario = document.querySelector("#txtUser").value;
    let pass = document.querySelector("#txtPass").value;
    let registroValido = validarRegistro(name, foto, usuario, pass);
    if (!registroValido) {
        let i = 0;
        let userEncontrado = false;
        while (!userEncontrado && i < importadores.length) {
            if (importadores[i].user.toLowerCase() === usuario.toLowerCase()) {//valido que no se repita el user con otro
                userEncontrado = true;
            }
            i++
        }
        if (!userEncontrado) {
            foto = quitarFakePath(foto);
            nuevoRegistro(name, foto, usuario, pass, "importador");
            userOnline = usuario;
            document.querySelector("#contenedor").style.display = "block";
            document.querySelector("#divImportador").style.display = "block";
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
    let loginvalido = validarLogin(user,pass);
    if (!loginvalido && buscarImportador(user, pass)) {
        userOnline = user;
        document.querySelector("#contenedor").style.display = "block";
        document.querySelector("#divImportador").style.display = "block";
        document.querySelector("#contenedorLogin").style.display = "none";
        document.querySelector("#divEmpresa").style.display = "none";
    } else {
        document.querySelector("#errorUsuario").style.display = "block";
        document.querySelector("#errorUsuario").innerHTML = `Datos invalidos`;
    }
}


function mostrarNuevaSolicitudUI() {
    document.querySelector("#divSolicitudDeCarga").style.display = "block";
    document.querySelector("#divConsultarPendientes").style.display = "none";
    document.querySelector("#divCancelarSolicitudDeCarga").style.display = "none";
    document.querySelector("#divInformacionEstadistica").style.display = "none";
}


function mostrarConsultarSolictudesUI() {
    solicitudesPendientesUI();
    document.querySelector("#divSolicitudDeCarga").style.display = "none";
    document.querySelector("#divConsultarPendientes").style.display = "block";
    document.querySelector("#divCancelarSolicitudDeCarga").style.display = "none";
    document.querySelector("#divInformacionEstadistica").style.display = "none";
}


function mostrarCancelarSolicitudUI() {
    document.querySelector("#divSolicitudDeCarga").style.display = "none";
    document.querySelector("#divConsultarPendientes").style.display = "none";
    document.querySelector("#divCancelarSolicitudDeCarga").style.display = "block";
    document.querySelector("#divInformacionEstadistica").style.display = "none";
}


function estadisticaUI() {
    document.querySelector("#divSolicitudDeCarga").style.display = "none";
    document.querySelector("#divConsultarPendientes").style.display = "none";
    document.querySelector("#divCancelarSolicitudDeCarga").style.display = "none";
    document.querySelector("#divInformacionEstadistica").style.display = "block";
    let cantPendiente = 0;
    let cantTotal = solicitudesDeCarga.length;
    for (let i = 0; i < cantTotal; i++) {
        if (solicitudesDeCarga[i].estado === "Canceladas") cantPendiente++;
    }
    let porcentaje = (cantPendiente * 100) / cantTotal;
    if (isNaN(porcentaje)) porcentaje = 0;
    document.querySelector("#divPorceCancelaciones").innerHTML = `El porcentaje de cancelaciones contra el total de cargas es ${porcentaje}%`;
}


function btnUIMercaderia() {
    let desc = document.querySelector("#txtDescrip").value;
    let tipo = document.querySelector("#txtTipoCarga").value;
    let puerto = document.querySelector("#txtPuerto").value;
    let cantContenedores = document.querySelector("#txtCantContenedores").value;
    let idEmpresa = document.querySelector("#txtIdEmpresa").value;
    if (validarDatosMercaderia(desc, tipo, puerto, cantContenedores, idEmpresa)) {
        let idNuevaMercaderia = ingresarMercaderia(desc, tipo, puerto, cantContenedores, idEmpresa);
        document.querySelector("#pIDGeneradoMercaderia").style.color = "black";
        document.querySelector("#pIDGeneradoMercaderia").innerHTML = `Se ingreso correctamente <br><strong>El id generado es: ${idNuevaMercaderia}</strong>`;
    } else {
        document.querySelector("#pIDGeneradoMercaderia").innerHTML = `Ingrese datos validos`;
        document.querySelector("#pIDGeneradoMercaderia").style.color = "red";
    }
}


function solicitudesPendientesUI() {
    let tabla = `<table border="1" style="text-align: center;"><tr><th>ID</th><th>Estado</th><th>Descripcion</th><th>Tipo</th><th>Puerto Origen</th><th>Nro de contenedores</th><th>ID Empresa</th></tr>`;
    for (let i = 0; i < solicitudesDeCarga.length; i++) {
        if (solicitudesDeCarga[i].userImportador === userOnline) {
            tabla += `<tr><td>${solicitudesDeCarga[i].id}</td><td>${solicitudesDeCarga[i].estado}</td><td>${solicitudesDeCarga[i].descripcion}</td><td>${solicitudesDeCarga[i].tipo}</td><td>${solicitudesDeCarga[i].puerto}</td><td>${solicitudesDeCarga[i].cantidadContenedores}</td><td>${solicitudesDeCarga[i].idEmpresa}</td></tr>`;
        }
    }
    tabla += `</table>`;
    document.querySelector("#pTotalPendientes").innerHTML = tabla;
}


function buscarPendientesUI() {
    let buscar = document.querySelector("#txtBuscarPendientes").value;
    if (buscar === "") {
        document.querySelector("#pBuscarPendientes").innerHTML = `EL id no es valido`;
    } else {
        busquedaSolicitudesPendientes(buscar);
    }
}


function cancelarSolicitudUI() {
    let idCancelar = document.querySelector("#txtCancelarSolicitud").value;
    if (idCancelar === "" || isNaN(idCancelar)) {
        document.querySelector("#pCancelarSoli").innerHTML = `No se encontraron resultados`;
    } else {
        idCancelar = Number(idCancelar);
        if (solicitudesDeCarga[idCancelar].estado === "Pendiente") {
            //funcion para cancelar
            document.querySelector("#pCancelarSoli").innerHTML = `Se cancelo la solicitud ${idCancelar} con exito`;
        }
    }
}