
function preCarga() {
    nuevoRegistro("camila", "fotoCM.jpg", "camila", "camilaCM123", "importador");
    nuevoRegistro("miguel", "fotoMP.jpg", "miguel", "miguelMP123", "importador");
    nuevoRegistro("importador3", "fotoMP.jpg", "userimportar3", "importadoR3", "importador");
    nuevoRegistro("importador4", "fotoMP.jpg", "userimportar4", "importadoR4", "importador");
    nuevoRegistro("importador5", "fotoMP.jpg", "userimportar5", "importadoR5", "importador");
    nuevoRegistro("empresa1", "empre.jpg", "userempresa1", "userempreSA1", "empresa");
    nuevoRegistro("empresa2", "empre.jpg", "userempresa2", "userempreSA2", "empresa");
    nuevoRegistro("empresa3", "empre.jpg", "userempresa3", "userempreSA3", "empresa");
    nuevoRegistro("empresa4", "empre.jpg", "userempresa4", "userempreSA4", "empresa");
    nuevoRegistro("empresa5", "empre.jpg", "userempresa5", "userempreSA5", "empresa");
    nuevoRegistro("empresa5", "empre.jpg", "1", "1", "empresa");
    ingresarMercaderia("Desc1", "CARGA_GENERAL", "OBB", 12, 1);
    ingresarMercaderia("Desc2", "CARGA_GENERAL", "CBA", 32, 1);
    ingresarMercaderia("Desc3", "CARGA_GENERAL", "ULE", 12, 2);
}

function buscarUser(pUser, pPass) {
    let i = 0;
    let encontrado = false;
    pUser = pUser.toLowerCase()
    while (!encontrado && i < usuarios.length) {
        if (usuarios[i].user.toLowerCase() === pUser && usuarios[i].contraseña === pPass) {
            encontrado = true;
            tipoUserG = usuarios[i].tipo;
        }
        i++
    }

    return encontrado;
}

function nuevoRegistro(pNombre, Pfoto, pUsuario, pPass, pTipo) {
    let user = new Usuario();
    user.id = Usuario.idImportador;
    user.nombre = pNombre;
    user.foto = Pfoto;
    user.user = pUsuario;
    user.contraseña = pPass;
    user.tipo = pTipo;
    usuarios.push(user);
    Usuario.idImportador++;
}

function validarRegistro(pName, pfoto, pUsuario, pPass) {
    let error = false;
    if (pName === "") {
        document.querySelector("#errorPname").style.display = "block";
        document.querySelector("#errorPname").innerHTML = `Campo Obligatorio (*)`;
        error = true;
    } else {
        document.querySelector("#errorPname").style.display = "none";
    }
    if (pfoto === "") {
        document.querySelector("#errorPfoto").style.display = "block";
        document.querySelector("#errorPfoto").innerHTML = `Campo Obligatorio (*)`;
        error = true;
    } else {
        document.querySelector("#errorPfoto").style.display = "none";
    }
    if (pUsuario === "") {
        document.querySelector("#errorPusuario").style.display = "block";
        document.querySelector("#errorPusuario").innerHTML = `Campo Obligatorio (*)`;
        error = true;
    } else {
        document.querySelector("#errorPusuario").style.display = "none";
    }

    if (pPass === "") {
        document.querySelector("#errorPpass").style.display = "block";
        document.querySelector("#errorPpass").innerHTML = `Campo Obligatorio (*)`;
        error = true;
    } else if (!validarContrasena(pPass)) {
        document.querySelector("#errorPpass").style.display = "block";
        document.querySelector("#errorPpass").innerHTML = `(?) Debe de contar con al menos una minuscula, mayuscula y un numero`;
        error = true;
    } else {
        document.querySelector("#errorPpass").style.display = "none";
    }
    return error;
}

function validarLogin(pUser, pPass) {
    if (pUser === '') {
        document.querySelector("#errorUsuarioLogin").style.display = "block";
        document.querySelector("#errorUsuarioLogin").innerHTML = `Campo Obligatorio (*)`;
        error = true;
    } else {
        document.querySelector("#errorUsuarioLogin").style.display = "none";
    }
    if (pPass === '') {
        document.querySelector("#errorPassLogin").style.display = "block";
        document.querySelector("#errorPassLogin").innerHTML = `Campo Obligatorio (*)`;
        error = true;
    } else {
        document.querySelector("#errorPassLogin").style.display = "none";
    }
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
    let tabla = `<table  style="text-align: center;"><tr><th>ID</th><th>Estado</th><th>Descripcion</th><th>Tipo</th><th>Puerto Origen</th><th>Nro de contenedores</th><th>ID Empresa</th></tr>`;
    for (let i = 0; i < solicitudesDeCarga.length; i++) {
        if (solicitudesDeCarga[i].id === Number(pBusqueda) || solicitudesDeCarga[i].descripcion.toLowerCase() === pBusqueda.toLowerCase()) {
            tabla += `<tr><td>${solicitudesDeCarga[i].id}</td><td>${solicitudesDeCarga[i].estado}</td><td>${solicitudesDeCarga[i].descripcion}</td><td>${solicitudesDeCarga[i].tipo}</td><td>${solicitudesDeCarga[i].puerto}</td><td>${solicitudesDeCarga[i].cantidadContenedores}</td><td>${solicitudesDeCarga[i].idEmpresa}</td></tr>`;
        }
    }
    tabla += `</table>`;
    document.querySelector("#pBuscarPendientes").innerHTML = tabla;
}

function ingresarBuque(pNombreB, pCantMax, pFecha, pUerOnline) {
    let nuevoViaje = new ViajeBuque();
    nuevoViaje.id = ViajeBuque.idViajeBuque;
    nuevoViaje.idEmpresa = buscarEmpresa(pUerOnline);
    nuevoViaje.nombreBuque = pNombreB;
    nuevoViaje.cargaMaxima = pCantMax;
    nuevoViaje.fechaLlegada = pFecha;
    buques.push(nuevoViaje);
    ViajeBuque.idViajeBuque++;
}

function buscarEmpresa(pUser) {
    let encotrando = false;
    let i = 0;
    while (i < usuarios.length || !encotrando) {
        if (usuarios[i].user === pUser) {
            return usuarios[i].id;
        }
        i++;
    }
    return "";
}


function cargarDatosPendientes() {
    let opciones = `<select id="selCargasPendientes"> <option value="">Seleccione </option>`;
    for (let i = 0; i < solicitudesDeCarga.length; i++) {
        let soli = solicitudesDeCarga[i];
        if (soli.estado === "Pendiente") {
            opciones += `<option value="${soli.id}">Solicitud Nro ${soli.id}</option>`;
        }
    }
    opciones += "</select>";
    document.querySelector("#divCargasPendientes").innerHTML = opciones;

    let opFecha = `<select id="selViajesPendientes"> <option value="">Seleccione </option>`;
    for (let i = 0; i < buques.length; i++) {
        let buque = buques[i];
        //validar importador habilitado y cantidad de contenedores restantes
        if (new Date(buque.fechaLlegada) > new Date() && buque.cargaMaxima >= solicitudesDeCarga[i].cantidadContenedores) {
            opFecha += `<option value="${buque.id}">Buque ID ${buque.id}</option>`;
        }
    }
    opFecha += "</select>";
    document.querySelector("#divProximosViajes").innerHTML = opFecha;
}

function confirmarCarga(pIdsolcitudAprobada, pEnElviaje) {
    let carga = new CargaConfirmada();
    carga.id = CargaConfirmada.idCargaConfirmada;
    carga.idViaje = pEnElviaje;
    carga.idCarga = pIdsolcitudAprobada;
    viajesConfirmados.push(carga);
    cambiarEstado(pIdsolcitudAprobada,"CONFIRMADA");
    cargarDatosPendientes();//para quitarla del select y volver con las pendientes
    CargaConfirmada.idCargaConfirmada++;
}

function cambiarEstado(pIDCarga,pEstado) {
    let encontrado = false;
    let i =0;
    while (i < solicitudesDeCarga.length && !encontrado) {
        if (solicitudesDeCarga[i].id === pIDCarga) {
            solicitudesDeCarga[i].estado = pEstado;
            encontrado = true;
        }
        i++;
    }
}