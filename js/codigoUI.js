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

/* Pre carga */
inicio();

/*Oculto login, muestro registro*/
function registrateAquiUI() {
  limpiarCampos("txtInput", "txtCleanSelect");//limpio textos
  document.querySelector("#login").style.display = "none";
  document.querySelector("#registro").style.display = "block";
}

/* Oculto registro, muestro login */
function muestroLoginUI() {
  limpiarCampos("txtInput", "txtCleanSelect");//limpio textos
  document.querySelector("#login").style.display = "block";
  document.querySelector("#registro").style.display = "none";
}

/* Oculto contendor de usuario y muestro login */
function cerrarSesion() {
  limpiarCampos("txtInput", "txtCleanSelect");//limpio textos
  document.querySelector("#contenedorLogin").style.display = "block";
  document.querySelector("#contenedor").style.display = "none";
  muestroLoginUI()
}

/* Formulario registro */
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
      foto = quitarFakePath(foto);//se pasa la ruta del archivo y retorna el nombre con su extencion
      nuevoRegistro(name, foto, usuario, pass, "importador");
      userOnline = usuario;//todo el usuario registrado como online

      //Oculto registro y muestro contenedor de importador
      document.querySelector("#contenedorLogin").style.display = "none";
      document.querySelector("#contenedor").style.display = "block";
      document.querySelector("#divImportador").style.display = "block";
      document.querySelector("#divEmpresa").style.display = "none";
      document.querySelector("#navImportador").style.display = "block";
      document.querySelector("#navEmpresa").style.display = "none";

      //Muestro foto de pefil
      document.querySelector("#imgUsuario").setAttribute("src", "img/" + usuarios[getIdUser(userOnline)].foto);

      liMostrarNuevaSolicitudUI();
      limpiarCampos("txtInput", "txtCleanSelect");//limpio textos
    } else {
      document.querySelector("#errorPusuario").style.display = "block";
      document.querySelector("#errorPusuario").innerHTML = `Usuario ya en uso`;
    }
  }
}

/* Se loguea con el usuario ingresado */
function loginUI() {
  let user = document.querySelector("#txtloginUser").value;
  let pass = document.querySelector("#txtloginPass").value;
  let loginvalido = validarLogin(user, pass);
  if (!loginvalido && buscarUser(user, pass)) {//valido que la contraseña coincida con el usuario
    userOnline = user;//todo el usuario logueado como online
    document.querySelector("#contenedorLogin").style.display = "none";
    document.querySelector("#contenedor").style.display = "block";

    //Muestro foto de pefil
    document.querySelector("#imgUsuario").setAttribute("src", "img/" + usuarios[getIdUser(userOnline)].foto);

    if (tipoUserG === "importador") {//muestro contenedor importador
      document.querySelector("#divImportador").style.display = "block";
      document.querySelector("#divEmpresa").style.display = "none";
      document.querySelector("#navImportador").style.display = "block";
      document.querySelector("#navEmpresa").style.display = "none";
      liMostrarNuevaSolicitudUI();
      limpiarCampos("txtInput", "txtCleanSelect");//limpio textos
    } else {
      //muestro contenedor empresa
      document.querySelector("#divImportador").style.display = "none";
      document.querySelector("#divEmpresa").style.display = "block";
      document.querySelector("#navImportador").style.display = "none";
      document.querySelector("#navEmpresa").style.display = "block";
      liCrearViajeUI();//muestro primera pantalla -> crear viaje
      limpiarCampos("txtInput", "txtCleanSelect");//limpio textos
    }
  } else {
    document.querySelector("#errorUsuario").style.display = "block";
    document.querySelector("#errorUsuario").innerHTML = `Datos no coinciden`;
  }
}

//muestra solo el div con el formulario para crear cargas (importador)
function liMostrarNuevaSolicitudUI() {
  limpiarCampos("txtInput", "txtCleanSelect");//limpio textos
  document.querySelector("#divEmpresaSolicitud").innerHTML = cargarSelEmpresas();//carga sel con las empresas
  document.querySelector("#divSolicitudDeCarga").style.display = "block";
  document.querySelector("#divConsultarPendientes").style.display = "none";
  document.querySelector("#divCancelarSolicitudDeCarga").style.display = "none";
  document.querySelector("#divInformacionEstadistica").style.display = "none";
}

//muestra solo el div con el formulario para consultar cargas pendientes (importador)
function liMostrarConsultarSolictudesUI() {
  limpiarCampos("txtInput", "txtCleanSelect");//limpio textos
  solicitudesPendientesUI();//cargo solicitudes pendientes
  document.querySelector("#divSolicitudDeCarga").style.display = "none";
  document.querySelector("#divConsultarPendientes").style.display = "block";
  document.querySelector("#divCancelarSolicitudDeCarga").style.display = "none";
  document.querySelector("#divInformacionEstadistica").style.display = "none";
}

//muestra solo el div con el formulario para cancelar cargas pendientes (importador)
function liMostrarCancelarSolicitudUI() {
  document.querySelector("#divSolicitudDeCarga").style.display = "none";
  document.querySelector("#divConsultarPendientes").style.display = "none";
  document.querySelector("#divCancelarSolicitudDeCarga").style.display = "block";
  document.querySelector("#divInformacionEstadistica").style.display = "none";
  document.querySelector("#divPendientesACancelar").innerHTML = cargarSelCancelarCarga();//carga sel con las cargas pendientes
}

//muestra solo el div con el formulario para consultar estadisticas (importador)
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
      if (solicitudesDeCarga[i].estado === "CANCELADA") cantCanceladas++;//cuanto total de solicitudes canceladas
    }
  }
  let porcentaje = (cantCanceladas * 100) / cantTotal; //calculo porcentaje
  if (isNaN(porcentaje)) porcentaje = 0;
  document.querySelector("#pPorceCancelaciones").innerHTML = `El porcentaje de cancelaciones contra el total de cargas es ${porcentaje.toFixed(2)}%`;
  document.querySelector("#pProxLlegadas").innerHTML = `<b>Calendario de las próximas llegadas: </b><br> ${calendarioProximasLlegadas()}`;
  document.querySelector("#pPorcentajeSoli").innerHTML = `<b>Porcentaje de las diferentes líneas:</b> <br>${porcentajeDeSolicitudes()}`;

}

/* Muestra solo div con el formulario para crear viaje (empresa) */
function liCrearViajeUI() {
  limpiarCampos("txtInput", "txtCleanSelect");//limpio textos
  document.querySelector("#divNuevoViaje").style.display = "block";
  document.querySelector("#divConfirmarPendientes").style.display = "none";
  document.querySelector("#divRollover").style.display = "none";
  document.querySelector("#divManifiestoCargar").style.display = "none";
  document.querySelector("#divHabilitarImportadores").style.display = "none";
  document.querySelector("#divListadoCargaPeligrosa").style.display = "none";
}

/* Muestra solo div con el formulario para asignar viaje a una solicitud (empresa) */
function liAsignarBuqueUI() {
  limpiarCampos("txtInput", "txtCleanSelect");//limpio textos
  cargarDatosSolicitudesPendientes();/*  Carga un select con todas las socitudes pendientes*/
  document.querySelector("#divNuevoViaje").style.display = "none";
  document.querySelector("#divConfirmarPendientes").style.display = "block";
  document.querySelector("#divRollover").style.display = "none";
  document.querySelector("#divManifiestoCargar").style.display = "none";
  document.querySelector("#divHabilitarImportadores").style.display = "none";
  document.querySelector("#divListadoCargaPeligrosa").style.display = "none";
}

/* Muestra solo div con el formulario para rollear (empresa) */
function liRolloverUI() {
  cargarSolicitudes();//cargo solicitudes posibles a rollear
  limpiarCampos("txtInput", "txtCleanSelect");//limpio textos
  document.querySelector("#divNuevoViaje").style.display = "none";
  document.querySelector("#divConfirmarPendientes").style.display = "none";
  document.querySelector("#divRollover").style.display = "block";
  document.querySelector("#divManifiestoCargar").style.display = "none";
  document.querySelector("#divHabilitarImportadores").style.display = "none";
  document.querySelector("#divListadoCargaPeligrosa").style.display = "none";
}

/* Muestra solo div con el formulario de manifiesto (empresa) */
function liManifiestoUI() {
  limpiarCampos("txtInput", "txtCleanSelect");//limpio textos
  mostrarViajesDeLineaCarga();//agrego options a select con viajes
  document.querySelector("#divNuevoViaje").style.display = "none";
  document.querySelector("#divConfirmarPendientes").style.display = "none";
  document.querySelector("#divRollover").style.display = "none";
  document.querySelector("#divManifiestoCargar").style.display = "block";
  document.querySelector("#divHabilitarImportadores").style.display = "none";
  document.querySelector("#divListadoCargaPeligrosa").style.display = "none";
}

/* Muestra solo div con el formulario de habilitar manifiesto (empresa) */
function liHablitarIUI() {
  document.querySelector("#divTableHablitarImportadores").innerHTML = generarTablaImportadores();//muestro tabla con importador a habilitar
  limpiarCampos("txtInput", "txtCleanSelect");//limpio textos
  document.querySelector("#divNuevoViaje").style.display = "none";
  document.querySelector("#divConfirmarPendientes").style.display = "none";
  document.querySelector("#divRollover").style.display = "none";
  document.querySelector("#divManifiestoCargar").style.display = "none";
  document.querySelector("#divHabilitarImportadores").style.display = "block";
  document.querySelector("#divListadoCargaPeligrosa").style.display = "none";
  let darVidaBoton = document.querySelectorAll('.habilitar');
  for (let darVidaBotonX of darVidaBoton) {
    darVidaBotonX.addEventListener("click", habilitarDeshabilitados);//cargo evento por row
  }
}

/* Muestra solo div con el formulario de lista peligrosa (empresa) */
function liListaPeligrosaUI() {
  limpiarCampos("txtInput", "txtCleanSelect");//limpio textos
  mostrarCargasPeligrosas();//agrego options a select con viajes
  document.querySelector("#divNuevoViaje").style.display = "none";
  document.querySelector("#divConfirmarPendientes").style.display = "none";
  document.querySelector("#divRollover").style.display = "none";
  document.querySelector("#divManifiestoCargar").style.display = "none";
  document.querySelector("#divHabilitarImportadores").style.display = "none";
  document.querySelector("#divListadoCargaPeligrosa").style.display = "block";
}

/* Boton para guardar solicitud de carga */
function btnUIMercaderiaUI() {
  let desc = document.querySelector("#txtDescrip").value;
  let tipo = document.querySelector("#txtTipoCarga").value;
  let puerto = document.querySelector("#txtPuerto").value;
  let cantContenedores = document.querySelector("#txtCantContenedores").value;
  let idEmpresa = encotrarNumero(document.querySelector("#txtIdEmpresa").value); //retorna el numero x -> 'estoesuntexto-x'

  if (validarDatosMercaderia(desc, tipo, puerto, cantContenedores, idEmpresa)) {
    let idNuevaMercaderia = ingresarMercaderia(desc, tipo, puerto, cantContenedores, idEmpresa, userOnline, "PENDIENTE");
    document.querySelector("#pIDGeneradoMercaderia").style.color = "black";
    document.querySelector("#pIDGeneradoMercaderia").innerHTML = `Se ingreso correctamente <br><strong>El id generado es: ${idNuevaMercaderia}</strong>`;
   
    limpiarCampos("txtInput", "txtCleanSelect");//limpio textos//limpio textos
    liMostrarNuevaSolicitudUI();//cargo de nuevo el formulario
  } else {
    document.querySelector("#pIDGeneradoMercaderia").innerHTML = `Los datos ingresados no son validos`;
    document.querySelector("#pIDGeneradoMercaderia").style.color = "red";
  }
}

/* Cargo tabla con solicitudes pendientes */
function solicitudesPendientesUI() {
  document.querySelector("#divTotalPendientes").innerHTML = tablaSoliPendientes();
}

/*  Al hacer click en el boton carga tabla con solicitudes pendientes*/
function buscarPendientesUI() {
  let buscar = document.querySelector("#txtBuscarPendientes").value;
  if (buscar === "") {
    document.querySelector("#divBuscarPendientes").innerHTML = `No deje campos vacios`;
  } else {
    busquedaSolicitudesPendientes(buscar);
  }
}

/* Al hacer click en el boton cancela carga */
function cancelarSolicitudUI() {
  let idCancelar = document.querySelector("#opCancelar").value;
  if (idCancelar === "") {
    document.querySelector("#pCancelarSoli").innerHTML = `No se encontraron resultados`;
  } else {
    limpiarCampos("txtInput", "txtCleanSelect");//limpio textos
    cancelarCargaDeshabilitarImportador(idCancelar);//si es la tercera carga cancelada cierra sesion
    document.querySelector("#divPendientesACancelar").innerHTML = cargarSelCancelarCarga();//actualiza informaicon select 
  }
}

/* Al hacer click guardo viaje/buque */
function btnNuevoViajeUI() {
  let nombreB = document.querySelector("#txtNombreBuque").value;
  let cantMax = document.querySelector("#txtCantMax").value;
  let fecha = document.querySelector("#txtFecha").value;
  if (validarIngresoBuque(nombreB, cantMax, fecha) === "") {
    ingresarBuque(nombreB, Number(cantMax), fecha, userOnline);//ingreso buque
    document.querySelector("#divMostrarAutomatico").innerHTML = `Se ingreso correctamente con el id ${buques[buques.length - 1].id}`;
    limpiarCampos("txtInput", "txtCleanSelect");//limpio textos
  } else {
    document.querySelector("#divMostrarAutomatico").innerHTML = validarIngresoBuque(nombreB, cantMax, fecha);//muestro el texto correspondiente a la validacion
  }
}

/* Muestro viajes disponibles para la carga selecionada */
function btnBuscarViajesProxUI() {
  limpiarCampos("txtInput", "txtCleanSelect");//limpio textos
  let pIDSolicitud = document.querySelector("#selCargasPendientes").value;
  if (pIDSolicitud != "") {
    document.querySelector("#divBuscarProximosViajes").style.display = "block";
    cargarDatosViajesProximos(Number(pIDSolicitud));
    let darVidaBoton = document.querySelectorAll('.buscarVPend');
    for (let darVidaBotonX of darVidaBoton) {
      darVidaBotonX.addEventListener("click", confirmarEstaCarga);//boton para confirmar carga por row de viaje
    }
  } else {
    document.querySelector("#pIDSolicitudConfirmada").innerHTML = `No se encontro ningun resultado`;
  }
}

/* (Boton de row) Asigna carga al buque */
function confirmarEstaCarga() {
  let botonSeleccionado = this;
  let idsolcitud = document.querySelector("#selCargasPendientes").value;
  let idBuque = botonSeleccionado.getAttribute("data-ViajesPendientes");
  if (idsolcitud != "") {
    idsolcitud = Number(idsolcitud);
    idBuque = Number(idBuque);
    confirmarCarga(idsolcitud, idBuque);//confirmo carga
    limpiarCampos("txtInput", "txtCleanSelect");//limpio textos
    document.querySelector("#pIDSolicitudConfirmada").innerHTML = `Se confirmo Correctamente`;
    document.querySelector("#divProximosViajes").innerHTML = "";
    document.querySelector("#divBuscarProximosViajes").style.display = "none";
  } else {
    document.querySelector("#pIDSolicitudConfirmada").innerHTML = `Todos los campos son requeridos`;
  }
}

/* Muestro en tabla los viajes dispobiles al que se puede mover */
function btnRolloverUI() {
  limpiarCampos("txtInput", "txtCleanSelect");//limpio textos
  let cancelar = document.querySelector("#selRollover").value;
  
  if (cancelar != "") {
    let mostrar = buscarViajeDisponible(cancelar);
    document.querySelector("#divbuscarNuevoViaje").style.display = "block";

    let darVidaBoton = document.querySelectorAll('.rolloverMover');
    for (let darVidaBotonX of darVidaBoton) {
      darVidaBotonX.addEventListener("click", cambiarViaje);//mover al viaje de esta row
    }
   
    if (!mostrar) {
      document.querySelector("#divMoverViaje").innerHTML = "";
      document.querySelector("#msgRollover").innerHTML = `No existen viajes posteriores a la fecha`;
    }

  } else {
    document.querySelector("#msgRollover").innerHTML = `Seleccione un viaje (*)`;
  }
}

/* Cambia solicitud del viaje actual al nuevo (rollea) */
function cambiarViaje() {
  let botonSeleccionado = this;
  let pCancelar = document.querySelector("#selRollover").value;
  pCancelar = encotrarNumero(pCancelar);//retorna el numero x -> 'estoesuntexto-x'
  let pMover = botonSeleccionado.getAttribute("data-idBuqueRollover");
  pMover = Number(pMover);//id del nuevo viaje a mover
  
  let encontrado = false;
  let i = 0;
  while (i < solicitudEnViajeConfirmada.length && !encontrado) {//busco la posicion de donde se encuentra el viaje con esa solicitud
    if (solicitudEnViajeConfirmada[i].id === pCancelar) {
      solicitudEnViajeConfirmada[i].idViaje = pMover;//cambio por el nuevo id de viaje
      encontrado = true;
    }
    i++;
  }
  
  if (encontrado) {
    document.querySelector("#divbuscarNuevoViaje").style.display = "none";
    document.querySelector("#divMoverViaje").innerHTML = "";
    document.querySelector("#msgRollover").innerHTML = `Se movio correctamente`;
    cargarSolicitudes();//atualizo select
  }

  limpiarCampos("txtInput", "txtCleanSelect");//limpio textos
  return encontrado;
}

/* Cargo tabla con las solicitudes del id seleccionado */
function btnBuscarEnManifiestoUI() {
  let nroViaje = document.querySelector("#selLineaDeCarga").value;
  if (nroViaje === "") {
    document.querySelector("#divManifiesto").innerHTML = `No se selecciono ninguna Linea de Carga`;
  } else {
    buscarEnManifiesto(nroViaje);//cargo tabla
  }
}

/* Cargo tabla con las solicitudes del id seleccionado */
function btnBuscarPeligrosaUI() {
  let nroViaje = document.querySelector("#selListadoPeligroso").value;
  if (nroViaje === "") {
    document.querySelector("#divTablaListaPeligrosa").innerHTML = `No se selecciono ningun viaje`;
  } else {
    buscarCargaPeligrosa(nroViaje);//cargo tabla
  }
}

