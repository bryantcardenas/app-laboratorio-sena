import Cotizacion from "../models/cotizacion.js";
import Consecutivo from "../models/setup.js";
import Log from "../models/log.js";

///ej: 0001-2022 V1 
const numeros = (numCotizacion) => {
    if (numCotizacion) {
        let date = new Date();
        let output = String(date.getFullYear());
        if (numCotizacion.toString().length === 1) {
            return `000${numCotizacion}-${output}V${1}`
        } else if (numCotizacion.toString().length === 2) {
            return `00${numCotizacion}-${output}V${1}`
        } else if (numCotizacion.toString().length === 3) {
            return `0${numCotizacion}-${output}V${1}`
        } else if (numCotizacion.toString().length === 4) {
            return `${numCotizacion}-${output}V${1}`
        }
    }
}

const cotizacionPost = async (req, res) => {
    const consecutivo = await Consecutivo.findOne()
    if (consecutivo) {
        const numCotizacion = numeros(consecutivo.consecutivoMuestra)
        const { fechaCreacion, idCliente, idContacto, oferta, entregaResultados, elaborado, items, observaciones, subtotal, descuento, iva, total, medio_solicitud } = req.body
        const coti = new Cotizacion({ numCotizacion, fechaCreacion, idCliente, idContacto, oferta, entregaResultados, elaborado, items, observaciones, subtotal, descuento, iva, total, medio_solicitud })
        await coti.save()
        const nuevo = consecutivo.consecutivoMuestra + 1
        await Consecutivo.findByIdAndUpdate(consecutivo._id, { consecutivoMuestra: nuevo })
        const idUsuario = req.usuario._id
        const idPost = coti._id
        const navegador = req.headers['user-agent']
        const ip = req.socket.remoteAddress
        const log = new Log({ idUsuario, idPost, navegador, ip })
        await log.save()
        res.json({
            "msg": "Cotizacion creada exitosamente."
        })
    }
}

const crearConsecutivo = async (req, res) => {
    const { numCotizacion } = req.body;
    const consecutivoo = new Consecutivo({ numCotizacion })
    await consecutivoo.save()
    console.log(req);
    res.json({
        "msg": "Consecutivo Creado"
    })

}

const buscarPorId = async (req, res) => {
    const { id } = req.params;
    const coti = await Cotizacion.findById(id)
    const items = []
    if (coti.items.item1.itemsEnsayo != 0) {
        items.push("item 1")
    }
    if (coti.items.item2.itemsEnsayo != 0) {
        items.push("item 2")
    }
    if (coti.items.item3.itemsEnsayo != 0) {
        items.push("item 3")
    }
    res.json({
        items
    })
}
//listarya..............
const listarCotizacionesGet = async (req, res) => {
    const coti = await Cotizacion.find()
    res.json({ coti })

}

const buscarPorCodigoGet = async (req, res) => {
    const { numCotizacion } = req.query;
    const coti = await Cotizacion.find({ numCotizacion })
    res.json({ coti })
}
const buscarPorIdClienteGet = async (req, res) => {
    const { id } = req.params;
    const coti = await Cotizacion.find().where('idCliente').in(id).exec();
    res.json({ coti })
}
const buscarPorIdUsuarioGet = async (req, res) => {
    const { id } = req.params;
    const coti = await Cotizacion.find().where('elaborado').in(id).exec();
    res.json({ coti })
}
const buscarFechaGet = async (req, res) => {
    const { fecha1, fecha2 } = req.query;
    const coti = await Cotizacion.find({ $and: [{ fechaCreacion: { $gte: fecha1, $lte: fecha2 } }] })
    res.json({ coti })
}
const editarCotizacionPut = async (req, res) => {
    const { id } = req.params;
    const a = await Cotizacion.findById(id)
    const numCotizacion = cambiar(a.numCotizacion)
    const { fechaCreacion, idCliente, idContacto, oferta, entregaResultados, elaborado, items, observaciones, subtotal, descuento, iva, total } = req.body;           //                                                              // medio_solicitud 
    const coti = new Cotizacion({ numCotizacion, fechaCreacion, idCliente, idContacto, oferta, entregaResultados, elaborado, items, observaciones, subtotal, descuento, iva, total })//                                                                                   //
    await coti.save()
    const desactivar = await Cotizacion.findByIdAndUpdate(id, { estado: 0 })
    const idUsuario = req.usuario._id
    const idPut = coti._id
    const navegador = req.headers['user-agent']
    const ip = req.socket.remoteAddress
    const log = new Log({ idUsuario, idPut, navegador, ip })
    await log.save()
    res.json({
        "msg": "Cotizacion editada con exito"
    })
}

const activarPut = async (req, res) => {
    const { id } = req.params;
    const activar = await Cotizacion.findByIdAndUpdate(id, { estado: 1 })
    const idUsuario = req.usuario._id
    const idPut = id
    const navegador = req.headers['user-agent']
    const ip = req.socket.remoteAddress
    const log = new Log({ idUsuario, idPut, navegador, ip })
    await log.save()

    res.json({
        "msg": "La cotizacion esta activada"
    })
}

const desactivarPut = async (req, res) => {
    const { id } = req.params;
    const desactivar = await Cotizacion.findByIdAndUpdate(id, { estado: 0 })
    const idUsuario = req.usuario._id
    const idPut = id
    const navegador = req.headers['user-agent']
    const ip = req.socket.remoteAddress
    const log = new Log({ idUsuario, idPut, navegador, ip })
    await log.save()
    res.json({
        "msg": "La cotizacion esta desactivada"
    })
}

const cambiar = (numCotizacion) => {
    const division = Number(numCotizacion.split("")[numCotizacion.length - 1])
    const sumar = division + 1
    const cambio = numCotizacion.replace(/.$/, sumar)
    return cambio
}   

// API COTIZACIÓN: debe permitir: 
// GET Listar todas las cotizaciones .....................
// GET Buscar cotización por Num Cotización +++++++++
// GET Buscar cotización por id cliente +++++++++
// GET Buscar cotización por id usuario ++++++++++
// GET traer cotixacion entre fechas
// POST Insertar cotización...............................
// PUT Modificar datos de la cotización +
// PUT Activar cotización +
// PUT Inactivar cotización +     


export {
    buscarPorId, cotizacionPost, listarCotizacionesGet,
    buscarPorCodigoGet, buscarPorIdClienteGet, editarCotizacionPut,
    activarPut, desactivarPut, crearConsecutivo, buscarPorIdUsuarioGet,
    buscarFechaGet
}