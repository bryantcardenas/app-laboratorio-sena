import Usuario from "../models/usuario.js"

const helpersUsuario={
    existePersonaById : async (id) => {
        const existe = await Usuario.findById(id)

        if (!existe) {
            throw new Error(`El id no existe ${id}`)
        }
    },

    existeEmail :async(correo) => {
        
            const existe = await Usuario.findOne({ correo });
        
        if (existe ) {
            //return res.status(401).json({ msg: `El email ya está registrado` });
            throw new Error(`El correo ya está registrado`)
        }
        
       
    },
    existeRol: async (rol) => {
        const existe = await Usuario.findOne(rol)

        if (!existe) {
            throw new Error(`El rol ${rol} no existe `)
        }
    },
    

    existenumDocumento :async(documento) => {
        
        const existe = await Usuario.findOne({documento });
    
    if (existe ) {
        //return res.status(401).json({ msg: `El email ya está registrado` });
        throw new Error(`El DOCUMENTO ya está registrado`)
    }
    
   
},


    

}
export default helpersUsuario;