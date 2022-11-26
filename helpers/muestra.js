import Muestra from "../models/muestra.js"

const HelpersMuestra={
    existeMuestraById :async (id)=>{
        const existe = await Muestra.findById(id)
        if (!existe){
            throw new Error (`El id no existe ${id}`)
        }
    }
}

export  default HelpersMuestra;