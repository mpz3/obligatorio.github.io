document.querySelector("#btnRegistro").addEventListener("click", registroUI);
document.querySelector("#btnLogin").addEventListener("click", loginUI);
document.querySelector("#ingresoDesdeRegistro").addEventListener("click", muestroLoginUI);
document.querySelector("#pRegistrateAqui").addEventListener("click", registrateAquiUI);
document.querySelector("#aux").addEventListener("click", cerrarSesion);
document.querySelector("#liNuevaSolicitud").addEventListener("click", liMostrarNuevaSolicitudUI);
document.querySelector("#liConsultarSolictudes").addEventListener("click", liMostrarConsultarSolictudesUI);
document.querySelector("#liCancelarSolicitud").addEventListener("click", liMostrarCancelarSolicitudUI);
document.querySelector("#liCrearViaje").addEventListener("click", liCrearViajeUI);
document.querySelector("#liAsignarBuque").addEventListener("click", liAsignarBuqueUI);
document.querySelector("#liRollover").addEventListener("click", liRolloverUI);
document.querySelector("#liManifiesto").addEventListener("click", liManifiestoUI);
document.querySelector("#btnBuscarEnManifiesto").addEventListener("click", btnBuscarEnManifiestoUI);
document.querySelector("#btnBuscarPeligrosa").addEventListener("click", btnBuscarPeligrosaUI);
document.querySelector("#liHablitarI").addEventListener("click", liHablitarIUI);
document.querySelector("#liListaPeligrosa").addEventListener("click", liListaPeligrosaUI);
document.querySelector("#btnIngresarMercaderia").addEventListener("click", btnUIMercaderiaUI);
document.querySelector("#btnBuscarPendientes").addEventListener("click", buscarPendientesUI);
document.querySelector("#btnCancelarSolicitud").addEventListener("click", cancelarSolicitudUI);
document.querySelector("#liEstadistica").addEventListener("click", estadisticaUI);
document.querySelector("#btnNuevoViaje").addEventListener("click", btnNuevoViajeUI);
document.querySelector("#btnBuscarViajesProx").addEventListener("click", btnBuscarViajesProxUI);
document.querySelector("#btnRollover").addEventListener("click", btnRolloverUI);


inicio();

function registrateAquiUI() {
  limpiarCampos("txtInput", "txtCleanSelect");
  document.querySelector("#login").style.display = "none";
  document.querySelector("#registro").style.display = "block";
}

function muestroLoginUI() {
  limpiarCampos("txtInput", "txtCleanSelect");
  document.querySelector("#login").style.display = "block";
  document.querySelector("#registro").style.display = "none";
}

function cerrarSesion() {
  limpiarCampos("txtInput", "txtCleanSelect");
  document.querySelector("#contenedorLogin").style.display = "block";
  document.querySelector("#contenedor").style.display = "none";
  muestroLoginUI()
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
      document.querySelector("#contenedorLogin").style.display = "none";
      document.querySelector("#contenedor").style.display = "block";
      document.querySelector("#divImportador").style.display = "block";
      document.querySelector("#divEmpresa").style.display = "none";
      document.querySelector("#navImportador").style.display = "block";
      document.querySelector("#navEmpresa").style.display = "none";
      document.querySelector("#imgUsuario").setAttribute("src", "img/" + usuarios[getIdUser(userOnline)].foto);
      liMostrarNuevaSolicitudUI();
      limpiarCampos("txtInput", "txtCleanSelect");
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
      document.querySelector("#divEmpresa").style.display = "none";
      document.querySelector("#navImportador").style.display = "block";
      document.querySelector("#navEmpresa").style.display = "none";
      document.querySelector("#imgUsuario").setAttribute("src", "img/" + usuarios[getIdUser(userOnline)].foto);
      liMostrarNuevaSolicitudUI();
      limpiarCampos("txtInput", "txtCleanSelect");
    } else {
      document.querySelector("#imgUsuario").setAttribute("src", "");
      document.querySelector("#divImportador").style.display = "none";
      document.querySelector("#divEmpresa").style.display = "block";
      document.querySelector("#navImportador").style.display = "none";
      document.querySelector("#navEmpresa").style.display = "block";
      liCrearViajeUI();
      limpiarCampos("txtInput", "txtCleanSelect");
    }
  } else {
    document.querySelector("#errorUsuario").style.display = "block";
    document.querySelector("#errorUsuario").innerHTML = `Datos no coinciden`;
  }
}


function liMostrarNuevaSolicitudUI() {
  limpiarCampos("txtInput", "txtCleanSelect");
  document.querySelector("#divEmpresaSolicitud").innerHTML = cargarSelEmpresas();
  document.querySelector("#divSolicitudDeCarga").style.display = "block";
  document.querySelector("#divConsultarPendientes").style.display = "none";
  document.querySelector("#divCancelarSolicitudDeCarga").style.display = "none";
  document.querySelector("#divInformacionEstadistica").style.display = "none";
}


function liMostrarConsultarSolictudesUI() {
  limpiarCampos("txtInput", "txtCleanSelect");
  solicitudesPendientesUI();
  document.querySelector("#divSolicitudDeCarga").style.display = "none";
  document.querySelector("#divConsultarPendientes").style.display = "block";
  document.querySelector("#divCancelarSolicitudDeCarga").style.display = "none";
  document.querySelector("#divInformacionEstadistica").style.display = "none";
}


function liMostrarCancelarSolicitudUI() {
  document.querySelector("#divSolicitudDeCarga").style.display = "none";
  document.querySelector("#divConsultarPendientes").style.display = "none";
  document.querySelector("#divCancelarSolicitudDeCarga").style.display = "block";
  document.querySelector("#divInformacionEstadistica").style.display = "none";
  document.querySelector("#divPendientesACancelar").innerHTML = cargarSelCancelarCarga();
}

function liCrearViajeUI() {
  limpiarCampos("txtInput", "txtCleanSelect");
  document.querySelector("#divNuevoViaje").style.display = "block";
  document.querySelector("#divConfirmarPendientes").style.display = "none";
  document.querySelector("#divRollover").style.display = "none";
  document.querySelector("#divManifiestoCargar").style.display = "none";
  document.querySelector("#divHabilitarImportadores").style.display = "none";
  document.querySelector("#divListadoCargaPeligrosa").style.display = "none";
}
function liAsignarBuqueUI() {
  limpiarCampos("txtInput", "txtCleanSelect");
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
  limpiarCampos("txtInput", "txtCleanSelect");
  document.querySelector("#divNuevoViaje").style.display = "none";
  document.querySelector("#divConfirmarPendientes").style.display = "none";
  document.querySelector("#divRollover").style.display = "block";
  document.querySelector("#divManifiestoCargar").style.display = "none";
  document.querySelector("#divHabilitarImportadores").style.display = "none";
  document.querySelector("#divListadoCargaPeligrosa").style.display = "none";
}
function liManifiestoUI() {
  limpiarCampos("txtInput", "txtCleanSelect");
  mostrarViajesDeLineaCarga();
  document.querySelector("#divNuevoViaje").style.display = "none";
  document.querySelector("#divConfirmarPendientes").style.display = "none";
  document.querySelector("#divRollover").style.display = "none";
  document.querySelector("#divManifiestoCargar").style.display = "block";
  document.querySelector("#divHabilitarImportadores").style.display = "none";
  document.querySelector("#divListadoCargaPeligrosa").style.display = "none";
}
function liHablitarIUI() {
  document.querySelector("#divTableHablitarImportadores").innerHTML = generarTablaImportadores();
  limpiarCampos("txtInput", "txtCleanSelect");
  document.querySelector("#divNuevoViaje").style.display = "none";
  document.querySelector("#divConfirmarPendientes").style.display = "none";
  document.querySelector("#divRollover").style.display = "none";
  document.querySelector("#divManifiestoCargar").style.display = "none";
  document.querySelector("#divHabilitarImportadores").style.display = "block";
  document.querySelector("#divListadoCargaPeligrosa").style.display = "none";
  let darVidaBoton = document.querySelectorAll('.habilitar');
  for (let darVidaBotonX of darVidaBoton) {
    darVidaBotonX.addEventListener("click", habilitarDeshabilitados);
  }
}
function liListaPeligrosaUI() {
  limpiarCampos("txtInput", "txtCleanSelect");
  mostrarCargasPeligrosas();
  document.querySelector("#divNuevoViaje").style.display = "none";
  document.querySelector("#divConfirmarPendientes").style.display = "none";
  document.querySelector("#divRollover").style.display = "none";
  document.querySelector("#divManifiestoCargar").style.display = "none";
  document.querySelector("#divHabilitarImportadores").style.display = "none";
  document.querySelector("#divListadoCargaPeligrosa").style.display = "block";
}

function btnUIMercaderiaUI() {
  let desc = document.querySelector("#txtDescrip").value;
  let tipo = document.querySelector("#txtTipoCarga").value;
  let puerto = document.querySelector("#txtPuerto").value;
  let cantContenedores = document.querySelector("#txtCantContenedores").value;
  let idEmpresa = encotrarNumero(document.querySelector("#txtIdEmpresa").value);
  if (validarDatosMercaderia(desc, tipo, puerto, cantContenedores, idEmpresa)) {
    let idNuevaMercaderia = ingresarMercaderia(desc, tipo, puerto, cantContenedores, idEmpresa, userOnline, "PENDIENTE");
    document.querySelector("#pIDGeneradoMercaderia").style.color = "black";
    document.querySelector("#pIDGeneradoMercaderia").innerHTML = `Se ingreso correctamente <br><strong>El id generado es: ${idNuevaMercaderia}</strong>`;
    limpiarCampos("txtInput", "txtCleanSelect");
    liMostrarNuevaSolicitudUI()
  } else {
    document.querySelector("#pIDGeneradoMercaderia").innerHTML = `Los datos ingresados no son validos`;
    document.querySelector("#pIDGeneradoMercaderia").style.color = "red";
  }
}


function solicitudesPendientesUI() {
  document.querySelector("#divTotalPendientes").innerHTML = tablaSoliPendientes();
}


function buscarPendientesUI() {
  let buscar = document.querySelector("#txtBuscarPendientes").value;
  if (buscar === "") {
    document.querySelector("#divBuscarPendientes").innerHTML = `EL id no es valido`;
  } else {
    busquedaSolicitudesPendientes(buscar);
  }
}


function cancelarSolicitudUI() {
  let idCancelar = document.querySelector("#opCancelar").value;
  if (idCancelar === "") {
    document.querySelector("#pCancelarSoli").innerHTML = `No se encontraron resultados`;
  } else {
    limpiarCampos("txtInput", "txtCleanSelect");
    cancelarCargaDeshabilitarImportador(idCancelar);
    document.querySelector("#divPendientesACancelar").innerHTML = cargarSelCancelarCarga();
  }
}


function estadisticaUI() {
  document.querySelector("#divSolicitudDeCarga").style.display = "none";
  document.querySelector("#divConsultarPendientes").style.display = "none";
  document.querySelector("#divCancelarSolicitudDeCarga").style.display = "none";
  document.querySelector("#divInformacionEstadistica").style.display = "block";
  let cantCanceladas = 0;
  let cantTotal = 0;
  for (let i = 0; i < solicitudesDeCarga.length; i++) {
    if (solicitudesDeCarga[i].userImportador === userOnline) {
      cantTotal++;
      if (solicitudesDeCarga[i].estado === "Cancelada") cantCanceladas++;
    }
  }
  let porcentaje = (cantCanceladas * 100) / cantTotal;
  if (isNaN(porcentaje)) porcentaje = 0;
  document.querySelector("#pPorceCancelaciones").innerHTML = `El porcentaje de cancelaciones contra el total de cargas es ${porcentaje.toFixed(2)}%`;
  document.querySelector("#pProxLlegadas").innerHTML = `<b>Calendario de las próximas llegadas: </b><br> ${calendarioProximasLlegadas()}`;
  document.querySelector("#pPorcentajeSoli").innerHTML = `<b>Porcentaje de las diferentes líneas:</b> <br>${porcentajeDeSolicitudes()}`;

}

function btnNuevoViajeUI() {
  let nombreB = document.querySelector("#txtNombreBuque").value;
  let cantMax = document.querySelector("#txtCantMax").value;
  let fecha = document.querySelector("#txtFecha").value;
  if (validarIngresoBuque(nombreB, cantMax, fecha)) {
    ingresarBuque(nombreB, Number(cantMax), fecha, userOnline);
    document.querySelector("#divMostrarAutomatico").innerHTML = `Se ingreso correctamente con el id ${buques[buques.length - 1].id}`;
    limpiarCampos("txtInput", "txtCleanSelect");
  } else {
    document.querySelector("#divMostrarAutomatico").innerHTML = `Los campos son invalidos`;
  }
}

function btnBuscarViajesProxUI() {
  let pIDSolicitud = document.querySelector("#selCargasPendientes").value;
  if (pIDSolicitud != "") {
    document.querySelector("#divBuscarProximosViajes").style.display = "block";
    cargarDatosViajesProximos(Number(pIDSolicitud));
    let darVidaBoton = document.querySelectorAll('.buscarVPend');
    for (let darVidaBotonX of darVidaBoton) {
      darVidaBotonX.addEventListener("click", confirmarEstaCarga);
    }
  } else {
    document.querySelector("#pIDSolicitudConfirmada").innerHTML = `No se encontro ningun resultado`;
  }

}

function btnRolloverUI() {
  let cancelar = document.querySelector("#selRollover").value;
  if (cancelar != "") {
    let mostrar = buscarViajeDisponible(cancelar);
    document.querySelector("#divbuscarNuevoViaje").style.display = "block";
    let darVidaBoton = document.querySelectorAll('.rolloverMover');
    for (let darVidaBotonX of darVidaBoton) {
      darVidaBotonX.addEventListener("click", cambiarViaje);
    }
    if (!mostrar) {
      document.querySelector("#divMoverViaje").innerHTML = "";
      document.querySelector("#msgRollover").innerHTML = `No existen viajes posteriores a la fecha`;
    }
  } else {
    document.querySelector("#msgRollover").innerHTML = `Seleccione un viaje (*)`;
  }
}

function cambiarViaje() {
  let botonSeleccionado = this;
  let pCancelar = document.querySelector("#selRollover").value;
  pCancelar = encotrarNumero(pCancelar);//retorna el numero x -> 'idViajeConfir-x'
  let pMover = botonSeleccionado.getAttribute("data-idBuqueRollover");
  pMover = Number(pMover);
  let encontrado = false;
  let i = 0;
  while (i < solicitudEnViajeConfirmada.length && !encontrado) {
    if (solicitudEnViajeConfirmada[i].id === pCancelar) {
      solicitudEnViajeConfirmada[i].idViaje = pMover;
      encontrado = true;
    }
    i++;
  }
  if (encontrado) {
    document.querySelector("#divbuscarNuevoViaje").style.display = "none";
    document.querySelector("#divMoverViaje").innerHTML = "";
    document.querySelector("#msgRollover").innerHTML = `Se movio correctamente`;
    cargarSolicitudes();
  }
  limpiarCampos("txtInput", "txtCleanSelect");
  return encontrado;
}

function btnBuscarEnManifiestoUI() {
  let nroViaje = document.querySelector("#selLineaDeCarga").value;
  if (nroViaje === "") {
    document.querySelector("#divManifiesto").innerHTML = `No se selecciono ninguna Linea de Carga`;
  } else {
    buscarEnManifiesto(nroViaje);
  }
}

function btnBuscarPeligrosaUI() {
  let nroViaje = document.querySelector("#selListadoPeligroso").value;
  if (nroViaje === "") {
    document.querySelector("#divTablaListaPeligrosa").innerHTML = `No se selecciono ningun viaje`;
  } else {
    buscarCargaPeligrosa(nroViaje);
  }
}

