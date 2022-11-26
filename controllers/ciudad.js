import Ciudad from "../models/ciudad.js";
import Log from "../models/log.js";


const ciudadPost = async (req, res) => {
    const { CodDepartamento, departamento, ciudad, CodCiudad } = req.body
    const ciudadPost = new Ciudad({ CodDepartamento, departamento, ciudad, CodCiudad })
    await ciudadPost.save()
    const idUsuario = req.usuario._id
    const idPost = coti._id
    const navegador = req.headers['user-agent']
    const ip = req.socket.remoteAddress
    const log = new Log({ idUsuario, idPost, navegador, ip })
    await log.save()

    res.json({
        "msg": "Registro Exitoso"
    })
}

const ciudadPut = async (req, res) => {
    const { id } = req.params
    const { CodDepartamento, departamento, ciudad, CodCiudad } = req.body
    const ciudadPut = await Ciudad.findByIdAndUpdate(id, { CodDepartamento, departamento, ciudad, CodCiudad })
    res.json({
        "msg": `Actualizacion Exitosa!${ciudadPut}`
    })
}

const ciudadGetListarTodos = async (req, res) => {
    const ciudad = await Ciudad.find({});
    res.json({
        ciudad
    })
}

//listar ciudades de departamento
const ciudadDepartamentoGet = async (req, res) => {
    const { CodDepartamento } = req.query;
    const departamentos = await Ciudad.find({ CodDepartamento })
    res.json({ departamentos })
}

const buscarCiudadCodigoGet = async (req, res) => {
    const { CodCiudad } = req.query;
    const ciudades = await Ciudad.findOne({ CodCiudad })
    res.json({ ciudades })
}

const buscarDepartamentoNombreGet = async (req, res) => {
    const { departamento } = req.query;
    const departamentos = await Ciudad.find(
        //{nombre:new RegExp(query,"i")}
        {
            $or: [
                { departamento: new RegExp(departamento, "i") },
            ]
        }
    )
    res.json({ departamentos })
}
const buscarCiudadNombreGet = async (req, res) => {
    const { ciudad } = req.query;
  const ciudadesr = await Ciudad.find({
    
     ciudad
    
    
  });
  res.json(
    ciudadesr)
};


export {
    ciudadDepartamentoGet, ciudadGetListarTodos, ciudadPut, ciudadPost
    , buscarCiudadCodigoGet, buscarCiudadNombreGet, buscarDepartamentoNombreGet
}