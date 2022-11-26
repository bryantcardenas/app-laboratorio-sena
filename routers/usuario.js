import { Router } from "express"
import { check } from "express-validator";
import { validarRol } from "../middlewares/validar-rol.js";
// import usuario from "../models/usuario.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
// import validarExistaArchivo from "../middlewares/validar-exita-archivo.js";
import helpersUsuario from "../helpers/usuario.js";
import { datosUsuarioPut, usuarioGetBuscar, usuarioGetBuscarDir,
     usuarioGetBuscarid, usuarioGetBuscarNoE, usuarioGetBuscarRol,
      usuarioGetListarContactos,
      usuarioGetListarTodosClientes,  usuarioGetlogin, usuarioPost,
       usuarioPutActivar, usuarioPutEditar, usuarioPutInactivar, usuarioPutRol,
        usuarioPutVacaciones } from "../controllers/usuario.js";
//import {existeRol} from "../helpers/usuario.js"

const router = Router();          


//ya..esditar..
router.put("/:id", [
    check('id').isMongoId(),
    validarJWT,
    check('nombre', "El nombre es obligatoro").not().isEmpty(),
    check('apellidos', "El apellido es obligatoro").not().isEmpty(),
    check('documento', "Es Obligatorio el documento").not().isEmpty(),
    check('direccion', "Es Obligatorio este campo").not().isEmpty(),
    check('ciudad', "Es Obligatorio este campo").not().isEmpty(),
    check('contacto', "Es Obligatorio este campo").not().isEmpty(),
    check('telefono', "Es Obligatorio el telefono").not().isEmpty(),
    check('correo', "Es Obligatorio").not().isEmpty(),
    check('correo', "No es un email valido").isEmail(),
    check('password', "Es Obligatorio este campo").not().isEmpty(),
    check('password', "Debe tener más de 8 caracteres").isLength({ min: 8 }),
    check('rol', "Es Obligatorio el rol").not().isEmpty(),
    validarRol("director", "auxiliar",),
    validarCampos
], usuarioPutEditar);

//ya....login

router.post("/login", [
    check('correo', "el correo es obligatorio").isEmail(),
    check('password', "la contraseña es obligatoria").not().isEmpty(),
    validarCampos
], usuarioGetlogin);

//ya....buscar todos
router.get("/b", [
    validarJWT,
    validarRol("director", "auxiliar",),
    validarCampos
], usuarioGetBuscar);

router.get("/listarContactos",[
    validarJWT,
    validarCampos
],usuarioGetListarContactos)

router.get("/listarRol",[
    validarJWT,
    validarRol("director","auxiliar","cientifico","recepcionista"),
    validarCampos,
    ],usuarioGetBuscarRol)

//ya....buscar nombre, email, telefono,documento y rol 
router.get("/NoE", [
    validarJWT,
    validarRol("director", "auxiliar",),
    validarCampos
], usuarioGetBuscarNoE);

//ya....buscar por id 
router.get("/buscarid/:id", [
    validarJWT,
    validarRol("director", "cientifico", "auxiliar",),
    check('id').isMongoId(),
    validarCampos
], usuarioGetBuscarid)

//ya....buscar por ciudad
router.get("/ciudad/:ciudad", [
    validarJWT,
    validarRol("director", "auxiliar",),
    // check('Ciudad',"Es Obligatorio este campo").not().isEmpty(),
    check('ciudad', "no es una ciudad ").isMongoId(),
    validarCampos
], usuarioGetBuscarDir);

//ya....
router.put("/activar/:id", [
    validarJWT,
    validarRol("director"),
    check('id').isMongoId(),
    validarCampos
], usuarioPutActivar);
//ya....
router.put("/inactivar/:id", [
    validarJWT,
    validarRol("director"),
    check('id').isMongoId(),
    validarCampos
], usuarioPutInactivar);

//ya....
router.put("/vacaciones/:id", [
    validarJWT,
    validarRol("director"),
    check('id').isMongoId(),
    validarCampos
], usuarioPutVacaciones);

router.post("/insertarUsuario", [
    check('nombre', "El nombre es obligatoro").not().isEmpty(),
    check('nombre', "Debe tener menos de 50 caracteres").isLength({ max: 50 }),
    check('apellidos', "El apellido es obligatoro").not().isEmpty(),
    check('apellidos', "Debe tener menos de 50 caracteres").isLength({ max: 50 }),
    check('documento').not().isEmpty(),
    check('direccion', "Es Obligatorio este campo").not().isEmpty(),
    check('ciudad', "Es Obligatorio este campo").not().isEmpty(),
    check('contacto', "Es Obligatorio este campo").not().isEmpty(),
    check('telefono', "Es Obligatorio el telefono").not().isEmpty(),
    check('telefono', "Debe tener menos de 14 caracteres").isLength({ max: 14 }),
    check('celular',"El celular es obligatoro").not().isEmpty(),
    check('celular',"Debe tener menos de 50 caracteres").isLength({max:50}),
    check('password', "Es Obligatorio").not().isEmpty(),
    check('password', "Debe tener más de 8 caracteres").isLength({ min: 8 }),
    check('correo', "Es Obligatorio").not().isEmpty(),
    check('correo', "No es un correo valido").isEmail(),
    check('correo').custom(helpersUsuario.existeEmail),
    check("documento").custom(helpersUsuario.existenumDocumento),
    validarCampos,
], usuarioPost);


router.put("/datos/:id",[
    validarJWT,
    check('nombre',"El nombre es obligatorio").not().isEmpty(),
    check('nombre',"Debe tener menos de 50 caracteres").isLength({max:50}),
    check('apellidos',"El apellidos es obligatorio").not().isEmpty(),
    check('apellidos',"Debe tener menos de 50 caracteres").isLength({max:50}),
    check('direccion',"El direccion es obligatorio").not().isEmpty(),
    check('direccion',"Debe tener menos de 50 caracteres").isLength({max:50}),
    check('ciudad',"La ciudad es obligatoria").not().isEmpty(),
    check('celular',"El celular es obligatoro").not().isEmpty(),
    check('celular',"Debe tener menos de 50 caracteres").isLength({max:50}),
    check('correo',"Es Obligatorio").not().isEmpty(),
    check('correo',"No es un correo valido").isEmail(),
    check('password',"Es Obligatorio").not().isEmpty(),
    check('password',"Debe tener mas de 8 caracteres").isLength({min:8}),
    check('rol',"Debe tener menos de 50 caracteres").isLength({max:50}),
    validarCampos,
],datosUsuarioPut)

router.put("/rol/:id",[
    validarJWT,
    check('rol',"Debe tener menos de 50 caracteres").not().isEmpty(),
    validarCampos,
],usuarioPutRol)

router.get("/listarClientes",[//usuarioGetListarTodosContactos
    validarJWT,
    validarCampos
],usuarioGetListarTodosClientes)


export default router;