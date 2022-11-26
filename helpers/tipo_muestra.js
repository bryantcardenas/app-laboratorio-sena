import tipoMuestra from "../models/tipo_muestra.js"
import { validarId } from "../middlewares/validar-MongoId.js"

const HelpersTiposMuestra={
    existeTipos :async (id)=>{
        const existe = await tipoMuestra.findById(id)
        if (!existe){
            throw new Error (`El id no existe ${id}`)
        }
    }
}

export  default HelpersTiposMuestra;