function nuevoRegistro(nombre, foto, usuario, pass) {
    let user = new UsuarioImportador();
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

function validarContrasena(passw) {
    let i = 0;
    let mayusEncontrada = false;
    let minusEncontrada = false;
    let numEncontrado = false;
    while (i < passw.length || !mayusEncontrada && !minusEncontrada && !numEncontrado) {
        if (isNaN(passw.charAt(i))) {
            if (passw.charAt(i) === passw.charAt(i).toLowerCase()) {
                minusEncontrada = true;
            } else if (passw.charAt(i) === passw.charAt(i).toUpperCase()) {
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
function validarDatosMercaderia(pdesc, ptipo, ppuerto, pcantContenedores, pidEmpresa) {
    if (pdesc === "" || ptipo === "" || ppuerto === "" || pcantContenedores === "" || isNaN(pcantContenedores) || pidEmpresa === "" || isNaN(pidEmpresa)) {
        if (pdesc === "") document.querySelector("#txtDescrip").style.borderColor = "red";
        else document.querySelector("#txtDescrip").style.borderColor = "black";

        if (ptipo === "") document.querySelector("#txtTipoCarga").style.borderColor = "red";
        else document.querySelector("#txtTipoCarga").style.borderColor = "black";

        if (ppuerto === "") document.querySelector("#txtPuerto").style.borderColor = "red";
        else document.querySelector("#txtPuerto").style.borderColor = "black";

        if (pcantContenedores === "" || isNaN(pcantContenedores)) document.querySelector("#txtCantContenedores").style.borderColor = "red";
        else document.querySelector("#txtCantContenedores").style.borderColor = "black";

        if (pidEmpresa === "" || isNaN(pidEmpresa)) document.querySelector("#txtIdEmpresa").style.borderColor = "red";
        else document.querySelector("#txtIdEmpresa").style.borderColor = "black";

        return false;
    }
    return true;
}
function ingresarMercaderia(pdesc, ptipo, ppuerto, pcantContenedores, pidEmpresa) {
    let nuevaSolicitud = new SolicitudCarga();
    nuevaSolicitud.id = SolicitudCarga.idSolicitudCarga;
    nuevaSolicitud.estado = "Pendiente";
    nuevaSolicitud.descripcion = pdesc;
    nuevaSolicitud.tipo = ptipo;
    nuevaSolicitud.puerto = ppuerto;
    nuevaSolicitud.cantidadContenedores = pcantContenedores;
    nuevaSolicitud.idEmpresa = pidEmpresa;
    nuevaSolicitud.userImportador = userOnline;
    solicitudesDeCarga.push(nuevaSolicitud);
    SolicitudCarga.idSolicitudCarga++;
    return SolicitudCarga.idSolicitudCarga - 1;
}


function busquedaSolicitudesPendientes(busqueda) {
    let tabla = `<table border="1" style="text-align: center;"><tr><th>ID</th><th>Estado</th><th>Descripcion</th><th>Tipo</th><th>Puerto Origen</th><th>Nro de contenedores</th><th>ID Empresa</th></tr>`;
    for (let i = 0; i < solicitudesDeCarga.length; i++) {
        if (solicitudesDeCarga[i].id === Number(busqueda) || solicitudesDeCarga[i].descripcion.toLowerCase() === busqueda.toLowerCase()) {
            tabla += `<tr><td>${solicitudesDeCarga[i].id}</td><td>${solicitudesDeCarga[i].estado}</td><td>${solicitudesDeCarga[i].descripcion}</td><td>${solicitudesDeCarga[i].tipo}</td><td>${solicitudesDeCarga[i].puerto}</td><td>${solicitudesDeCarga[i].cantidadContenedores}</td><td>${solicitudesDeCarga[i].idEmpresa}</td></tr>`;
        }
    }
    tabla += `</table>`;
    document.querySelector("#pBuscarPendientes").innerHTML = tabla;
}