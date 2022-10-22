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
function validarDatosMercaderia(pdesc, ptipo, ppuerto, pcantContenedores, pidEmpresa) {
    if (pdesc === "" || ptipo === "" || ppuerto === "" || pcantContenedores === "" || !isNaN(pcantContenedores) || pidEmpresa === "" || !isNaN(pidEmpresa)) {
        return false;
    }
    return true;
}
function ingresarMercaderia(pdesc, ptipo, ppuerto, pcantContenedores, pidEmpresa) {
    let nuevaSolicitud = new SolicitudCarga();
    nuevaSolicitud.id = 4;
    nuevaSolicitud.estado = "Pendiente";
    nuevaSolicitud.descripcion = pdesc;
    nuevaSolicitud.tipo = ptipo;
    nuevaSolicitud.puerto = ppuerto;
    nuevaSolicitud.cantidadContenedores = pcantContenedores;
    nuevaSolicitud.idEmpresa = pidEmpresa;
    solicitudesDeCarga.push(nuevaSolicitud);
}