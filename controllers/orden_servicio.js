import OrdenServicio from "../models/ordenServicio.js"
import { generarJWT } from "../middlewares/validar-jwt.js";

//insertar orden
const ordenServicioPost = async (req, res) => {
  const { ensayo, realizado, supervisado, observaciones, estado } = req.body
  const ordenServicio = new OrdenServicio({ ensayo, realizado, supervisado, observaciones, estado })
  await ordenServicio.save()

  res.json({
    msg: "Registro de orden exitoso"
  })
}
//Listar todas
const ordenServicioGet = async (req, res) => {
  const ordenServicio = await OrdenServicio.find({})
  res.json({
    ordenServicio

  })
}

//Listar por Id
const ordenServicioGetBuscarid = async (req, res) => {
  const { id } = req.params;
  const ordenServicio = await OrdenServicio.findById(id);
  res.json({
    ordenServicio,
  });
};

//Listar por Id
const ordenServicioGetRealizo = async (req, res) => {
  const { realizado } = req.params;
  const ordenServicio = await OrdenServicio.findById(realizado);
  res.json({
    ordenServicio,
  });
};

//Listar por Id
const ordenServicioGetSuperviso = async (req, res) => {
  const { supervisado } = req.params;
  const ordenServicio = await OrdenServicio.findById(supervisado);
  res.json({
    ordenServicio,
  });
};



//Estado
const ordenServicioPutActivar = async (req, res) => {
  const { id } = req.params
  const ordenServicio = await OrdenServicio.findByIdAndUpdate(id, { estado: 1 })
  res.json({
    msg: "activacion de estado exitosa"

  })
}
const ordenServicioPutInactivar = async (req, res) => {
  const { id } = req.params
  const ordenServicio = await OrdenServicio.findByIdAndUpdate(id, { estado: 0 })
  res.json({
    msg: "Inactivacion de estado exitosa"

  })
}

//Buscar orden por código
const ordenServicioGetBuscarCodigo = async (req, res) => {
  const { codigo } = req.params;
  const ordenServicio = await OrdenServicio.find(codigo);
  res.json({
    ordenServicio,
  });
};


//Modificar orden
const ordenServicioPutEditar = async (req, res) => {
  const { id } = req.params;
  const { realizado, supervisado, observaciones } = req.body;
  const ordenServicio = await OrdenServicio.findByIdAndUpdate(id, {
    realizado,
    supervisado,
    observaciones
  });
  res.json({
    msg: "actualizacion de datos exitosa",
  });
};


export { ordenServicioGetSuperviso, ordenServicioGetRealizo, ordenServicioPost, ordenServicioGet, ordenServicioGetBuscarid, ordenServicioPutActivar, ordenServicioPutInactivar, ordenServicioGetBuscarCodigo, ordenServicioPutEditar }