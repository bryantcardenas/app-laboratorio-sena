import Muestra from "../models/muestra.js"
import Consecutivo from "../models/consecutivo.js"
import Log from "../models/log.js"
import Cotizacion from "../models/cotizacion.js"
import Usuario from "../models/usuario.js"
import Ensayo from "../models/ensayo.js"
import orden_servicio from "../models/orden_servicio.js"

   
//Insertar muestras
// const muestraPost= async (req,res)=>{
//     const {solicitante,codMuestra,munRecoleccion,direccionTomaMuestra,lugarTomaMuestra,muestraRecolectadaPor,
//     procedimientoMuestreo,tipoMuestra,matrizMuestra,fechaRecoleccion,cotizacion,item,estado,createdAt}=req.body
//     const muestra= new Muestra({solicitante,codMuestra,munRecoleccion,direccionTomaMuestra,lugarTomaMuestra,muestraRecolectadaPor,
//         procedimientoMuestreo,tipoMuestra,matrizMuestra,fechaRecoleccion,cotizacion,item,estado,createdAt})
//     await muestra.save()

//     res.json({
//         msg:"registro de muestra exitosa"
//     })
// }

const numeros = (codMuestra) => {
    if (codMuestra) {
        let date = new Date();
        let output = String(date.getFullYear());
        if (codMuestra.toString().length === 1) {
            return `000${codMuestra}-${output}`
        } else if (codMuestra.toString().length === 2) {
            return `00${codMuestra}-${output}`
        } else if (codMuestra.toString().length === 3) {
            return `0${codMuestra}-${output}`
        } else if (codMuestra.toString().length === 4) {
            return `${codMuestra}-${output}`
        }
    }
}
// const crearConsecutivoM = async (req, res) => {
//     const { consecutivoMuestra } = req.body;
//     const consecutivoo = new Consecutivo({ consecutivoMuestra })
//     await consecutivoo.save()
//     console.log(req);
//     res.json({
//         "msg": "Consecutivo Creado"
//     })

// }
const datosMuestraPost=async(req,res)=>{
    const consecutivo=await Consecutivo.findOne()
    if(consecutivo){
        const codMuestra=numeros(consecutivo.codMuestra)
        const {solicitante,munRecoleccion,direccionTomaMuestra,lugarTomaMuestra,muestraRecolectadaPor,procedimientoMuestreo,tipoMuestra,matrizMuestra,fechaRecoleccion,cotizacion,item,estado}=req.body
        const coti=new Muestra({solicitante,codMuestra,munRecoleccion,direccionTomaMuestra,lugarTomaMuestra,muestraRecolectadaPor,procedimientoMuestreo,tipoMuestra,matrizMuestra,fechaRecoleccion,cotizacion,item,estado})
        await coti.save()
        const nuevo=consecutivo.codMuestra+1
        await Consecutivo.findByIdAndUpdate(consecutivo._id,{codMuestra:nuevo})
        const idUsuario=req.usuario._id
        const idPost=coti._id
        const navegador=req.headers['user-agent']
        const ip=req.socket.remoteAddress
        const log=new Log({idUsuario,idPost,navegador,ip})
        await log.save()
        
        res.json({
            "msg":"Datos Muestra creada exitosamente."
        })
    }
}


const muestraGetDatosEnsayo = async (req, res) => {
    const muestra = await Muestra.find()
        .populate("cotizacion", "items")
    res.json({ muestra })
}

//Listar todas las muestras
const muestraGetBuscar = async (req, res) => {
    const muestra = await Muestra.find({})
    res.json({
        muestra

    })
}

// buscar muestra por codigo
const muestraGetBuscarCodigo = async (req, res) => {
    const { codMuestra } = req.query
    const codig = await Muestra.find({ codMuestra })
    res.json({
        codig

    })
}


//Listar muestras por tipo
const muestraGetBuscarTipo = async (req, res) => {
    const { id } = req.params;
    const muestra = await Muestra.findById(id);
    res.json({
        muestra,
    });
};


//Modificar datos de la muestra
const muestraPutEditar = async (req, res) => {
    const { id } = req.params;
    const { solicitante, codMuestra, munRecoleccion, direccionTomaMuestra, lugarTomaMuestra, muestraRecolectadaPor,
        procedimientoMuestreo, tipoMuestra, matrizMuestra, fechaRecoleccion, cotizacion, item, estado, createdAt } = req.body;
    const muestra = await Muestra.findByIdAndUpdate(id, {
        solicitante, codMuestra, munRecoleccion, direccionTomaMuestra,
        lugarTomaMuestra, muestraRecolectadaPor,
        procedimientoMuestreo, tipoMuestra, matrizMuestra, fechaRecoleccion, cotizacion, item, estado, createdAt

    });
    res.json({
        msg: "actualizacion de datos exitosa",
    });
};



//Listar por ciudad y departamento 

const muestrasGetBuscarMunDpto = async (req, res) => {
    const { munRecoleccion } = req.query;
    const muestra = await Muestra.find({ munRecoleccion });
    res.json({
        muestra,
    });
};


// buscar por fecha

//   const muestraFechaGet=async(req, res)=>{
//     const{fecha,fecha1}=req.query;
//     const muestra=await Muestra.find({$and:[{createdAt: { $gte : fecha , $lte : fecha1}}]})
//     res.json({muestra})
// }

//activar muestra
const muestraPutActivar = async (req, res) => {
    const { id } = req.params
    const muestra = await Muestra.findByIdAndUpdate(id, { estado: 1 })
    res.json({
        msg: "activacion de estado exitosa"

    })
};

// inactivar muestra
const muestraPutInactivar = async (req, res) => {
    const { id } = req.params
    const muestra = await Muestra.findByIdAndUpdate(id, { estado: 0 })
    res.json({
        msg: "inactivacion de estado exitosa"

    })
};


export {
    datosMuestraPost, muestraGetBuscar, muestraGetBuscarCodigo,
    muestraGetBuscarTipo, muestraPutEditar, muestrasGetBuscarMunDpto,
    muestraPutActivar, muestraPutInactivar, muestraGetDatosEnsayo
}

