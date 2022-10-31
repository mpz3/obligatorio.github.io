class UsuarioImportador {
  constructor() {
    this.nombre = "";
    this.foto = "";
    this.user = "";
    this.contraseña = "";
  }
}
class empresa {
  static idEmpresa = 0;
  constructor() {
    this.nombre = "";
    this.foto = "";
    this.user = "";
    this.contraseña = "";
  }
}

class SolicitudCarga {
  static idSolicitudCarga = 0;
  constructor() {
    this.id = -1;
    this.estado = "";
    this.descripcion = "";
    this.tipo = "";
    this.puerto = "";
    this.cantidadContenedores = -1;
    this.idEmpresa = -1;
    this.userImportador = "";
  }
}

class Buque {
  constructor() {
    this.nombreBuque = "";
    this.cargaMaxima = "";
    this.fechaLlegada = "";
    this.Empresa = null;
  }
}

class CargasConfirmadas {
  constructor() {
    this.importardor = "";
    this.cargasTipo = "";
    this.BuqueConfirmado = null;
  }
}
