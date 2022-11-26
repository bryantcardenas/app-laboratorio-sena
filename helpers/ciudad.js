import Ciudad from "../models/ciudad.js"

const HelpersCiudad = {

    existeDepartamentoById: async (coddepartamento) => {
        if (coddepartamento) {
          const existe = await Ciudad.findOne({ coddepartamento });
          if (!existe) throw new Error(`codigo ${coddepartamento} no existe en la base de datos`);
      }
    },

    existeCiudadById: async (codciudad) => {
        if(codciudad){
            const existe=await Ciudad.findOne({codciudad})
            if(!existe) throw new Error(`codigo ${codciudad} no existe en la base de datos`)
        }
    }
}

export default HelpersCiudad;  