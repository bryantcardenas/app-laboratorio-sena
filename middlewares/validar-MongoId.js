import mongoose from "mongoose";
import HelpersEnsayo from "../helpers/ensayo.js";
import helpersUsuario from "../helpers/usuario.js";

const validarId = async(id)=>{
    const valido = mongoose.Types.ObjectId.isValid(id);
    if ( ! valido){
    throw new Error("el id no es valido");
    }

};
const validarMongoId1 = async(usuario)=>{
    if (usuario){
        const valido = mongoose.Types.ObjectId.isValid(usuario.titular);
        if ( ! valido ){
            throw new Error("el id del usuario no es valido");
        }
        
    }
};

const validarMongoId = async (itemsEnsayo) => {

    //promisse
    const valido = mongoose.Types.ObjectId.isValid(itemsEnsayo);
    if (!valido) {
        return "id no valido"
    }
    const xx = await HelpersEnsayo.existeEnsayoById(itemsEnsayo);
    console.log(xx);
    if (!xx) {
        return "id no existe"
    }
    return ""
}

const validarResponsable = (responsable) => {
    return new Promise(async (resolve, reject) => {
        const valido = mongoose.Types.ObjectId.isValid(responsable);
        if (!valido) {
            reject("id no valido");
        } else {
            const responsa = await helpersUsuario.existePersonaById(responsable);
            if (!responsa) {
                reject("id no existe");
            }
        }
        resolve("");
    })

};
const validarItems = (itemsEnsayo) => {
    return new Promise(async (resolve, reject) => {
        const valido = mongoose.Types.ObjectId.isValid(itemsEnsayo);
        if (!valido) {
            reject("id no valido");
        } else {            
            const xx = await HelpersEnsayo.existeEnsayoById2(itemsEnsayo);
            if (!xx) {
                reject("id no existe");
            }
        }
        resolve("");
    })
}


export { validarId,validarMongoId,validarResponsable,validarItems,validarMongoId1}