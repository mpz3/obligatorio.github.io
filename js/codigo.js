let usuarios = new Array();
let solicitudesDeCarga = new Array();
let buques = new Array();
let viajesConfirmados = new Array();
let userOnline = "";
let tipoUserG = "";

function inicio() {
  preCarga();
}

function preCarga() {
  /* usuarios */
  nuevoRegistro("camila", "fotoCM.jpg", "camila", "camilaCM123", "importador");
  nuevoRegistro("miguel", "fotoMP.jpg", "miguel", "miguelMP123", "importador");
  nuevoRegistro("importador3", "fotoMP.jpg", "userimportar3", "importadoR3", "importador");
  nuevoRegistro("importador4", "fotoMP.jpg", "userimportar4", "importadoR4", "importador");
  nuevoRegistro("importador5", "fotoMP.jpg", "userimportar5", "importadoR5", "importador");
  /* nuevoRegistro("importador6", "fotoMP.jpg", "1", "1", "importador"); */
  nuevoRegistro("empresa1", "empre.jpg", "userempresa1", "userempreSA1", "empresa");
  nuevoRegistro("empresa2", "empre.jpg", "userempresa2", "userempreSA2", "empresa");
  nuevoRegistro("empresa3", "empre.jpg", "userempresa3", "userempreSA3", "empresa");
  nuevoRegistro("empresa4", "empre.jpg", "userempresa4", "userempreSA4", "empresa");
  nuevoRegistro("empresa5", "empre.jpg", "userempresa5", "userempreSA5", "empresa");
  nuevoRegistro("empresa5", "empre.jpg", "1", "1", "empresa");
  nuevoRegistro("empresa5", "empre.jpg", "2", "2", "importador");
  /* solicitudes penditentes */
  ingresarMercaderia("Desc1", "CARGA_GENERAL", "OBB", 12, 0, "2");
  ingresarMercaderia("Desc1", "CARGA_GENERAL", "OBB", 12, 0, "2");
  ingresarMercaderia("Desc1", "CARGA_GENERAL", "OBB", 12, 0, "2");
  ingresarMercaderia("Desc1", "CARGA_GENERAL", "OBB", 12, 0, "camila");
  ingresarMercaderia("Desc2", "REFRIGERADO", "CBA", 32, 1, "miguel");
  ingresarMercaderia("Desc3", "CARGA_GENERAL", "ULE", 12, 2, "userimportar3");
  ingresarMercaderia("Desc4", "CARGA_PELIGROSA", "ATE", 42, 4, "userimportar4");
  /*Crear buques */
  ingresarBuque("BRA", 5003, "2023-11-15", "userempresa2");
  ingresarBuque("ORO", 3300, "2023-11-14", "userempresa3");
  ingresarBuque("PLATA", 1003, "2023-11-17", "userempresa4");
  ingresarBuque("BARCO", 530, "2023-11-16", "userempresa5");
}

function buscarUser(pUser, pPass) {
  let i = 0;
  let encontrado = false;
  pUser = pUser.toLowerCase()
  while (!encontrado && i < usuarios.length) {
    if (usuarios[i].user.toLowerCase() === pUser && usuarios[i].contraseña === pPass && usuarios[i].estado === "habilitado") {
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
  user.estado = "habilitado";
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
  if (pUser === "") {
    document.querySelector("#errorUsuarioLogin").style.display = "block";
    document.querySelector("#errorUsuarioLogin").innerHTML = `Campo Obligatorio (*)`;
    error = true;
  } else {
    document.querySelector("#errorUsuarioLogin").style.display = "none";
  }
  if (pPass === "") {
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
/* lipiar campos */
function limpiarCampos(pClass, pClassSelect) {
  let inputss = document.querySelectorAll('.' + pClass);
  let tabless = document.querySelectorAll('.cleanTable');
  for (let inputX of inputss) {
    inputX.value = "";
  }
  if (pClassSelect != "") {
    let selectt = document.querySelectorAll('.' + pClassSelect);
    for (let selectX of selectt) {
      selectX.value = "-1";
    }
  }

  for (let tableX of tabless) {
    tableX.innerHTML = "";
  }
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

function buscarEmpresa(pID) {
  let i = 0;
  while (i < usuarios.length) {
    if (usuarios[i].id === Number(pID)) {
      return true;
    }
    i++;
  }
  return false
}

function ingresarMercaderia(pDesc, pTipo, pPuerto, pCantContenedores, pIEmpresa, pUsuario) {
  let nuevaSolicitud = new SolicitudCarga();
  nuevaSolicitud.id = SolicitudCarga.idSolicitudCarga;
  nuevaSolicitud.estado = "Pendiente";
  nuevaSolicitud.descripcion = pDesc;
  nuevaSolicitud.tipo = pTipo;
  nuevaSolicitud.puerto = pPuerto;
  nuevaSolicitud.cantidadContenedores = pCantContenedores;
  nuevaSolicitud.idEmpresa = pIEmpresa;
  nuevaSolicitud.userImportador = pUsuario;
  solicitudesDeCarga.push(nuevaSolicitud);
  SolicitudCarga.idSolicitudCarga++;
  return SolicitudCarga.idSolicitudCarga - 1;
}

function busquedaSolicitudesPendientes(pBusqueda) {
  let tabla = `<table  style="text-align: center;"><tr><th>ID</th><th>Estado</th><th>Descripcion</th><th>Tipo</th><th>Puerto Origen</th><th>Nro de contenedores</th><th>ID Empresa</th></tr>`;
  pBusqueda = pBusqueda.toLowerCase();
  for (let i = 0; i < solicitudesDeCarga.length; i++) {
    let descripcionMinus = solicitudesDeCarga[i].descripcion.toLowerCase();
    if (solicitudesDeCarga[i].id === Number(pBusqueda) || descripcionMinus === pBusqueda || descripcionMinus.includes(pBusqueda)) {
      tabla += `<tr><td>${solicitudesDeCarga[i].id}</td><td>${solicitudesDeCarga[i].estado}</td><td>${solicitudesDeCarga[i].descripcion}</td><td>${solicitudesDeCarga[i].tipo}</td><td>${solicitudesDeCarga[i].puerto}</td><td>${solicitudesDeCarga[i].cantidadContenedores}</td><td>${solicitudesDeCarga[i].idEmpresa}</td></tr>`;
    }
  }
  tabla += `</table>`;
  document.querySelector("#divBuscarPendientes").innerHTML = tabla;
}
function tablaSoliPendientes() {
  let tabla = `<table  style="text-align: center;"><tr><th>ID</th><th>Estado</th><th>Descripcion</th><th>Tipo</th><th>Puerto Origen</th><th>Nro de contenedores</th><th>ID Empresa</th></tr>`;
  for (let i = 0; i < solicitudesDeCarga.length; i++) {
    if (solicitudesDeCarga[i].userImportador === userOnline) {
      tabla += `<tr><td>${solicitudesDeCarga[i].id}</td><td>${solicitudesDeCarga[i].estado}</td><td>${solicitudesDeCarga[i].descripcion}</td><td>${solicitudesDeCarga[i].tipo}</td><td>${solicitudesDeCarga[i].puerto}</td><td>${solicitudesDeCarga[i].cantidadContenedores}</td><td>${solicitudesDeCarga[i].idEmpresa}</td></tr>`;
    }
  }
  tabla += `</table>`;
  return tabla;
}

function ingresarBuque(pNombreB, pCantMax, pFecha, pUser) {
  let nuevoViaje = new ViajeBuque();
  nuevoViaje.id = ViajeBuque.idViajeBuque;
  nuevoViaje.idEmpresa = getIdUser(pUser);
  nuevoViaje.nombreBuque = pNombreB;
  nuevoViaje.cargaMaxima = pCantMax;
  nuevoViaje.cargaTotal = 0;
  nuevoViaje.fechaLlegada = pFecha;
  buques.push(nuevoViaje);
  ViajeBuque.idViajeBuque++;
}

function validarIngresoBuque(pnombreB, pcantMax, pfecha) {
  let fechaHoraSistema = new Date();
  fechaHoraSistema.setHours(0);
  fechaHoraSistema.setMinutes(0);
  fechaHoraSistema.setSeconds(0);
  console.log(new Date(`"${pfecha}"`) >= fechaHoraSistema);
  if (pnombreB != "" && pcantMax != "" && !isNaN(pcantMax) && pfecha != "" && new Date(`"${pfecha}"`) >= fechaHoraSistema) {
    return true;
  }
  return false;
}


function cargarDatosSolicitudesPendientes() {
  let opciones = `<select id="selCargasPendientes"> <option value="">Seleccione </option>`;
  for (let i = 0; i < solicitudesDeCarga.length; i++) {
    let soli = solicitudesDeCarga[i];
    if (soli.estado === "Pendiente" && !imporadorDesHabilitado(soli.userImportador)) {
      opciones += `<option value="${soli.id}">Solicitud Nro ${soli.id} de tipo ${soli.tipo}</option>`;
    }
  }
  opciones += "</select>";
  document.querySelector("#divCargasPendientes").innerHTML = opciones;
}

function imporadorDesHabilitado(pUserImportador) {
  let i = 0;
  while (i < usuarios.length) {
    if (usuarios[i].user === pUserImportador && usuarios[i].estado === "Deshabilitado") {
      return true;
    }
    i++;
  }
  return false

}

function cargarDatosViajesProximos(pIDSolicitud) {
  let fechaHoraSistema = new Date();
  fechaHoraSistema.setHours(0);
  fechaHoraSistema.setMinutes(0);
  fechaHoraSistema.setSeconds(0);
  let tabla = `<table>
  <tr><th>ID</th>
  <th>Buque</th>
  <th>Fecha llegada</th>
  <th>Accion</th><tr>`;
  for (let i = 0; i < buques.length; i++) {
    if (new Date(`"${buques[i].fechaLlegada}`) > fechaHoraSistema && buques[i].cargaMaxima >= solicitudesDeCarga[pIDSolicitud].cantidadContenedores) {
      if ((buques[i].cargaTotal + solicitudesDeCarga[pIDSolicitud].cantidadContenedores) <= buques[i].cargaMaxima) {
        tabla += `<tr><td>${buques[i].id}</td>
        <td>${buques[i].nombreBuque}</td>
        <td>${buques[i].fechaLlegada}</td>
        <td><input type="button" class="buscarVPend btnForma" data-ViajesPendientes="${buques[i].id}" value="CONFIRMAR"/></td><tr>`;
      }
    }
  }
  tabla += `</table>`;
  document.querySelector("#divProximosViajes").innerHTML = tabla;
}

function confirmarEstaCarga() {
  let botonSeleccionado = this;
  let idsolcitud = document.querySelector("#selCargasPendientes").value;
  let idBuque = botonSeleccionado.getAttribute("data-ViajesPendientes");
  if (idsolcitud != "") {
    idsolcitud = Number(idsolcitud);
    idBuque = Number(idBuque);
    confirmarCarga(idsolcitud, idBuque);
    document.querySelector("#pIDSolicitudConfirmada").innerHTML = `Se confirmo Correctamente`;
    document.querySelector("#divProximosViajes").innerHTML = "";
    document.querySelector("#divBuscarProximosViajes").style.display = "none";
    limpiarCampos("txtInput", "txtCleanSelect");
  } else {
    document.querySelector("#pIDSolicitudConfirmada").innerHTML = `Todos los campos son requeridos`;
  }
}

function confirmarCarga(pIdsolcitudAprobada, pEnElviaje) {
  let carga = new CargaConfirmada();
  carga.id = CargaConfirmada.idCargaConfirmada;
  carga.idViaje = pEnElviaje;
  carga.idCarga = pIdsolcitudAprobada;
  viajesConfirmados.push(carga);
  cambiarEstado(pIdsolcitudAprobada, "CONFIRMADA");
  cargarDatosSolicitudesPendientes();//para quitarla del select y volver con las pendientes
  CargaConfirmada.idCargaConfirmada++;
}

function cambiarEstado(pIDCarga, pEstado) {
  let encontrado = false;
  let i = 0;
  while (i < solicitudesDeCarga.length && !encontrado) {
    if (solicitudesDeCarga[i].id === pIDCarga) {
      solicitudesDeCarga[i].estado = pEstado;
      encontrado = true;
    }
    i++;
  }
}

function cargarSolicitudes() {
  let select = `<select id="selRollover"> <option value="">Seleccione</option>`;
  for (let i = 0; i < viajesConfirmados.length; i++) {
    select += `<option value="idViajeConfir-${viajesConfirmados[i].id}">Cancelar viaje ${viajesConfirmados[i].idCarga} de buque ${viajesConfirmados[i].idViaje}</option>`;
  }
  select += "</select>";
  document.querySelector("#divSelRollover").innerHTML = select;
}

function cargarSelCancelarCarga() {
  let opciones = `<select id="opCancelar"> <option value="">Seleccione para cancelar </OPTION>`;
  for (let i = 0; i < solicitudesDeCarga.length; i++) {
    let soli = solicitudesDeCarga[i];
    if (soli.estado === "Pendiente" && soli.userImportador === userOnline) {
      opciones += `<option value="${soli.id}">Cancelar nro ${soli.id} de empresa nro ${soli.idEmpresa} </option>`;
    }
  }
  opciones += "</select>";
  return opciones;
}

function buscarViajePorIDDeConfirmacion(pIDCancelar) {
  let newA = new Array();
  let i = 0;
  let encontrado = false;
  while (i < viajesConfirmados.length || !encontrado) {
    if (viajesConfirmados[i].id === pIDCancelar) {
      newA.push(viajesConfirmados[i].idCarga);
      newA.push(viajesConfirmados[i].idViaje);
      encontrado = true;
    }
    i++;
  }
  return newA;
}

function buscarViajeDisponible(pIDCancelar) {
  let idConfirmacion = Number(pIDCancelar.split("idViajeConfir-")[1]);//este es el id del array carga confirmada
  let select = `<select id="selMoverViaje"> <option value="">Seleccione</option>`;
  let viaje = buscarViajePorIDDeConfirmacion(idConfirmacion);
  for (let i = 0; i < buques.length; i++) {
    if (buques[i].cargaMaxima >= buques[i].cargaTotal + solicitudesDeCarga[idConfirmacion].cantidadContenedores && buques[i].fechaLlegada > buques[viaje[1]].fechaLlegada) {
      select += `<option value="moverABuque-${buques[i].id}">Mover a buque ${buques[i].id}</option>`;
    }
  }
  select += "</select>";
  document.querySelector("#divMoverViaje").innerHTML = select;
}

function cambiarViaje() {
  let pCancelar = document.querySelector("#selRollover").value;
  let pMover = document.querySelector("#selMoverViaje").value;
  pCancelar = Number(pCancelar.split("idViajeConfir-")[1]);//idViajeConfir-x
  pMover = Number(pMover.split("moverABuque-")[1]);//moverABuque-x
  let encontrado = false;
  let i = 0;
  while (i < viajesConfirmados.length && !encontrado) {
    if (viajesConfirmados[i].id === pCancelar) {
      viajesConfirmados[i].idViaje = pMover;
      encontrado = true;
    }
    i++;
  }
  return encontrado;
}


function buscarEnLista(pIDViaje, pArrayConfirmados) {//esta funcion busca en un array cualquiera el dato que le pasemos
  let i = 0;
  while (i < pArrayConfirmados.length) {
    if (pIDViaje === pArrayConfirmados[i]) {
      return true;
    }
    i++;
  }
  return false;
}

function buscarEnManifiesto(pNroViaje) {
  let tabla = `<table><tr><th><strong>origen</strong></th><th><strong>Contenedor</strong></th><th><strong>Importador</strong></th><th><strong>Descripción</strong></th><th><strong>Tipo de carga</strong></th></tr>`;
  pNroViaje = Number(pNroViaje.split("manifiestoViaje-")[1]);//este es el id del viaje
  for (let i = 0; i < viajesConfirmados.length; i++) {
    if (viajesConfirmados[i].idViaje === pNroViaje) {
      let idDeCarga = viajesConfirmados[i].idCarga;
      //buscar el nombre del importador, no el user
      tabla += `<tr><td>${solicitudesDeCarga[idDeCarga].puerto}</td>
      <td>${solicitudesDeCarga[idDeCarga].cantidadContenedores}</td>
      <td>${solicitudesDeCarga[idDeCarga].userImportador}</td>
      <td>${solicitudesDeCarga[idDeCarga].descripcion}</td>
      <td>${solicitudesDeCarga[idDeCarga].tipo}</td><tr>`;
    }
  }
  tabla += `</table>`;
  document.querySelector("#divManifiesto").innerHTML = tabla;
}

function cancelarCargaDeshabilitarImportador(pidCancelar) {
  pidCancelar = Number(pidCancelar);
  if (solicitudesDeCarga[pidCancelar].estado === "Pendiente") {
    solicitudesDeCarga[pidCancelar].estado = "Cancelada";
    if (cambiarEstadoImportador(solicitudesDeCarga[pidCancelar].userImportador)) {//busco el id de ese importador y lo deshabilito
      let idUser = getIdUser(solicitudesDeCarga[pidCancelar].userImportador);
      usuarios[idUser].estado = "Deshabilitado";
      cerrarSesion();
    }
    document.querySelector("#pCancelarSoli").innerHTML = `Se cancelo la solicitud ${pidCancelar} con exito`;
    solicitudesPendientesUI();
  }
}

function cambiarEstadoImportador(pUser) {//si es 3 hay que cambiar de estado a Deshabilitado
  let cantidadCanceladas = 0;
  for (let i = 0; i < solicitudesDeCarga.length; i++) {
    if (solicitudesDeCarga[i].userImportador === pUser && solicitudesDeCarga[i].estado === "Cancelada") {
      cantidadCanceladas++;
    }
  }
  return (cantidadCanceladas >= 3);
}

function getIdUser(pUser) {//busco id segun su usuario 
  let i = 0;
  let encontrado = false;
  while (i < usuarios.length || !encontrado) {
    if (usuarios[i].user === pUser) {
      return usuarios[i].id;
    }
    i++;
  }
  return "";
}


function mostrarViajesDeLineaCarga() {
  let pSelect = document.querySelector("#selLineaDeCarga");
  document.querySelector("#selLineaDeCarga").innerHTML = "";//limpia las opciones y las carga de nuevo para que no se repitan
  let option = `<option value="">Seleccione una opcion</option>`;
  let viajesCargados = new Array();//guardo los que ya cargue en el select
  for (let i = 0; i < viajesConfirmados.length; i++) {
    if (!buscarEnLista(viajesConfirmados[i].idViaje, viajesCargados)) {
      option += `<option value="manifiestoViaje-${viajesConfirmados[i].idViaje}">Viaje nro ${viajesConfirmados[i].idViaje} </option>`;
      viajesCargados.push(viajesConfirmados[i].idViaje);//guardo en el array para saber que este ya lo cargue
    }
  }
  pSelect.insertAdjacentHTML("beforeend", option);
}


function mostrarCargasPeligrosas() {
  let pSelect = document.querySelector("#selListadoPeligroso");
  document.querySelector("#selListadoPeligroso").innerHTML = "";//limpia las opciones y las carga de nuevo para que no se repitan cada vez que hago click
  let option = `<option value="">Seleccione una opcion</option>`;
  let cargasPeligrosasCargada = new Array();//guardo los que ya cargue en el select
  for (let i = 0; i < viajesConfirmados.length; i++) {
    if (!buscarEnLista(viajesConfirmados[i].idViaje, cargasPeligrosasCargada)) {
      option += `<option value="${viajesConfirmados[i].idViaje}">Viaje nro ${viajesConfirmados[i].idViaje}</option>`;
      cargasPeligrosasCargada.push(viajesConfirmados[i].idViaje);//guardo en el array para saber que este ya lo cargue
    }
  }
  pSelect.insertAdjacentHTML("beforeend", option);
}


function buscarCargaPeligrosa(pViaje) {
  pViaje = Number(pViaje);
  let tabla = `<table>
  <tr><th>ID</th>
  <th>Estado</th>
  <th>Descripcion</th>
  <th>Tipo</th>
  <th>Puerto</th>
  <th>Cantidad Contenedores</th>
  <th>Nro Empresa</th>
  <th>Importador</th><tr>`;
  for (let i = 0; i < viajesConfirmados.length; i++) {
    if (viajesConfirmados[i].idViaje === pViaje) {
      let idDeCarga = viajesConfirmados[i].idCarga;
      //[TODO] buscar el nombre del importador, no el user
      tabla += `<tr><td>${solicitudesDeCarga[idDeCarga].id}</td>
      <td>${solicitudesDeCarga[idDeCarga].estado}</td>
      <td>${solicitudesDeCarga[idDeCarga].descripcion}</td>
      <td>${solicitudesDeCarga[idDeCarga].tipo}</td>
      <td>${solicitudesDeCarga[idDeCarga].puerto}</td>
      <td>${solicitudesDeCarga[idDeCarga].cantidadContenedores}</td>
      <td>${solicitudesDeCarga[idDeCarga].idEmpresa}</td>
      <td>${solicitudesDeCarga[idDeCarga].userImportador}</td><tr>`;
    }
  }
  tabla += `</table>`;
  document.querySelector("#divTablaListaPeligrosa").innerHTML = tabla;
}


function generarTablaImportadores() {
  let tabla = `<table>
  <tr><th>ID</th>
  <th>Importador</th>
  <th>Accion</th><tr>`;
  for (let i = 0; i < usuarios.length; i++) {
    if (usuarios[i].estado === "Deshabilitado") {
      tabla += `<tr><td>${usuarios[i].id}</td>
      <td>${usuarios[i].nombre}</td>
      <td><input type="button" class="habilitar btnForma" data-idUsuario="${usuarios[i].id}" value="HABILITAR"/></td><tr>`;
    }
  }
  tabla += `</table>`;
  return tabla;
}
function habilitarDeshabilitados() {
  let botonSeleccionado = this;
  let idImportador = botonSeleccionado.getAttribute("data-idUsuario");
  usuarios[idImportador].estado = "habilitado";
  for (let i = 0; i < solicitudesDeCarga.length; i++) {
    if (solicitudesDeCarga[i].userImportador === usuarios[idImportador].user) {
      solicitudesDeCarga[i].estado = "Ignorada";
    }
  }
  document.querySelector("#divTableHablitarImportadores").innerHTML = generarTablaImportadores();
}
