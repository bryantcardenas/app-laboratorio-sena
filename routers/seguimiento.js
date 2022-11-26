import { Router } from "express";
import {SeguimientosGet,SeguimientoPost,SeguimientoPutdatos,SeguimientoGetN, SeguimientosGetNombreoCc} from "../controllers/seguimiento.js";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import Resultado from "../helpers/informeResultado.js";
import helpersUsuario from "../helpers/usuario.js"
import HerlpersCotizacion from "../helpers/cotizacion.js";



const router = Router();
//yaaaa:::::::::::::::::::::::::::::

router.post("/insertar", [
    validarJWT,
    // check('Codigo').isMongoId(), //informeR
    check('Codigo').not().isEmpty(),
    check('DatosCliente').isMongoId(), //Usuario
    check('DatosCliente').custom(helpersUsuario.existePersonaById),
    check('DatosContacto').isMongoId(), //Usuario
    check('DatosContacto').custom(helpersUsuario.existePersonaById),
    check('Solicitud').not().isEmpty(),
    check('MedioSolicitud',"id no valido").isMongoId(), //Cotizacion
    check('MedioSolicitud').custom(HerlpersCotizacion.existeCotizacionById),
    check('RecibidoP').isMongoId(), //Usuario
    check('RecibidoP').custom(helpersUsuario.existePersonaById),
    check('PorcentajeAceptacion').not().isEmpty(),
    check('RegistroAceptacion').not().isEmpty(),
    check('MotivoRechazo').not().isEmpty(),
    check('SeguimientoCotizaciones').isMongoId(), //Cotizacion
    check('SeguimientoCotizaciones').custom(HerlpersCotizacion.existeCotizacionById),
    validarCampos,
],SeguimientoPost);

// GET listar seguimiento por nombre o cc de usuario

router.get("/listarNoC",[
    ],SeguimientosGetNombreoCc); //REVISAR



// GET Listar todos los seguimientos......ya
router.get("/listarTodos", SeguimientosGet);



// GET Buscar seguimiento por # codigo ...ya
router.get("/seguimientoCodigo", [
    check("Codigo").not().isEmpty()
], SeguimientoGetN);


// editar seguimientos  
router.put("/editar/:id", [
  validarJWT,
  check('id').isMongoId(),
  check('Codigo',"el codigo no existe").not().isEmpty(), //informeR
//   check('Codigo').custom(Resultado.existeInformeById),
  check('DatosCliente').isMongoId(), //Usuario
  check('DatosCliente').custom(helpersUsuario.existePersonaById),
  check('DatosContacto').isMongoId(), //Usuario
  check('DatosContacto').custom(helpersUsuario.existePersonaById),
  check('Solicitud').not().isEmpty(),
  check('MedioSolicitud').isMongoId(), //Cotizacion
  check('MedioSolicitud').custom(HerlpersCotizacion.existeCotizacionById),
  check('RecibidoP').isMongoId(), //Usuario
  check('RecibidoP').custom(helpersUsuario.existePersonaById),
  check('PorcentajeAceptacion').not().isEmpty(),
  check('RegistroAceptacion').not().isEmpty(),
  check('MotivoRechazo').not().isEmpty(),
  check('SeguimientoCotizaciones').isMongoId(), //Cotizacion
  check('SeguimientoCotizaciones').custom(HerlpersCotizacion.existeCotizacionById),
  validarCampos,
],SeguimientoPutdatos);

export default router