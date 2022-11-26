import Resultado from "../models/informeResultado.js";

const HelpersInformeResultado = {
    existeInformeById: async (id) => {
        const existe = await Resultado.findById(id)
        if (!existe) {
          throw new Error(`El id  ${id} no existe`)
        }
      },
}
export default HelpersInformeResultado;              
