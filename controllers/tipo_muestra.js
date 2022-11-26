import TipoMuestra from "../models/tipo_muestra.js"


//Agregar tipo de Muestra
const tipoMuestraPost = async (req, res) => {
  const { tipos } = req.body;
  const tipoMuestra = new TipoMuestra({ tipos });
  await tipoMuestra.save();
  res.json({
    msg: "Muestra agregada",
  });
};

export { tipoMuestraPost };