function nuevoRegistro(nombre, foto, usuario, pass) {
    let user = new UsuarioImportador();
    user.nombre = nombre;
    user.foto = foto;
    user.user = usuario;
    user.contraseña = pass;
    importadores.push(user);
}

function buscarImportador(pUser, pPass) {
    let i = 0;
    let encontrado = false;
    pUser = pUser.toLowerCase();
    while (!encontrado && i < importadores.length) {
        if (importadores[i].pUser.toLowerCase() === pUser && importadores[i].contraseña === pPass) {
            encontrado = true;
        }
        i++
    }
    return encontrado;
}

function validarContrasena(pPassw) {
    let i = 0;
    let mayusEncontrada = false;
    let minusEncontrada = false;
    let numEncontrado = false;
    while (i < pPassw.length || !mayusEncontrada && !minusEncontrada && !numEncontrado) {
        if (isNaN(pPassw.charAt(i))) {
            if (pPassw.charAt(i) === pPassw.charAt(i).toLowerCase()) {
                minusEncontrada = true;
            } else if (pPassw.charAt(i) === pPassw.charAt(i).toUpperCase()) {
                mayusEncontrada = true;
            }
        } else {
            numEncontrado = true;
        }
        i++;
    }
    if (mayusEncontrada && minusEncontrada && numEncontrado) {
        return true;
    }
    return false;
}
function quitarFakePath(pNombreArchivo) {
    let nombre = "";
    let posBarra = -1;
    let posBuscando = pNombreArchivo.length - 1;
    while (posBuscando >= 0 && posBarra === -1) {
        let letraX = pNombreArchivo.charAt(posBuscando);
        if (letraX === "\\" || letraX === "/") {
            posBarra = posBuscando;
        }
        posBuscando--;
    }
    for (let i = posBarra + 1; i < pNombreArchivo.length; i++) {
        nombre += pNombreArchivo.charAt(i);
    }
    return nombre;
}
function validarDatosMercaderia(pDesc, pTipo, pPuerto, pCantContenedores, pIEmpresa) {
    if (pDesc === "" || pTipo === "" || pPuerto === "" || pCantContenedores === "" || isNaN(pCantContenedores) || pIEmpresa === "" || isNaN(pIEmpresa)) {
        if (pDesc === "") document.querySelector("#txtDescrip").style.borderColor = "red";
        else document.querySelector("#txtDescrip").style.borderColor = "black";

        if (pTipo === "") document.querySelector("#txtTipoCarga").style.borderColor = "red";
        else document.querySelector("#txtTipoCarga").style.borderColor = "black";

        if (pPuerto === "") document.querySelector("#txtPuerto").style.borderColor = "red";
        else document.querySelector("#txtPuerto").style.borderColor = "black";

        if (pCantContenedores === "" || isNaN(pCantContenedores)) document.querySelector("#txtCantContenedores").style.borderColor = "red";
        else document.querySelector("#txtCantContenedores").style.borderColor = "black";

        if (pIEmpresa === "" || isNaN(pIEmpresa)) document.querySelector("#txtIdEmpresa").style.borderColor = "red";
        else document.querySelector("#txtIdEmpresa").style.borderColor = "black";

        return false;
    }
    return true;
}
function ingresarMercaderia(pDesc, pTipo, pPuerto, pCantContenedores, pIEmpresa) {
    let nuevaSolicitud = new SolicitudCarga();
    nuevaSolicitud.id = SolicitudCarga.idSolicitudCarga;
    nuevaSolicitud.estado = "Pendiente";
    nuevaSolicitud.descripcion = pDesc;
    nuevaSolicitud.tipo = pTipo;
    nuevaSolicitud.puerto = pPuerto;
    nuevaSolicitud.cantidadContenedores = pCantContenedores;
    nuevaSolicitud.idEmpresa = pIEmpresa;
    nuevaSolicitud.userImportador = userOnline;
    solicitudesDeCarga.push(nuevaSolicitud);
    SolicitudCarga.idSolicitudCarga++;
    return SolicitudCarga.idSolicitudCarga - 1;
}


function busquedaSolicitudesPendientes(pBusqueda) {
    let tabla = `<table border="1" style="text-align: center;"><tr><th>ID</th><th>Estado</th><th>Descripcion</th><th>Tipo</th><th>Puerto Origen</th><th>Nro de contenedores</th><th>ID Empresa</th></tr>`;
    for (let i = 0; i < solicitudesDeCarga.length; i++) {
        if (solicitudesDeCarga[i].id === Number(pBusqueda) || solicitudesDeCarga[i].descripcion.toLowerCase() === pBusqueda.toLowerCase()) {
            tabla += `<tr><td>${solicitudesDeCarga[i].id}</td><td>${solicitudesDeCarga[i].estado}</td><td>${solicitudesDeCarga[i].descripcion}</td><td>${solicitudesDeCarga[i].tipo}</td><td>${solicitudesDeCarga[i].puerto}</td><td>${solicitudesDeCarga[i].cantidadContenedores}</td><td>${solicitudesDeCarga[i].idEmpresa}</td></tr>`;
        }
    }
    tabla += `</table>`;
    document.querySelector("#pBuscarPendientes").innerHTML = tabla;
}