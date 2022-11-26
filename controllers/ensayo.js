import Ensayo from "../models/ensayo.js"
import Log from "../models/log.js"


//Insertar Ensayo
const ensayoPost = async (req, res) => {
  const { ensayo, metodo, tecnica, valorMinimo, valorMaximo, unidades, costo, estado, descripcion, limiteCuantificacion, titular, suplente } = req.body
  const ensay = new Ensayo({ ensayo, metodo, tecnica, valorMinimo, valorMaximo, unidades, costo, estado, descripcion, limiteCuantificacion, titular, suplente })
  await ensay.save()

  const idUsuario=req.usuario._id
  const idPost=ensay._id
  const navegador=req.headers['user-agent']
  const ip=req.socket.remoteAddress
  const log=new Log({idUsuario,idPost,navegador,ip})
  await log.save()
  res.json({   
      msg : "ingreso de ensayo exitoso"
  })

  
}

//Listar ensayos
const ensayoGetBuscar = async (req, res) => {
  const ensayo = await Ensayo.find({})
  res.json({
    ensayo

  })
}


//Listar por valor Minimo o Maximo  
const ensayoGetBuscarVal = async (req, res) => {
  const { valorMaximo, valorMinimo } = req.params;
  const ensayo = await Ensayo.find({ $and: [{ valor: { $gte: valorMaximo, $lte: valorMinimo } }] });
  res.json({
    ensayo,
  });
};


// activar ensayo
const ensayoPutActivar = async (req, res) => {
  const { id } = req.params
  const ensayo = await Ensayo.findByIdAndUpdate(id, { estado: 1 })
  res.json({
    msg: "activacion de estado exitosa"

  })
}

// inactivar ensayo
const ensayoPutInactivar = async (req, res) => {
  const { id } = req.params
  const ensayo = await Ensayo.findByIdAndUpdate(id, { estado: 0 })
  res.json({
    msg: "inactivacion de estado exitosasss"

  })
}



// editar ensayo
// const ensayoPutEditar = async (req, res) => {
//   const { id } = req.params;
//   const { metodo, tecnica, valorMaximo, valorMinimo, unidades, estado, descripcion, limiteCuantificacion } = req.body;
//   const Ensayo = await Ensayo.findByIdAndUpdate(id, {
//     metodo,
//     tecnica,
//     valorMaximo,
//     valorMinimo,
//     unidades,
//     estado,
//     descripcion,
//     limiteCuantificacion
//   });
//   res.json({
//     msg: "actualizacion de datos exitosa",
//   });
// };
const ensayoPutEditar = async (req,res)=>{
  const {id}=req.params
  const {ensayo,metodo,tecnica,valorMinimo,valorMaximo,unidades,costo,estado,descripcion}=req.body
  const ensay =await Ensayo.findByIdAndUpdate(id,{ensayo,metodo,tecnica,valorMinimo,valorMaximo,unidades,costo,estado,descripcion})

  const idUsuario=req.usuario._id
  const idPut= id
  const navegador=req.headers['user-agent']
  const ip=req.socket.remoteAddress
  const log=new Log({idUsuario,idPut,navegador,ip})
  await log.save()

  res.json({
      "msg":"Actualizacion de Ensayo Exitosa!"
  })
}




export {
  ensayoPost, ensayoGetBuscar, ensayoGetBuscarVal,
  ensayoPutEditar, ensayoPutActivar, ensayoPutInactivar
};