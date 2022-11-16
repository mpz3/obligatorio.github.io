let usuarios = new Array();//Todos los usuarios
let solicitudesDeCarga = new Array();//Todas las solicitudes de carga
let buques = new Array(); //viajes de buques
let solicitudEnViajeConfirmada = new Array(); //guarda las carga confirmadas
let userOnline = ""; //Usuario logueado
let tipoUserG = ""; //Tipo de usuario logueado

function inicio() {
  preCarga();
}

function preCarga() {
  /* 5 importadores */
  validarNuevoRegistro("camila", "importador1.png", "camila", "camilaCM123", "importador");//0
  validarNuevoRegistro("miguel", "importador2.png", "miguel", "miguelMP123", "importador");//1
  validarNuevoRegistro("importador3", "importador3.jppngg", "userimportar3", "importadoR3", "importador");
  validarNuevoRegistro("importador4", "importador4.png", "userimportar4", "importadoR4", "importador");
  validarNuevoRegistro("importador5", "importador5.png", "userimportar5", "importadoR5", "importador");

  /* 4 líneas de carga */
  validarNuevoRegistro("empresa1", "4.jpg", "userempresa1", "userempreSA1", "empresa");//5
  validarNuevoRegistro("empresa2", "8.jpg", "userempresa2", "userempreSA2", "empresa");//6
  validarNuevoRegistro("empresa3", "7.jpg", "userempresa3", "userempreSA3", "empresa");
  validarNuevoRegistro("empresa4", "5.jpg", "userempresa4", "userempreSA4", "empresa");

  /*Viajes con diferentes nombres de buque y fechas de llegada.*/
  validarPreCargaIngresarBuque("BARCO", 530, "2022-11-26", "userempresa1");//0
  validarPreCargaIngresarBuque("BRA", 5003, "2022-12-15", "userempresa2");//1
  validarPreCargaIngresarBuque("ORO", 3300, "2022-11-28", "userempresa1");//2
  validarPreCargaIngresarBuque("PLATA", 1003, "2023-01-05", "userempresa2");

  /* Solicitudes -> Descripcion, tipo, nombre buque, cantidad contenedores, idEmpresa, userimportador, estado */
  validarPreCargaMercaderia("Desc1", "CARGA_GENERAL", "OBB", 22, 5, "camila", "PENDIENTE");
  validarPreCargaMercaderia("Desc1", "REFRIGERADO", "OBB", 61, 6, "camila", "PENDIENTE");
  validarPreCargaMercaderia("Desc1", "CARGA_PELIGROSA", "OBB", 24, 5, "camila", "PENDIENTE");

  validarPreCargaMercaderia("Desc2", "CARGA_GENERAL", "CBA", 98, 6, "miguel", "PENDIENTE");
  validarPreCargaMercaderia("Desc2", "CARGA_GENERAL", "CBA", 16, 5, "miguel", "PENDIENTE");
  validarPreCargaMercaderia("Desc2", "REFRIGERADO", "CBA", 65, 6, "miguel", "PENDIENTE");

  validarPreCargaMercaderia("Desc3", "CARGA_GENERAL", "ULE", 12, 5, "userimportar3", "PENDIENTE");
  validarPreCargaMercaderia("Desc4", "CARGA_PELIGROSA", "ALA", 42, 6, "userimportar4", "PENDIENTE");

  validarPreCargaMercaderia("Desc5", "REFRIGERADO", "AAA", 10, 5, "camila", "CONFIRMADA");//8
  validarPreCargaMercaderia("Desc6", "CARGA_PELIGROSA", "TDX", 10, 6, "miguel", "CONFIRMADA");//9
  validarPreCargaMercaderia("Desc7", "CARGA_PELIGROSA", "RWD", 64, 5, "miguel", "CONFIRMADA");//10
  /* ID de solicitudesDeCarga - id de buques  */
  confirmarCarga(8, 0);
  confirmarCarga(9, 1);
  confirmarCarga(10, 2);

  validarPreCargaMercaderia("Desc8", "CARGA_GENERAL", "TTT", 10, 0, "userimportar3", "IGNORADA");
  validarPreCargaMercaderia("Desc9", "REFRIGERADO", "FRE", 64, 1, "userimportar5", "IGNORADA");
}

/* valido ingreso de usuario */
function validarNuevoRegistro(pNombre, pfoto, pUsuario, pPass, pTipo) {
  if (pNombre !== "" && pfoto !== "" && pUsuario !== "" && pPass !== "" && pTipo !== "")
    nuevoRegistro(pNombre, pfoto, pUsuario, pPass, pTipo)
}

/* valido ingreso de solicitud */
function validarPreCargaMercaderia(pDesc, pTipo, pPuerto, pCantContenedores, pIEmpresa, pUsuario, pEstado) {
  if (pDesc !== "" && pTipo !== "" && pPuerto !== "" && pCantContenedores !== "" && !isNaN(pCantContenedores) && pIEmpresa !== "" && !isNaN(pIEmpresa) && pUsuario !== "" && pEstado !== "")
    ingresarMercaderia(pDesc, pTipo, pPuerto, pCantContenedores, pIEmpresa, pUsuario, pEstado);
}

/* valido ingreso de viaje/buque */
function validarPreCargaIngresarBuque(pNombreB, pCantMax, pFecha, pUser) {
  if (pNombreB !== "" && pCantMax !== "" && !isNaN(pCantMax) && pFecha !== "" && pUser !== "")
    ingresarBuque(pNombreB, pCantMax, pFecha, pUser);
}

/* valido que el usuario y contraseña coincidan */
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

/* se registra nuevo usuario*/
function nuevoRegistro(pNombre, pfoto, pUsuario, pPass, pTipo) {
  let user = new Usuario();
  user.id = Usuario.idUsuario;
  user.nombre = pNombre;
  user.foto = pfoto;
  user.user = pUsuario;
  user.contraseña = pPass;
  user.tipo = pTipo;
  user.estado = "habilitado";
  usuarios.push(user);
  Usuario.idUsuario++;
}

/* validaciones de formulario registro*/
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

/* validaciones de formulario login*/
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

/* valida que la contraseña en el registro contenga los requerimientos*/
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

/* se pasa la ruta del archivo y retorna el nombre con su extencion*/
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

/* limpiar todos los campos */
function limpiarCampos(pClass, pClassSelect) {
  let inputss = document.querySelectorAll('.' + pClass);
  let tabless = document.querySelectorAll('.cleanTable');
  let parrafos = document.querySelectorAll('.clearP');
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
  for (let parrafo of parrafos) {
    parrafo.innerHTML = "";
  }
}

/* limpiar ingreso de solicitud de carga y marca con borde rojo el campo que es invalido */
function validarDatosMercaderia(pDesc, pTipo, pPuerto, pCantContenedores, pIEmpresa) {
  if (pDesc === "" || pTipo === "" || pPuerto === "" || pCantContenedores === "" || isNaN(pCantContenedores) || pCantContenedores <= 0 || pIEmpresa === "" || isNaN(pIEmpresa)) {
    if (pDesc === "") document.querySelector("#txtDescrip").style.borderColor = "red";
    else document.querySelector("#txtDescrip").style.borderColor = "black";

    if (pTipo === "") document.querySelector("#txtTipoCarga").style.borderColor = "red";
    else document.querySelector("#txtTipoCarga").style.borderColor = "black";

    if (pPuerto === "") document.querySelector("#txtPuerto").style.borderColor = "red";
    else document.querySelector("#txtPuerto").style.borderColor = "black";

    if (pCantContenedores === "" || isNaN(pCantContenedores) || pCantContenedores <= 0) document.querySelector("#txtCantContenedores").style.borderColor = "red";
    else document.querySelector("#txtCantContenedores").style.borderColor = "black";

    if (pIEmpresa === "") document.querySelector("#txtIdEmpresa").style.borderColor = "red";
    else document.querySelector("#txtIdEmpresa").style.borderColor = "black";

    return false;
  }
  /* Cuando son todos correctos les quita el borde rojo */
  let darVidaBoton = document.querySelectorAll('.txtInput');
  let i = 0;
  for (let darVidaBotonX of darVidaBoton) {
    let id = document.querySelectorAll('.txtInput')[i].id;
    document.querySelector(`#${id}`).style.borderColor = "black";
    i++;
  }
  return true;
}

/*  Carga select con las empresas existentes*/
function cargarSelEmpresas() {
  let opciones = `<select id="txtIdEmpresa"> <option value="">Seleccione </option>`;
  for (let i = 0; i < usuarios.length; i++) {
    if (usuarios[i].tipo === "empresa") {
      opciones += `<option value="idEmpresaSoli-${usuarios[i].id}">Empresa ${usuarios[i].id}</option>`;
    }
  }
  opciones += "</select>";
  return opciones;
}

/* Ingresa en el array solicitudesDeCarga la solicitud del importador*/
function ingresarMercaderia(pDesc, pTipo, pPuerto, pCantContenedores, pIEmpresa, pUsuario, pEstado) {
  let nuevaSolicitud = new SolicitudCarga();
  nuevaSolicitud.id = SolicitudCarga.idSolicitudCarga;
  nuevaSolicitud.estado = pEstado;
  nuevaSolicitud.descripcion = pDesc;
  nuevaSolicitud.tipo = pTipo;
  nuevaSolicitud.puerto = pPuerto;
  nuevaSolicitud.cantidadContenedores = pCantContenedores;
  nuevaSolicitud.idEmpresa = Number(pIEmpresa);
  nuevaSolicitud.userImportador = pUsuario;
  solicitudesDeCarga.push(nuevaSolicitud);
  SolicitudCarga.idSolicitudCarga++;
  return SolicitudCarga.idSolicitudCarga - 1;
}

/* Tabla de busqueda de las solicitudes pendientes del usuario online en una tabla*/
function busquedaSolicitudesPendientes(pBusqueda) {
  let tabla = `<table style="text-align: center;"><tr><th>ID</th><th>Estado</th><th>Descripcion</th><th>Tipo</th><th>Puerto Origen</th><th>Nro de contenedores</th><th>ID Empresa</th></tr>`;
  //paso a minusculas
  pBusqueda = pBusqueda.toLowerCase();
  for (let i = 0; i < solicitudesDeCarga.length; i++) {
    let descripcionMinus = solicitudesDeCarga[i].descripcion.toLowerCase();
    if (solicitudesDeCarga[i].userImportador === userOnline && (solicitudesDeCarga[i].id === Number(pBusqueda) || descripcionMinus === pBusqueda || descripcionMinus.includes(pBusqueda))) {
      tabla += `<tr><td>${solicitudesDeCarga[i].id}</td><td>${solicitudesDeCarga[i].estado}</td><td>${solicitudesDeCarga[i].descripcion}</td><td>${solicitudesDeCarga[i].tipo}</td><td>${solicitudesDeCarga[i].puerto}</td><td>${solicitudesDeCarga[i].cantidadContenedores}</td><td>${solicitudesDeCarga[i].idEmpresa}</td></tr>`;
    }
  }
  tabla += `</table>`;
  document.querySelector("#divBuscarPendientes").innerHTML = tabla;
}

/* Tabla con todas las solicitudes pendientes del usuario online*/
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

/* Ingresa viaje en el array buques*/
function ingresarBuque(pNombreB, pCantMax, pFecha, pUser) {
  let nuevoViaje = new ViajeBuque();
  nuevoViaje.id = ViajeBuque.idViajeBuque;
  nuevoViaje.idEmpresa = getIdUser(pUser);
  nuevoViaje.nombreBuque = pNombreB;
  nuevoViaje.cargaMaxima = pCantMax;
  nuevoViaje.fechaLlegada = pFecha;
  buques.push(nuevoViaje);
  ViajeBuque.idViajeBuque++;
}

/* Valida ingreso de buque */
function validarIngresoBuque(pnombreB, pcantMax, pfecha) {
  let fechaHoraSistema = new Date();//Fecha de hoy
  fechaHoraSistema.setHours(0);//setea la hora de las fecha todo a 00:00:00
  fechaHoraSistema.setMinutes(0);
  fechaHoraSistema.setSeconds(0);
  if (pnombreB != "" && pcantMax != "" && !isNaN(pcantMax) && pcantMax > 0 && pfecha != "" && new Date(`"${pfecha}"`) > fechaHoraSistema) {
    return "";
  } else if (new Date(`"${pfecha}"`) <= fechaHoraSistema) {
    return "La fecha es menor al dia de hoy, ingrese una posterior";
  } else {
    return "Los campos son invalidos";
  }
}

/*  Carga un select con todas las socitudes pendientes de los usuarios habilitados*/
function cargarDatosSolicitudesPendientes() {
  let opciones = `<select id="selCargasPendientes"> <option value="">Seleccione </option>`;
  for (let i = 0; i < solicitudesDeCarga.length; i++) {
    let soli = solicitudesDeCarga[i];
    if (soli.estado === "PENDIENTE" && !imporadorDesHabilitado(soli.userImportador)) {
      opciones += `<option value="${soli.id}">Solicitud Nro ${soli.id} de tipo ${soli.tipo}</option>`;
    }
  }
  opciones += "</select>";
  document.querySelector("#divCargasPendientes").innerHTML = opciones;
}

/*  Busca si el usuario del importado esta Deshabilitado */
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

/* (Empresa) Devuelve tabla con los viajes a asigar para la solicitud */
function cargarDatosViajesProximos(pIDSolicitud) {
  let fechaHoraSistema = new Date();//Fecha de hoy
  fechaHoraSistema.setHours(0);//setea la hora de las fecha todo a 00:00:00
  fechaHoraSistema.setMinutes(0);
  fechaHoraSistema.setSeconds(0);
  let tabla = `<table>
  <tr><th>ID</th>
  <th>Buque</th>
  <th>Fecha llegada</th>
  <th>Accion</th><tr>`;
  for (let i = 0; i < buques.length; i++) {
    if ((new Date(`"${buques[i].fechaLlegada}`) > fechaHoraSistema && buques[i].cargaMaxima >= totalCargaActualBuque(buques[i].id) + solicitudesDeCarga[pIDSolicitud].cantidadContenedores)) {
      tabla += `<tr><td>${buques[i].id}</td>
        <td>${buques[i].nombreBuque}</td>
        <td>${buques[i].fechaLlegada}</td>
        <td><input type="button" class="buscarVPend btnForma" data-ViajesPendientes="${buques[i].id}" value="CONFIRMAR"/></td><tr>`;
    }
  }
  tabla += `</table>`;
  document.querySelector("#divProximosViajes").innerHTML = tabla;
}

/* Ingresa en el array solicitudEnViajeConfirmada el id del viaje y el id de carga que tendra*/
function confirmarCarga(pIdsolcitudAprobada, pEnElviaje) {
  let carga = new CargaConfirmada();
  carga.id = CargaConfirmada.idCargaConfirmada;
  carga.idViaje = pEnElviaje;
  carga.idCarga = pIdsolcitudAprobada;
  solicitudEnViajeConfirmada.push(carga);
  cambiarEstado(pIdsolcitudAprobada, "CONFIRMADA");
  cargarDatosSolicitudesPendientes();//para quitarla recien confirmada del select y recargar las pendientes
  CargaConfirmada.idCargaConfirmada++;
}

/* Cambia la solicitud de estado al estado pasado por parametro */
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

/* Carga select para seleccionar los viajes confirmados que se quiere rollear*/
function cargarSolicitudes() {
  let select = `<select id="selRollover"> <option value="">Seleccione</option>`;
  for (let i = 0; i < solicitudEnViajeConfirmada.length; i++) {
    select += `<option value="idViajeConfir-${solicitudEnViajeConfirmada[i].id}">Rollear viaje ${solicitudEnViajeConfirmada[i].idCarga} de buque ${solicitudEnViajeConfirmada[i].idViaje}</option>`;
  }
  select += "</select>";
  document.querySelector("#divSelRollover").innerHTML = select;
}

/* Carga select con los viajes pendientes del usuario online (para luego cancelarlo) */
function cargarSelCancelarCarga() {
  let opciones = `<select id="opCancelar"> <option value="">Seleccione para cancelar </OPTION>`;
  for (let i = 0; i < solicitudesDeCarga.length; i++) {
    let soli = solicitudesDeCarga[i];
    if (soli.estado === "PENDIENTE" && soli.userImportador === userOnline) {
      opciones += `<option value="${soli.id}">Cancelar nro ${soli.id} de empresa nro ${soli.idEmpresa} </option>`;
    }
  }
  opciones += "</select>";
  return opciones;
}

/* Retorna un nuevo array con el id del viaje y carga de la posicion/id que se le paso por parametro */
function buscarViajePorIDDeConfirmacion(pIDRollear) {
  let newA = new Array();
  let i = 0;
  let encontrado = false;
  while (i < solicitudEnViajeConfirmada.length || !encontrado) {
    if (solicitudEnViajeConfirmada[i].id === pIDRollear) {
      newA.push(solicitudEnViajeConfirmada[i].idCarga);
      newA.push(solicitudEnViajeConfirmada[i].idViaje);
      encontrado = true;
    }
    i++;
  }
  return newA;
}
/* Se usa para buscar viaje prox en el rollover */
function buscarViajeDisponible(pIDRollear) {
  let idConfirmacion = encotrarNumero(pIDRollear);//este es el id del array solicitudEnViajeConfirmada
  let viaje = buscarViajePorIDDeConfirmacion(idConfirmacion);
  let tabla = `<table>
  <tr><th>ID</th>
  <th>Buque</th>
  <th>Fecha llegada</th>
  <th>Mover</th><tr>`;
  let mostrarTabla = false;//Se crear booleando para validar que no se muestre la tabla si no hay resultados
  for (let i = 0; i < buques.length; i++) {
    if (buques[i].cargaMaxima >= totalCargaActualBuque(buques[i].id) + solicitudesDeCarga[idConfirmacion].cantidadContenedores && buques[i].fechaLlegada > buques[viaje[1]].fechaLlegada) {
      tabla += `<tr><td>${buques[i].id}</td>
      <td>${buques[i].nombreBuque}</td>
      <td>${buques[i].fechaLlegada}</td>
      <td><input type="button" class="rolloverMover btnForma" data-idBuqueRollover="${buques[i].id}" value="MOVER AQUI"/></td><tr>`;
      mostrarTabla = true;
    }
  }
  tabla += `</table>`;
  document.querySelector("#divMoverViaje").innerHTML = tabla;
  return mostrarTabla;
}

/* Busca en un array cualquiera el dato que le pasemos y retorna true si se encotro */
function buscarEnLista(pBuscar, pArray) {
  let i = 0;
  while (i < pArray.length) {
    if (pBuscar === pArray[i]) {
      return true;
    }
    i++;
  }
  return false;
}

/* Genera tabla con las cargas del viaje que se le pasa por parametro */
function buscarEnManifiesto(pNroViaje) {
  let tabla = `<table><tr><th><strong>Origen</strong></th><th><strong>Contenedores</strong></th><th><strong>Importador</strong></th><th><strong>Descripción</strong></th><th><strong>Tipo de carga</strong></th></tr>`;
  pNroViaje = encotrarNumero(pNroViaje);//este es el id del viaje
  for (let i = 0; i < solicitudEnViajeConfirmada.length; i++) {
    if (solicitudEnViajeConfirmada[i].idViaje === pNroViaje) {
      let idDeCarga = solicitudEnViajeConfirmada[i].idCarga;
      tabla += `<tr><td>${solicitudesDeCarga[idDeCarga].puerto}</td>
      <td>${solicitudesDeCarga[idDeCarga].cantidadContenedores}</td>
      <td>${getNameUser(solicitudesDeCarga[idDeCarga].userImportador)}</td>
      <td>${solicitudesDeCarga[idDeCarga].descripcion}</td>
      <td>${solicitudesDeCarga[idDeCarga].tipo}</td><tr>`;
    }
  }
  tabla += `</table>`;
  document.querySelector("#divManifiesto").innerHTML = tabla;
}

/*  Cambia solicitud de estado pendiente a canceladada*/
function cancelarCargaDeshabilitarImportador(pidCancelar) {
  pidCancelar = Number(pidCancelar);
  if (solicitudesDeCarga[pidCancelar].estado === "PENDIENTE") {
    solicitudesDeCarga[pidCancelar].estado = "CANCELADA";

    //busco el id de ese importador y lo deshabilito
    if (cambiarEstadoImportador(solicitudesDeCarga[pidCancelar].userImportador)) {
      let idUser = getIdUser(solicitudesDeCarga[pidCancelar].userImportador);
      usuarios[idUser].estado = "Deshabilitado";
      cerrarSesion();
    }
    document.querySelector("#pCancelarSoli").innerHTML = `Se cancelo la solicitud ${pidCancelar} con exito`;
    solicitudesPendientesUI();
  }
}

/* Retorna true si tiene 3 o mas solicitudes canceladas*/
function cambiarEstadoImportador(pUser) {
  let cantidadCanceladas = 0;
  for (let i = 0; i < solicitudesDeCarga.length; i++) {
    if (solicitudesDeCarga[i].userImportador === pUser && solicitudesDeCarga[i].estado === "CANCELADA") {
      cantidadCanceladas++;
    }
  }
  return (cantidadCanceladas >= 3);
}

/* Retorno id segun su usuario*/
function getIdUser(pUser) {
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

/* Retorno nombre segun su usuario  */
function getNameUser(pUser) {
  let i = 0;
  let encontrado = false;
  while (i < usuarios.length || !encontrado) {
    if (usuarios[i].user === pUser) {
      return usuarios[i].nombre;
    }
    i++;
  }
  return "";
}

/* Inserta options en el select selLineaDeCarga los viajes para usarlos en el manifiesto */
function mostrarViajesDeLineaCarga() {
  let pSelect = document.querySelector("#selLineaDeCarga");
  document.querySelector("#selLineaDeCarga").innerHTML = "";//limpia las opciones y las carga de nuevo para que no se repitan
  
  let option = `<option value="">Seleccione una opcion</option>`;

  //guardo los que ya cargue en el select
  let viajesCargados = new Array();

  for (let i = 0; i < solicitudEnViajeConfirmada.length; i++) {

    if (!buscarEnLista(solicitudEnViajeConfirmada[i].idViaje, viajesCargados) && solicitudesDeCarga[solicitudEnViajeConfirmada[i].idCarga].idEmpresa == getIdUser(userOnline)) {
      option += `<option value="manifiestoViaje-${solicitudEnViajeConfirmada[i].idViaje}">Viaje nro ${solicitudEnViajeConfirmada[i].idViaje} </option>`;
      viajesCargados.push(solicitudEnViajeConfirmada[i].idViaje);//guardo en el array para saber que este ya lo cargue
    }

  }
  pSelect.insertAdjacentHTML("beforeend", option);//ingreso option al final
}

/* Inserta options en el select selListadoPeligroso los viajes para usarlos en la seccion Carga Peligrosa */
function mostrarCargasPeligrosas() {
  let pSelect = document.querySelector("#selListadoPeligroso");
  document.querySelector("#selListadoPeligroso").innerHTML = "";//limpia las opciones y las carga de nuevo para que no se repitan cada vez que hago click
  
  let option = `<option value="">Seleccione una opcion</option>`;

  //guardo los que ya cargue en el select para que no se repitan
  let cargasPeligrosasCargada = new Array();

  for (let i = 0; i < solicitudEnViajeConfirmada.length; i++) {
  
    if (!buscarEnLista(solicitudEnViajeConfirmada[i].idViaje, cargasPeligrosasCargada) && solicitudesDeCarga[solicitudEnViajeConfirmada[i].idCarga].tipo === "CARGA_PELIGROSA" && solicitudesDeCarga[solicitudEnViajeConfirmada[i].idCarga].idEmpresa == getIdUser(userOnline)) {
      option += `<option value="${solicitudEnViajeConfirmada[i].idViaje}">Viaje nro ${solicitudEnViajeConfirmada[i].idViaje}</option>`;
      cargasPeligrosasCargada.push(solicitudEnViajeConfirmada[i].idViaje);//guardo en el array para saber que este ya lo cargue
    }

  }
  pSelect.insertAdjacentHTML("beforeend", option);//ingreso option al final
}

/* Genera tabla con los datos de carga peligrosa */
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
  for (let i = 0; i < solicitudEnViajeConfirmada.length; i++) {
    let idDeCarga = solicitudEnViajeConfirmada[i].idCarga;
    if (solicitudEnViajeConfirmada[i].idViaje === pViaje && solicitudesDeCarga[idDeCarga].tipo === "CARGA_PELIGROSA") {
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

/* Genera tabla con los importadores deshabilitados */
function generarTablaImportadores() {
  let tabla = `<table>
  <tr><th>ID</th>
  <th>Importador</th>
  <th>Accion</th><tr>`;
  for (let i = 0; i < usuarios.length; i++) {
    if (usuarios[i].estado === "Deshabilitado") {
      tabla += `<tr><td>${usuarios[i].id}</td>
      <td>${usuarios[i].nombre}</td>
      <td><input type="button" class="habilitar btnForma" data-idUsuario="${usuarios[i].id}" value="HABILITAR"/></td><tr>`;//boton para habiltar
    }
  }
  tabla += `</table>`;
  return tabla;
}

/* El importador de estado  a habilitado y sos solicitudes a ingoradas */
function habilitarDeshabilitados() {
  let botonSeleccionado = this;//El boton del importador selecionado en la tabla
  let idImportador = botonSeleccionado.getAttribute("data-idUsuario");
  usuarios[idImportador].estado = "habilitado";
  for (let i = 0; i < solicitudesDeCarga.length; i++) {
    if (solicitudesDeCarga[i].userImportador === usuarios[idImportador].user) {
      solicitudesDeCarga[i].estado = "IGNORADA";
    }
  }
  document.querySelector("#divTableHablitarImportadores").innerHTML = generarTablaImportadores();
}

/* Agarro todas las cargas de ese viaje y retorno la suma de sus contenedores */
function totalCargaActualBuque(pIDViaje) {  
  let contador = 0;
  for (let i = 0; i < solicitudEnViajeConfirmada.length; i++) {
    if (solicitudEnViajeConfirmada[i].idViaje === pIDViaje) {
      contador += solicitudesDeCarga[solicitudEnViajeConfirmada[i].idCarga].cantidadContenedores;
    }
  }
  return contador;
}

/* Recibe un string y retorna el primer numero que encuentre */
function encotrarNumero(pCadena) {
  for (let i = 0; i < pCadena.length; i++) {
    if (!isNaN(Number(pCadena.charAt(i)))) {
      return Number(pCadena.charAt(i));
    }
  }
}

/* Busco un elemento del array que se pasaron como parametro y retorno la posicion donde se encuentra */
function buscarElementoEnLista(bsucar, pArray) {
  let i = 0;
  while (i < pArray.length) {
    if (pArray[i].idCarga === bsucar) {
      return i;
    }
    i++;
  }
  return false;
}

/* Ordena fechas de forma descendiente */
function criterioOrdenDescFechaVentas(pVen1, pVen2) {
  return (pVen1.fechaLlegada > pVen2.fechaLlegada) ? -1 : 1;//ternario
}

/* Muestra en tabla en Estadisticas sus solicitudes ordenadas por fecha */
function calendarioProximasLlegadas() { 
  let listaOrdenada = buques.sort(criterioOrdenDescFechaVentas);//descendientes

  let tabla = `<table>
  <tr><th>ID</th>
  <th>Estado</th>
  <th>Cantidad contenedores </th>
  <th>Fecha llegada</th><tr>`;

  for (let i = 0; i < solicitudesDeCarga.length; i++) {

    if (solicitudesDeCarga[i].userImportador === userOnline && solicitudesDeCarga[i].estado === "CONFIRMADA") {
      let posViaje = buscarElementoEnLista(solicitudesDeCarga[i].id, solicitudEnViajeConfirmada);
      let fechaHoraSistema = new Date();//Fecha de hoy
      fechaHoraSistema.setHours(0);//setea la hora de las fecha todo a 00:00:00
      fechaHoraSistema.setMinutes(0);
      fechaHoraSistema.setSeconds(0);
      //La fecha tiene que ser mayor a la actual
      if (new Date(`"${listaOrdenada[solicitudEnViajeConfirmada[posViaje].idViaje].fechaLlegada}"`) > fechaHoraSistema) {
        tabla += `<tr><td>${solicitudesDeCarga[i].id}</td>
        <td>${solicitudesDeCarga[i].estado}</td>
        <td>${solicitudesDeCarga[i].cantidadContenedores}</td>
        <td>${listaOrdenada[solicitudEnViajeConfirmada[posViaje].idViaje].fechaLlegada}</td><tr>`;
      }

    }

  }
  tabla += `</table>`;
  return tabla;
}

/* Porcentaje de sus solicitudes en empresas */
function porcentajeDeSolicitudes() {
  let totalDeEsteUsuario = 0;
  let misEmpresas = new Array();

  //Cuento total de solicitudes del usuario
  for (let i = 0; i < solicitudesDeCarga.length; i++) {
    if (solicitudesDeCarga[i].userImportador === userOnline) {
      totalDeEsteUsuario++;//estas son todas las solicitudes del importador Online

      //En este array tengo todos los ids de las empresa a las que destine mis solicitudes
      //si tiene mas de una solicitud a la misma empresa se repite el id (luegos quito)
      misEmpresas.push(solicitudesDeCarga[i].idEmpresa);
    }
  }

  //creo dos arrays uno con los id de las empresas y otro con la cantidad de solicitudes a ese empresa
  //por ende en la MISMA POSICION voy a poder obtener el id de la empresa y la cantidad
  let misEmpresasSinIDRepetidos = new Array();//ejemplo empresas -> [0,4,2,5]
  let cantidadPorRepetidos = new Array();//ejemplo -> cantidad de solicitudes en esas empresas [5,2,7,2]

  //Recorro las empresas que tengo las solicitues
  for (let i = 0; i < misEmpresas.length; i++) {
    if (!buscarEnLista(misEmpresas[i], misEmpresasSinIDRepetidos)) {//si no esta en la lista -> lo agrego, asi elimino estos duplicados
      let cont = 0;
      //ingreso el id
      misEmpresasSinIDRepetidos.push(misEmpresas[i]);

      //Cuanto a cuanats veces se repite la empresa i
      for (let a = 0; a < misEmpresas.length; a++) {
        if (misEmpresas[a] === misEmpresas[i]) cont++;
      }

      //ingreso la cantidad que se repite ese id
      cantidadPorRepetidos.push(cont);
    }
  }

  let info = "";
  for (let i = 0; i < misEmpresasSinIDRepetidos.length; i++) {
    info += `Para la empresa <b>${misEmpresasSinIDRepetidos[i]}</b> hay un total de <b>${((cantidadPorRepetidos[i] * 100) / totalDeEsteUsuario).toFixed(2)}%</b> de solicitudes<br>`;
  }
  return info == "" ? "Aún no se le asigno ningun viaje a sus solicitudes" : info;
}