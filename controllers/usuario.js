import Usuario from "../models/usuario.js";
import bcryptjs from "bcryptjs"
import { generarJWT } from "../middlewares/validar-jwt.js";
import Log from "../models/log.js";

//agregar usuarios......ya............ 

const usuarioPost = async (req, res) => {
  const { tipopersona, nombre,apellidos, documento, direccion, ciudad, contacto,cargo, telefono,celular, correo, password, rol, estado } = req.body;
  let salt = bcryptjs.genSaltSync(10);
  const usuario = new Usuario({ tipopersona, nombre,apellidos, documento, direccion, ciudad, contacto,cargo, telefono,celular, correo, password, rol, estado });
  usuario.password = bcryptjs.hashSync(password, salt);
  await usuario.save();
  res.json({
    msg: "registro exitoso",
  });
};

// loguearse......ya..................
const usuarioGetlogin = async (req, res) => {
  let { correo, password } = req.body;
  const usuar = await Usuario.findOne({ correo });
  if (!usuar) res.json({ msg: "Usuario no encontrado" });
  else {
    const validPassword = bcryptjs.compareSync(password, usuar.password);
    if (validPassword) {
      const token = await generarJWT(usuar.id);
      res.json({
        usuar,
        token,
      });
    } else {
      res.json({ msg: "contraseña no valida" });
    }
  }
};

//buscar todoslos usuarios.....ya..........

const usuarioGetBuscar = async (req, res) => {
  const usuarios = await Usuario.find()
  .populate(
    "ciudad"
  )
  res.json({
    usuarios
  })
};

const usuarioGetListarTodosClientes=async(req,res)=>{
  const usuarios= await Usuario.find({rol:"Cliente"})
  .populate(
      "ciudad"
   )
   .populate(
       "usuario")
       
       
  
  res.json({
      usuarios
  })
};


//buscar usuarios por id ......ya............

const usuarioGetBuscarid = async (req, res) => {
  const { id } = req.params;
  const usuario = await Usuario.findById(id);
  res.json({
    usuario,
  });
};
const usuarioGetListarContactos=async(req,res)=>{
  const usuarios= await Usuario.find({rol:"Contacto"})
  .populate(
      "ciudad"
   )
   
       
  
  res.json({
      usuarios
  })
};

const usuarioGetBuscarRol = async (req, res) => {
  const usuario = await Usuario.find({rol:"Cliente"})
  .populate(
    "ciudad"
  )
  res.json({
    usuario,
  });
};


// buscar usuarios por nombre,email, numero de documento y telefono rol......ya........
const usuarioGetBuscarNoE = async (req, res) => {
  const { value } = req.query;
  const usuario = await Usuario.find({
    $or: [
      { nombre: new RegExp(value, "i") },
      { correo: new RegExp(value, "i") },
      { documento: new RegExp(value, "i") },
      { telefono: new RegExp(value, "i") },
      { rol: new RegExp(value, "i") },
    ],
  });
  res.json({
    usuario,
  });
};
//listar usuarios por direccion.....ya.---

const usuarioGetBuscarDir = async (req, res) => {
  const { ciudad } = req.params;
  const usuario = await Usuario.find({ ciudad });
  res.json({
    usuario,
  });
};

// modificar datos de usuario............ya..............

const usuarioPutEditar = async (req, res) => {
  const { id } = req.params;
  const { tipopersona, nombre,apellidos, documento, direccion, ciudad, contacto,cargo, telefono,celular, correo, password, rol, estado } = req.body;
  const usuario = await Usuario.findByIdAndUpdate(id, {
    tipopersona, nombre,apellidos, documento, direccion, ciudad, contacto,cargo, telefono,celular,correo, password, rol, estado
  });
  res.json({
    msg: "actualizacion de datos exitosa",
  });
};

// activacion de usuario............ya...........
const usuarioPutActivar = async (req, res) => {
  const { id } = req.params
  const usuario = await Usuario.findByIdAndUpdate(id, { estado: 1 })
  res.json({
    msg: "activacion de estado exitosa"

  })
};

// inactivacion de usuario............ya...........
const usuarioPutInactivar = async (req, res) => {
  const { id } = req.params
  const usuario = await Usuario.findByIdAndUpdate(id, { estado: 0 })
  res.json({
    msg: "inactivacion de estado exitosa"

  })
};

// vacaciones de usuario............ya...........
const usuarioPutVacaciones = async (req, res) => {
  const { id } = req.params
  const usuario = await Usuario.findByIdAndUpdate(id, { estado: 2 })
  res.json({
    msg: "vacaciones"

  })
};
const datosUsuarioPut=async(req,res)=>{
  const {id} =req.params
  const {tipoPersona,nombre,apellidos,documento,direccion,ciudad,celular,telefono,cargo,email,password,rol,contacto}=req.body
  let salt=bcryptjs.genSaltSync(10)
  const usuario = await Usuario.findByIdAndUpdate(id,{tipoPersona,nombre,apellidos,documento,direccion,ciudad,celular,telefono,cargo,email,password,rol,contacto})
  usuario.password=bcryptjs.hashSync(password,salt)
  await usuario.save()
  const idUsuario=req.usuario._id
  const idPut= id
  const navegador=req.headers['user-agent']
  const ip=req.socket.remoteAddress
  const log= new Log({idUsuario,idPut,navegador,ip})
  await log.save()

  res.json({
      usuario
  })
};
const usuarioPutRol=async(req,res)=>{
  const {id} =req.params
  const {rol}=req.body
  const usuario = await Usuario.findByIdAndUpdate(id,{rol})
  await usuario.save()
  const idUsuario=req.usuario.id
  const idPut= id
  const navegador=req.headers['user-agent']
  const ip=req.socket.remoteAddress
  const log= new Log({idUsuario,idPut,navegador,ip})
  await log.save()
  res.json({
      usuario
  })
}

export {
  usuarioPost, usuarioPutActivar, usuarioPutInactivar,
   usuarioPutVacaciones, usuarioPutEditar, usuarioGetlogin,
    usuarioGetBuscarDir, usuarioGetBuscar, usuarioGetBuscarid, 
    usuarioGetBuscarNoE,datosUsuarioPut,usuarioPutRol,
    usuarioGetListarTodosClientes,usuarioGetBuscarRol,usuarioGetListarContactos
};