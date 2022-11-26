import Seguimiento from "../models/seguimiento.js"

// POST Insertar seguimiento 
const SeguimientoPost=async(req,res)=>{
    const {Codigo,DatosCliente,DatosContacto,Solicitud,MedioSolicitud,RecibidoP,PorcentajeAceptacion,RegistroAceptacion,MotivoRechazo,SeguimientoCotizaciones}=req.body
    const seguimiento = new Seguimiento ({Codigo,DatosCliente,DatosContacto,Solicitud,MedioSolicitud,RecibidoP,PorcentajeAceptacion,RegistroAceptacion,MotivoRechazo,SeguimientoCotizaciones})
    await seguimiento.save()

    res.json({
        msg:"Registro Exitoso"
    })
}

  
// GET listar seguimiento por nombre o cc de usuario
const SeguimientosGetNombreoCc=async(req,res)=>{  
    const {value}=req.query
    const usuario= await Seguimiento.find({
        $or: [{nombre: new RegExp(value, "i")},
        { documento: new RegExp(value, "i") },
        { correo: new RegExp(value, "i") },
        { telefono: new RegExp(value, "i") },
    ],
    });
    res.json({
        usuario,
    });
    //REVISAR 
}    // FALTA ESTA MONDA



const SeguimientoGetN = async (req, res) => {
    const { Codigo } = req.query
    const codig = await Seguimiento.findOne({ Codigo })
    res.json({
        codig

    })
}
//"listo"


// GET Listar todos los seguimientos
const SeguimientosGet= async(req,res)=>{
    const seguimiento=await Seguimiento.find()
    res.json({
        seguimiento
    })
}

//GET Buscar seguimiento por # resultado

// const SeguimientoGetN= async(req,res)=>{
//     const {Codigo}=req.query
//     const seguimiento= await Seguimiento.find()
//     .populate("Codigo","informe")
//     .populate("Seguimiento",["Solicitud","PorcentajeAceptacion","RegistroAceptacion","MotivoRechazo"])
//     .populate("Usuario")
//     .populate("Cotizacion")

//     res.json({
//         seguimiento
//     })
// }

const SeguimientoPutdatos=async(req,res)=>{ 
    const {id}=req.params
    const {Codigo,DatosCliente,DatosContacto,Solicitud,MedioSolicitud,RecibidoP,PorcentajeAceptacion,RegistroAceptacion,MotivoRechazo,SeguimientoCotizaciones}=req.body
    const SeguimientoEditarDatos=await Seguimiento.findByIdAndUpdate(id,{Codigo,DatosCliente,DatosContacto,Solicitud,MedioSolicitud,RecibidoP,PorcentajeAceptacion,RegistroAceptacion,MotivoRechazo,SeguimientoCotizaciones})
    res.json({
        "msg":`Actualizacion realizada con exito ${SeguimientoEditarDatos}`
    })
}



export {SeguimientosGet,SeguimientosGetNombreoCc,SeguimientoPost,SeguimientoPutdatos,SeguimientoGetN}