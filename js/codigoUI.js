document.querySelector("#btnRegistro").addEventListener("click", registroUI);
document.querySelector("#btnLogin").addEventListener("click", loginUI);
document
  .querySelector("#ingresoDesdeRegistro")
  .addEventListener("click", muestroLoginUI);
document
  .querySelector("#pRegistrateAqui")
  .addEventListener("click", registrateAquiUI);
document
  .querySelector("#btnIngresarMercaderia")
  .addEventListener("click", btnUIMercaderia);
document
  .querySelector("#btnBuscarPendientes")
  .addEventListener("click", buscarPendientesUI);
document
  .querySelector("#btnCancelarSolicitud")
  .addEventListener("click", cancelarSolicitudUI);
document.querySelector("#liEstadistica").addEventListener("click", estadistica);
document
  .querySelector("#liNuevaSolicitud")
  .addEventListener("click", mostrarNuevaSolicitud);
document
  .querySelector("#liConsultarSolictudes")
  .addEventListener("click", mostrarConsultarSolictudes);
document
  .querySelector("#liCancelarSolicitud")
  .addEventListener("click", mostrarCancelarSolicitud);

let importadores = new Array();
let solicitudesDeCarga = new Array();
let userOnline = "camila";

inicio();

function inicio() {
  nuevoRegistro("camila", "camila", "camila", "camila");
  nuevoRegistro("miguel", "miguel", "miguel", "miguel");
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
  let error = false;
  if (name === "") {
    document.querySelector("#errorPname").style.display = "block";
    document.querySelector("#errorPname").innerHTML = `Campo Obligatorio (*)`;
    error = true;
  } else {
    document.querySelector("#errorPname").style.display = "none";
  }
  if (foto === "") {
    document.querySelector("#errorPfoto").style.display = "block";
    document.querySelector("#errorPfoto").innerHTML = `Campo Obligatorio (*)`;
    error = true;
  } else {
    document.querySelector("#errorPfoto").style.display = "none";
  }
  if (usuario === "") {
    document.querySelector("#errorPusuario").style.display = "block";
    document.querySelector(
      "#errorPusuario"
    ).innerHTML = `Campo Obligatorio (*)`;
    error = true;
  } else {
    document.querySelector("#errorPusuario").style.display = "none";
  }

  if (pass === "") {
    document.querySelector("#errorPpass").style.display = "block";
    document.querySelector("#errorPpass").innerHTML = `Campo Obligatorio (*)`;
    error = true;
  } else if (!validarContrasena(pass)) {
    document.querySelector("#errorPpass").style.display = "block";
    document.querySelector(
      "#errorPpass"
    ).innerHTML = `(?) Debe de contar con al menos una minuscula, mayuscula y un numero`;
    error = true;
  } else {
    document.querySelector("#errorPpass").style.display = "none";
  }

  if (!error) {
    let i = 0;
    let userEncontrado = false;
    while (!userEncontrado && i < importadores.length) {
      if (importadores[i].user.toLowerCase() === usuario.toLowerCase()) {
        //valido que no se repita el user con otro
        userEncontrado = true;
      }
      i++;
    }
    if (!userEncontrado) {
      foto = quitarFakePath(foto);
      nuevoRegistro(name, foto, usuario, pass);
      userOnline = usuario;
      document.querySelector("#contenedor").style.display = "block";
      document.querySelector("#contenedorLogin").style.display = "none";
      document.querySelector("#divEmpresa").style.display = "none";
    } else {
      document.querySelector("#errorPusuario").style.display = "none";
      document.querySelector("#errorPusuario").innerHTML = `Usuario ya en uso`;
    }
  }
}
function loginUI() {
  console.log("entro");
  let user = document.querySelector("#txtloginUser").value;
  let pass = document.querySelector("#txtloginPass").value;
  let error = false;
  if (user === "") {
    document.querySelector("#errorUsuarioLogin").style.display = "block";
    document.querySelector(
      "#errorUsuarioLogin"
    ).innerHTML = `Campo Obligatorio (*)`;
    error = true;
  } else {
    document.querySelector("#errorUsuarioLogin").style.display = "none";
  }
  if (pass === "") {
    document.querySelector("#errorPassLogin").style.display = "block";
    document.querySelector(
      "#errorPassLogin"
    ).innerHTML = `Campo Obligatorio (*)`;
    error = true;
  } else {
    document.querySelector("#errorPassLogin").style.display = "none";
  }
  if (!error && buscarImportador(user, pass)) {
    userOnline = user;
    document.querySelector("#contenedor").style.display = "block";
    document.querySelector("#contenedorLogin").style.display = "none";
    document.querySelector("#divEmpresa").style.display = "none";
  } else {
    document.querySelector("#errorUsuario").style.display = "block";
    document.querySelector("#errorUsuario").innerHTML = `Datos invalidos`;
  }
}
function mostrarNuevaSolicitud() {
  document.querySelector("#divSolicitudDeCarga").style.display = "block";
  document.querySelector("#divConsultarPendientes").style.display = "none";
  document.querySelector("#divCancelarSolicitudDeCarga").style.display = "none";
  document.querySelector("#divInformacionEstadistica").style.display = "none";
}

function mostrarConsultarSolictudes() {
  solicitudesPendientesUI();
  document.querySelector("#divSolicitudDeCarga").style.display = "none";
  document.querySelector("#divConsultarPendientes").style.display = "block";
  document.querySelector("#divCancelarSolicitudDeCarga").style.display = "none";
  document.querySelector("#divInformacionEstadistica").style.display = "none";
}

function mostrarCancelarSolicitud() {
  document.querySelector("#divSolicitudDeCarga").style.display = "none";
  document.querySelector("#divConsultarPendientes").style.display = "none";
  document.querySelector("#divCancelarSolicitudDeCarga").style.display =
    "block";
  document.querySelector("#divInformacionEstadistica").style.display = "none";
}

function btnUIMercaderia() {
  let desc = document.querySelector("#txtDescrip").value;
  let tipo = document.querySelector("#txtTipoCarga").value;
  let puerto = document.querySelector("#txtPuerto").value;
  let cantContenedores = document.querySelector("#txtCantContenedores").value;
  let idEmpresa = document.querySelector("#txtIdEmpresa").value;
  if (validarDatosMercaderia(desc, tipo, puerto, cantContenedores, idEmpresa)) {
    let idNuevaMercaderia = ingresarMercaderia(
      desc,
      tipo,
      puerto,
      cantContenedores,
      idEmpresa
    );
    document.querySelector("#pIDGeneradoMercaderia").style.color = "black";
    document.querySelector(
      "#pIDGeneradoMercaderia"
    ).innerHTML = `Se ingreso correctamente <br><strong>El id generado es: ${idNuevaMercaderia}</strong>`;
  } else {
    document.querySelector(
      "#pIDGeneradoMercaderia"
    ).innerHTML = `Ingrese datos validos`;
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
  busquedaSolicitudesPendientes(buscar);
}

function cancelarSolicitudUI() {
  let idCancelar = document.querySelector("#txtCancelarSolicitud").value;
  if (idCancelar === "" || isNaN(idCancelar)) {
    document.querySelector(
      "#pCancelarSoli"
    ).innerHTML = `No se encontraron resultados`;
  } else {
    idCancelar = Number(idCancelar);
    if (solicitudesDeCarga[idCancelar].estado === "Pendiente") {
      //funcion para cancelar
      document.querySelector(
        "#pCancelarSoli"
      ).innerHTML = `Se cancelo la solicitud ${idCancelar} con exito`;
    }
  }
}

function estadistica() {
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
  if (isNaN) porcentaje = 0;
  document.querySelector(
    "#divPorceCancelaciones"
  ).innerHTML = `El porcentaje de cancelaciones contra el total de cargas es ${porcentaje}%`;
}
