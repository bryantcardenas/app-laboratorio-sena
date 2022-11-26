import express from "express"
import cors from "cors"
import dbConnection from "../database/config.js"
import Usuario from "../routers/usuario.js"
import Ensayo from "../routers/ensayo.js"
import Ciudad from "../routers/ciudad.js"
// import oferta from "../routes/oferta_servicio.js"
// import orden from "../routes/orden_servicio.js"
// import recepcion from "../routes/recepcion_muestra.js"
// import solicitudSeguimiento from "../routes/solicitud_seguimiento_recepcion.js"
import Resultados from "../routers/informe_resultado.js"
import tipoMuestra from "../routers/tipo_muestra.js"
import Cotizacion from "../routers/cotizacion.js"
import Muestra from "../routers/muestra.js"
import Seguimiento from "../routers/seguimiento.js"


class Server {




    constructor() {
        this.app = express()
        this.middleware()
        this.port = process.env.PORT
        this.conectarBd()
        this.routes()
    }
    routes() {
        this.app.use('/proyecto/usuario', Usuario)
        this.app.use('/proyecto/ensayo', Ensayo)
        this.app.use('/proyecto/muestra', Muestra)
        this.app.use('/proyecto/ciudad',Ciudad)
        // this.app.use('/proyecto/orden',Orden)
        // this.app.use('/proyecto/recepcion',recepcion)
        // this.app.use('/proyecto/solicitud',solicitudSeguimiento)
        this.app.use('/proyecto/resultado',Resultados)
        this.app.use('/proyecto/tipoMuestra', tipoMuestra)
        this.app.use('/proyecto/cotizacion', Cotizacion)
        this.app.use('/proyecto/seguimiento',Seguimiento)
    }

    async conectarBd() {
        await dbConnection()
    }

    middleware() {
        this.app.use(express.json())
        this.app.use(cors())
        this.conectarBd()
        this.app.use(express.static('public'))
    }

    escuchar() {
        this.app.listen(this.port, () => {
            console.log(`servidor escuchando en el puerto ${this.port}`);
        })
    }
}

export default Server;