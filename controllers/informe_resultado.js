import Resultados from "../models/informeResultado.js";
import Consecutivo from "../models/consecutivo.js";


    /// TODA ESTA MIERDA FALTA ARREGLAR

    
//Insertar
const resultadoPost = async (req, res) => {
    const consecutivo = await Consecutivo.findOne()
    if (consecutivo) {
        const infoNro = consecutivo.infoNro
        const { idMuestra, fechaEmisionInforme, fechaAnalisis, ensayo, resultado, incertidumbreExpandida, observaciones,reviso,aprobo } = req.body
        const resultados = new Resultados({  infoNro,idMuestra, fechaEmisionInforme, fechaAnalisis, ensayo, resultado, incertidumbreExpandida, observaciones, reviso,aprobo})
        await resultados.save()
        const nuevo = consecutivo.infoNro + 1
        await Consecutivo.findByIdAndUpdate(consecutivo._id, { infoNro: nuevo })
        res.json({
            "msg": "Informe creado correctamente"
        })
    }
}

const listarResultados = async (req, res) => {
    const resultados = await Resultados.find()
    console.log(resultados);
    res.json({ resultados })
}


// const buscarInformePorCodigoDeMuestraGet=async(req, res)=>{
//     const {CodigoMuestra}=req.query;
//     const resultados=await Resultados.find()
//     .populate("datos_muetra","codigo_muestra")
//     const filtro=informe.filter((codigo_m)=>codigo_m.datos_muestra.codigo_muestra===CodigoMuestra)
//     res.json({filtro})
// }


const editarResultadosPut = async (req, res) => {
    const { fechaEmisionInforme, fechaAnalisis, ensayo, resultado, incertidumbreExpandida, observaciones,reviso,aprobo } = req.body
    const { id } = req.params;
    const resultados = await Resultados.findByIdAndUpdate(id, { fechaEmisionInforme, fechaAnalisis, ensayo, resultado, incertidumbreExpandida, observaciones ,reviso,aprobo})
    res.json({
        "msg": "Informe modificado con exito"
    })
}

const activarPut = async (req, res) => {
    const { id } = req.params;
    const resultado = await Resultados.findByIdAndUpdate(id, { estado: 1 })
    res.json({
        "msg": "La cotizacion esta activada"
    })
}

const desactivarPut = async (req, res) => {
    const { id } = req.params;
    const resultado = await Resultados.findByIdAndUpdate(id, { estado: 0 })
    res.json({
        "msg": "La cotizacion esta desactivada"
    })
}


export { resultadoPost, listarResultados, activarPut, desactivarPut, editarResultadosPut }