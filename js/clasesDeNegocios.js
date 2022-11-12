class Usuario {
    static id = 0;
    constructor() {
        this.id = "";
        this.nombre = "";
        this.foto = "";
        this.user = "";
        this.contraseña = "";
        this.tipo = "";
        this.estado = "";
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

class CargaConfirmada {
    static idCargaConfirmada = 0;
    constructor() {
        this.id = -1;
        this.idViaje = -1;
        this.idCarga = -1;
    }
}

class ViajeBuque {
    static idViajeBuque = 0;
    constructor() {
        this.id = -1;
        this.idEmpresa = -1;
        this.nombreBuque = "";
        this.cargaMaxima = -1;
        this.fechaLlegada = "";
    }
}
