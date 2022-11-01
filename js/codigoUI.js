document.querySelector("#btnRegistro").addEventListener("click", registroUI);
document.querySelector("#btnLogin").addEventListener("click", loginUI);
document.querySelector("#ingresoDesdeRegistro").addEventListener("click", muestroLoginUI);
document.querySelector("#pRegistrateAqui").addEventListener("click", registrateAquiUI);
document.querySelector("#liNuevaSolicitud").addEventListener("click", liMostrarNuevaSolicitudUI);
document.querySelector("#liConsultarSolictudes").addEventListener("click", liMostrarConsultarSolictudesUI);
document.querySelector("#liCancelarSolicitud").addEventListener("click", liMostrarCancelarSolicitudUI);
document.querySelector("#liCrearViaje").addEventListener("click", liCrearViajeUI);
document.querySelector("#liAsignarBuque").addEventListener("click", liAsignarBuqueUI);
document.querySelector("#liRollover").addEventListener("click", liRolloverUI);
document.querySelector("#liManifiesto").addEventListener("click", liManifiestoUI);
document.querySelector("#liHablitarI").addEventListener("click", liHablitarIUI);
document.querySelector("#liListaPeligrosa").addEventListener("click", liListaPeligrosaUI);
document.querySelector("#btnIngresarMercaderia").addEventListener("click", btnUIMercaderia);
document.querySelector("#btnBuscarPendientes").addEventListener("click", buscarPendientesUI);
document.querySelector("#btnCancelarSolicitud").addEventListener("click", cancelarSolicitudUI);
document.querySelector("#liEstadistica").addEventListener("click", estadisticaUI);
document.querySelector("#btnNuevoViaje").addEventListener("click", btnNuevoViajeUI);
document.querySelector("#btnConfirmarCarga").addEventListener("click", btnConfirmarCargaUI);
document.querySelector("#btnBuscarViajesProx").addEventListener("click", btnBuscarViajesProxUI);
document.querySelector("#btnRollover").addEventListener("click", btnRolloverUI);
document.querySelector("#btnGuardarRollover").addEventListener("click", btnGuardarRollover);


inicio();

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
    while (!userEncontrado && i < usuarios.length) {
      if (usuarios[i].user.toLowerCase() === usuario.toLowerCase()) {//valido que no se repita el user con otro
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
      document.querySelector("#navImportador").style.display = "block";
    } else {
      document.querySelector("#errorPusuario").style.display = "none";
      document.querySelector("#errorPusuario").innerHTML = `Usuario ya en uso`;
    }
  }
}


function loginUI() {
  let user = document.querySelector("#txtloginUser").value;
  let pass = document.querySelector("#txtloginPass").value;
  let loginvalido = validarLogin(user, pass);
  if (!loginvalido && buscarUser(user, pass)) {
    userOnline = user;
    document.querySelector("#contenedorLogin").style.display = "none";
    document.querySelector("#contenedor").style.display = "block";
    if (tipoUserG === "importador") {
      document.querySelector("#divImportador").style.display = "block";
      document.querySelector("#navImportador").style.display = "block";
      document.querySelector("#divEmpresa").style.display = "none";
    } else {
      document.querySelector("#divImportador").style.display = "none";
      document.querySelector("#divEmpresa").style.display = "block";
      document.querySelector("#navImportador").style.display = "none";
      document.querySelector("#navEmpresa").style.display = "block";
    }
  } else {
    document.querySelector("#errorUsuario").style.display = "block";
    document.querySelector("#errorUsuario").innerHTML = `Datos invalidos`;
  }
}


function liMostrarNuevaSolicitudUI() {
  document.querySelector("#divSolicitudDeCarga").style.display = "block";
  document.querySelector("#divConsultarPendientes").style.display = "none";
  document.querySelector("#divCancelarSolicitudDeCarga").style.display = "none";
  document.querySelector("#divInformacionEstadistica").style.display = "none";
}


function liMostrarConsultarSolictudesUI() {
  solicitudesPendientesUI();
  document.querySelector("#divSolicitudDeCarga").style.display = "none";
  document.querySelector("#divConsultarPendientes").style.display = "block";
  document.querySelector("#divCancelarSolicitudDeCarga").style.display = "none";
  document.querySelector("#divInformacionEstadistica").style.display = "none";
}


function liMostrarCancelarSolicitudUI() {
  document.querySelector("#divSolicitudDeCarga").style.display = "none";
  document.querySelector("#divConsultarPendientes").style.display = "block";
  document.querySelector("#divCancelarSolicitudDeCarga").style.display = "block";
  document.querySelector("#divInformacionEstadistica").style.display = "none";
  let opciones = `<select id="opCancelar"> <option value="">Seleccione para cancelar </OPTION>`;
  for (let i = 0; i < solicitudesDeCarga.length; i++) {
    let soli = solicitudesDeCarga[i];
    if (soli.estado === "Pendiente") {
      opciones += `<option value="${soli.id}">Cancelar nro ${soli.id} de empresa nro ${soli.idEmpresa} </option>`;
    }
  }
  opciones += "</select>";
  document.querySelector("#divPendientesACancelar").innerHTML = opciones;
}

function liCrearViajeUI() {
  document.querySelector("#divNuevoViaje").style.display = "block";
  document.querySelector("#divConfirmarPendientes").style.display = "none";
  document.querySelector("#divRollover").style.display = "none";
  document.querySelector("#divManifiestoCargar").style.display = "none";
  document.querySelector("#divHabilitarImportadores").style.display = "none";
  document.querySelector("#divListadoCargaPeligrosa").style.display = "none";
}
function liAsignarBuqueUI() {
  cargarDatosSolicitudesPendientes();
  document.querySelector("#divNuevoViaje").style.display = "none";
  document.querySelector("#divConfirmarPendientes").style.display = "block";
  document.querySelector("#divRollover").style.display = "none";
  document.querySelector("#divManifiestoCargar").style.display = "none";
  document.querySelector("#divHabilitarImportadores").style.display = "none";
  document.querySelector("#divListadoCargaPeligrosa").style.display = "none";
}
function liRolloverUI() {
  cargarSolicitudes();
  document.querySelector("#divNuevoViaje").style.display = "none";
  document.querySelector("#divConfirmarPendientes").style.display = "none";
  document.querySelector("#divRollover").style.display = "block";
  document.querySelector("#divManifiestoCargar").style.display = "none";
  document.querySelector("#divHabilitarImportadores").style.display = "none";
  document.querySelector("#divListadoCargaPeligrosa").style.display = "none";
}
function liManifiestoUI() {
  document.querySelector("#divNuevoViaje").style.display = "none";
  document.querySelector("#divConfirmarPendientes").style.display = "none";
  document.querySelector("#divRollover").style.display = "none";
  document.querySelector("#divManifiestoCargar").style.display = "block";
  document.querySelector("#divHabilitarImportadores").style.display = "none";
  document.querySelector("#divListadoCargaPeligrosa").style.display = "none";
}
function liHablitarIUI() {
  document.querySelector("#divNuevoViaje").style.display = "none";
  document.querySelector("#divConfirmarPendientes").style.display = "none";
  document.querySelector("#divRollover").style.display = "none";
  document.querySelector("#divManifiestoCargar").style.display = "none";
  document.querySelector("#divHabilitarImportadores").style.display = "block";
  document.querySelector("#divListadoCargaPeligrosa").style.display = "none";
}
function liListaPeligrosaUI() {
  document.querySelector("#divNuevoViaje").style.display = "none";
  document.querySelector("#divConfirmarPendientes").style.display = "none";
  document.querySelector("#divRollover").style.display = "none";
  document.querySelector("#divManifiestoCargar").style.display = "none";
  document.querySelector("#divHabilitarImportadores").style.display = "none";
  document.querySelector("#divListadoCargaPeligrosa").style.display = "block";
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
  let tabla = `<table  style="text-align: center;"><tr><th>ID</th><th>Estado</th><th>Descripcion</th><th>Tipo</th><th>Puerto Origen</th><th>Nro de contenedores</th><th>ID Empresa</th></tr>`;
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
  let idCancelar = document.querySelector("#opCancelar").value;
  if (idCancelar === "") {
    document.querySelector("#pCancelarSoli").innerHTML = `No se encontraron resultados`;
  } else {
    idCancelar = Number(idCancelar);
    if (solicitudesDeCarga[idCancelar].estado === "Pendiente") {
      solicitudesDeCarga[idCancelar].estado = "Cancelada";
      document.querySelector("#pCancelarSoli").innerHTML = `Se cancelo la solicitud ${idCancelar} con exito`;
      solicitudesPendientesUI();
    }
  }
}


function estadisticaUI() {
  document.querySelector("#divSolicitudDeCarga").style.display = "none";
  document.querySelector("#divConsultarPendientes").style.display = "none";
  document.querySelector("#divCancelarSolicitudDeCarga").style.display = "none";
  document.querySelector("#divInformacionEstadistica").style.display = "block";
  let cantPendiente = 0;
  let cantTotal = solicitudesDeCarga.length;
  for (let i = 0; i < cantTotal; i++) {
    if (solicitudesDeCarga[i].estado === "Cancelada") cantPendiente++;
  }
  let porcentaje = (cantPendiente * 100) / cantTotal;
  if (isNaN(porcentaje)) porcentaje = 0;
  document.querySelector("#divPorceCancelaciones").innerHTML = `El porcentaje de cancelaciones contra el total de cargas es ${porcentaje.toFixed(2)}%`;
  calendario(getIdUser(userOnline));
  document.querySelector("#divProxLlegadas").innerHTML = ``;

}

function btnNuevoViajeUI() {
  let nombreB = document.querySelector("#txtNombreBuque").value;
  let cantMax = document.querySelector("#txtCantMax").value;
  let fecha = document.querySelector("#txtFecha").value;
  if (nombreB != "" && cantMax != "" && !isNaN(cantMax) && fecha != "") {
    ingresarBuque(nombreB, Number(cantMax), fecha, userOnline);
    document.querySelector("#divMostrarAutomatico").innerHTML = `Se ingreso correctamente con el id ${buques[buques.length - 1].id}`;
  } else {
    document.querySelector("#divMostrarAutomatico").innerHTML = `Los campos son invalidos`;
  }
}

function btnConfirmarCargaUI() {
  let idsolcitudAprobada = document.querySelector("#selCargasPendientes").value;
  let enElviaje = document.querySelector("#selViajesPendientes").value;
  if (idsolcitudAprobada != "" && !isNaN(idsolcitudAprobada) && enElviaje != "" && !isNaN(enElviaje)) {
    idsolcitudAprobada = Number(idsolcitudAprobada);
    enElviaje = Number(enElviaje);
    confirmarCarga(idsolcitudAprobada, enElviaje);
    document.querySelector("#pIDSolicitudConfirmada").innerHTML = `Se confirmo Correctamente`;
    document.querySelector("#divProximosViajes").innerHTML = "";
    document.querySelector("#divBuscarProximosViajes").style.display = "none";
  } else {
    document.querySelector("#pIDSolicitudConfirmada").innerHTML = `Todos los campos son requeridos`;
  }
}

function btnBuscarViajesProxUI() {
  document.querySelector("#divBuscarProximosViajes").style.display = "block";
  cargarDatosViajesProximos();
}

function btnRolloverUI() {
  let cancelar = document.querySelector("#selRollover").value;
  buscarViajeDisponible(cancelar);
  document.querySelector("#divbuscarNuevoViaje").style.display = "block";
}

function btnGuardarRollover() {
  if (cambiarViaje()) {
    document.querySelector("#divbuscarNuevoViaje").style.display = "none";
    document.querySelector("#divMoverViaje").innerHTML = "";
    document.querySelector("#msgRollover").innerHTML = `Se movio correctamente`;
  } else {
    document.querySelector("#msgRollover").innerHTML = `No se pudo mover`;
  }
}
