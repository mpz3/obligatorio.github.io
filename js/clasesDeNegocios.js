class UsuarioImportador {
    static idImportador = 0;
    constructor() {
        this.id = "";
        this.nombre = "";
        this.foto = "";
        this.user = "";
        this.contraseña = "";
    }
}
class UsuarioEmpresa {
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

class Buques {
    constructor() {
        this.nombreBuque = "";
        this.cargaMaxima = "";
        this.fechaLlegada = "";
        //aca luego tendremos que asociar el nombre de la empresa dueña del buque
    }
}