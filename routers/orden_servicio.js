import { Router } from "express"
import { check } from "express-validator";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { validarCampos } from "../middlewares/validar-campos.js";
// import { validarJWT } from "../middlewares/validar-jwt.js";
import { ordenServicioGet, ordenServicioGetBuscarCodigo, ordenServicioGetBuscarid, ordenServicioGetRealizo, ordenServicioGetSuperviso, ordenServicioPost, ordenServicioPutActivar, ordenServicioPutEditar, ordenServicioPutInactivar } from "../controllers/orden_servicio.js";
import HelpersOrdenServicio from "../helpers/orden_servicio.js";


const router = Router();
//Insertar Orden
router.post("/insertarOrden", [
    check('ensayo', "El nombre es obligatoro").not().isEmpty(),
    check('realizado', "El campo realizado es Obligatorio").not().isEmpty(),
    check('supervisado', "El campo supervisado es Obligatorio").not().isEmpty(),
    check('observaciones', "Debe tener al menos 5 caracteres").isLength({ min: 5 }),
    check('createdAt', "El campo es Obligatorio").not().isEmpty(),
    validarCampos,
], ordenServicioPost);


//Listar Todas las ordenes
router.get("/listartodo", [
    validarJWT,
    check('id').isMongoId(),
    validarCampos
], ordenServicioGet);


//buscar orden por ID
router.get("/buscarid/:id", [
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(HelpersOrdenServicio.existeOrdenById),
    validarCampos
], ordenServicioGetBuscarid)

//buscar orden por quien la Realizo
router.get("/buscarid/:id", [
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(HelpersOrdenServicio.existeOrdenById),
    validarCampos
], ordenServicioGetRealizo)

//buscar orden por quien la superviso
router.get("/buscarid/:id", [
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(HelpersOrdenServicio.existeOrdenById),
    validarCampos
], ordenServicioGetSuperviso)


//Buscar por codigo
router.get("/buscar/codigo", [
    validarJWT,
    validarCampos
], ordenServicioGetBuscarCodigo);


//Inactivar orden
router.put("/inactivar/:id", [
    validarJWT,
    check('id').isMongoId(),

    validarCampos
], ordenServicioPutInactivar);

//Activar orden
router.put("/activar/:id", [
    validarJWT,
    check('id').isMongoId(),

    validarCampos
], ordenServicioPutActivar);

//Modificar orden
router.put("/editar/:id", [
    validarJWT,
    check('id').isMongoId(),

    validarCampos
], ordenServicioPutEditar);


export default router;

