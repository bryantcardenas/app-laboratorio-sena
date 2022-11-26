import { Router } from "express";
import { check } from "express-validator"
import { validarCampos } from "../middlewares/validar-campos.js"
import { validarJWT } from "../middlewares/validar-jwt.js";
import HelpersMuestra from "../helpers/muestra.js";
import {   datosMuestraPost, muestraGetBuscar, muestraGetBuscarCodigo, muestraGetBuscarTipo, muestraPutActivar, muestraPutEditar, muestraPutInactivar, muestrasGetBuscarMunDpto } from "../controllers/muestra.js";
import { validarRol } from "../middlewares/validar-rol.js";
import HerlpersCotizacion from "../helpers/cotizacion.js";
// import usuario from "../models/usuario.js";
// import cotizacion from "../models/cotizacion.js";
// import ciudad from "../models/ciudad.js";
// import tipo_muestra from "../models/tipo_muestra.js";


const router = Router();

router.put("/editar/:id", [
    validarJWT,
    check('id').isMongoId(),
    check('id').custom(HerlpersCotizacion.existeCotizacionById),
    check('solicitante').isMongoId(),
    check('solicitante').custom(HerlpersCotizacion.existeCotizacionById),
    check('codMuestra', "Es Obligatorio el codigo").not().isEmpty(),
    check('munRecoleccion', "Es Obligatorio este campo").not().isEmpty(),
    // check('munRecoleccion',"el id de la ciudad es requerido").isMongoId(ciudad),
    check('direccionTomaMuestra', "Es Obligatorio este campo").not().isEmpty(),
    check('muestraRecolectadaPor', "Es Obligatorio este campo").not().isEmpty(),
    check('tipoMuestra', "Es Obligatorio el telefono").not().isEmpty(),
    // check('tipoMuestra',"el id del tipo de muestra es requerido").isMongoId(tipo_muestra),
    check('matrizMuestra', "Es Obligatorio").not().isEmpty(),
    check('fechaRecoleccion', "No es un email valido").isEmail(),
    check('cotizacion', "Es Obligatorio este campo").not().isEmpty(),
    // check('cotizacion',"el id del tipo de cotizacion es requerido").isMongoId(cotizacion),


    validarRol("director", "auxiliar",),
    validarCampos
], muestraPutEditar);

router.put("/activar/:id", [
    validarJWT,
    validarRol("director"),
    check('id').isMongoId(),
    check('id').custom(HelpersMuestra.existeMuestraById),
    validarCampos
], muestraPutActivar);


router.put("/inactivar/:id", [
    validarJWT,
    validarRol("director"),
    check('id').isMongoId(),
    check('id').custom(HelpersMuestra.existeMuestraById),
    validarCampos
], muestraPutInactivar);


// lista yaaaaaaaaaaaaaaaaaaaaaaaaaaa
router.get("/buscar", [
    validarJWT,
    validarRol("director", "auxiliar","Cientifico","Recepcionista"),
    validarCampos
], muestraGetBuscar);


// lista yaaaaaaaaaaaaaaaaaaaaa
router.get('/buscarCodigo', [
    validarCampos
], muestraGetBuscarCodigo)

// lista buscar por tipo id yaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
router.get("/buscarTipo/:id", [
    validarJWT,
    validarRol("director", "auxiliar","cientifico","recepcionista"),
    check('id', 'No es un ID válido de la muestra').not().isEmpty(),
    check('id').custom(HelpersMuestra.existeMuestraById),
    validarCampos
], muestraGetBuscarTipo)


router.get("/buscarMuni/:id", [
    validarJWT,
    validarRol("director", "auxiliar","cientifico","recepcionista"),
    validarCampos
], muestrasGetBuscarMunDpto)

// router.get("/buscarFecha",[
//     validarJWT,
//     validarRol("director", "auxiliar","Cientifico","Recepcionista"),
//     validarCampos
// ],muestraFechaGet)



router.post('/insertar', [
    validarJWT,
    check('solicitante').isMongoId(),
    // check('solicitante').custom(HerlpersCotizacion.existeCotizacionById),
    // check('codMuestra'," es obligatorio").not().isEmpty(),
    // check('codMuestra',"El nombre debe tener menos de 15 caracteres").isLength({max:20}),
    check('munRecoleccion', " es obligatorio").isMongoId(),
    check('direccionTomaMuestra', " es obligatorio").not().isEmpty(),
    check('lugarTomaMuestra', " es obligatorio").not().isEmpty(),
    check('lugarTomaMuestra', "El nombre debe tener menos de 30 caracteres").isLength({ max: 30 }),
    check('muestraRecolectadaPor', " es obligatorio").not().isEmpty(),
    check('muestraRecolectadaPor', "El nombre debe tener menos de 30 caracteres").isLength({ max: 30 }),
    check('procedimientoMuestreo', " es obligatorio").not().isEmpty(),
    check('tipoMuestra', " es obligatorio").not().isEmpty(),
    check('tipoMuestra', "El nombre debe tener menos de 50 caracteres").isLength({ max: 50 }),
    check('matrizMuestra', " es obligatorio").not().isEmpty(),
    check('matrizMuestra', "El nombre debe tener menos de 20 caracteres").isLength({ max: 20 }),
    check('fechaRecoleccion', " es obligatorio").not().isEmpty(),
    check('cotizacion', " es obligatorio").not().isEmpty(),
    check('item').not().isEmpty(),
    validarCampos
], datosMuestraPost)

export default router;