import { check } from "express-validator";
import { Router } from "express";
import { validarMongoId } from "../middlewares/validar-MongoId.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { ensayoPost, ensayoGetBuscar, ensayoGetBuscarVal,  ensayoPutActivar, ensayoPutInactivar, ensayoPutEditar } from "../controllers/ensayo.js";
// import HelpersEnsayo from "../helpers/ensayo.js";
import { validarRol } from "../middlewares/validar-rol.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import HelpersEnsayo from "../helpers/ensayo.js";

const router = Router();

router.post("/insertarEnsayo", [
    validarJWT,
    check('ensayo', "Es Obligatorio").not().isEmpty(),
    check('ensayo').custom(HelpersEnsayo.existeEnsayo),
    check('metodo',"el metodo es obligatorio").not().isEmpty(),
    check('tecnica',"la tecnica es obligatoria").not().isEmpty(),
    check('valorMinimo',"el valor minimo es obligatorio").not().isEmpty(),
    check('valorMaximo',"el valor maximo es obligatorio").not().isEmpty(),
    check('unidades').not().isEmpty(),
    check('costo', "Es Obligatorio").not().isEmpty(),
    check('costo', "el costo es numerico").isNumeric(),
    // check('estado', "Es Obligatorio").isEmpty(),
    check('estado', "el estado es numerico").isNumeric(),
    check('limiteCuantificacion', "El limite de cuantificacion es requerido").not().isEmpty(),
    check('limiteCuantificacion', "El limite de cuantificacion debe de ser numero").isNumeric(),
    check('titular').isMongoId(),
    check('suplente').isMongoId(),
    // validarRol,  
    validarCampos,
], ensayoPost);


router.get("/buscarEnsayo", [
    validarJWT,
    check('ensayo'),
    validarCampos
], ensayoGetBuscar)


router.get("/buscarValor", [
    validarJWT,
    check('valorMaximo,valorMinimo'),
    validarCampos
], ensayoGetBuscarVal)

//inactivar 
router.put("/inactivar/:id", [
    validarJWT,
    check('id').isMongoId(),
    check('id').custom(HelpersEnsayo.existeEnsayoById),
    // validarRol,
    validarCampos
], ensayoPutInactivar);

//activar 
router.put("/activar/:id", [
    validarJWT,
    check('id').isMongoId(),
    check('id').custom(HelpersEnsayo.existeEnsayoById),
    // validarRol,
    validarCampos
], ensayoPutActivar);


//editar ususario
router.put("/editar/:id", [
    validarJWT,
    check('id').isMongoId(),
    check('id').custom(HelpersEnsayo.existeEnsayoById),
    check('ensayo',"el ensayo es requerido").not().isEmpty(),
    check('metodo',"el metodo es obligatorio").not().isEmpty(),
    check('tecnica',"la tecnica es obligatoria").not().isEmpty(),
    check('valorMaximo',"el valor maximo es obligatorio").not().isEmpty(),
    check('valorMinimo',"el valor minimo es obligatorio").not().isEmpty(),
    check('unidades').not().isEmpty(),
    check('estado', "el estado es numerico").isNumeric(),
    check('costo',"el costo es requerido").not().isEmpty(),
    check('costo',"el costo es numerico").isNumeric(),
    check('descripcion', "Es Obligatorio").not().isEmpty(),
    check('limiteCuantificacion', "Es Obligatorio").not().isEmpty(),
    validarCampos
], ensayoPutEditar);

// router.put("/:id",[
//     validarJWT,
//     check('id').isMongoId(),
//     check('id').custom(HelpersEnsayo.existeEnsayoById),
//     check('ensayo',"el ensayo es requerido").not().isEmpty(),
//     check('metodo',"el metodo es requerido","el aaaa es requerido").not().isEmpty(),
//     check('tecnica',"la tecnica es requerido").not().isEmpty(),
//     check('valorMinimo',"el valorMinimo es requerido").not().isEmpty(),
//     check('valorMaximo',"el valorMaximo es requerido").not().isEmpty().not().isEmpty(),
//     check('unidades',"las unidades es requerido").not().isEmpty(),
//     check('costo',"el costo es requerido").not().isEmpty(),
//     check('costo',"el costo es numerico").isNumeric(),
//     check('descripcion',"la descripcion es requerido").not().isEmpty(),
//     validarCampos
// ],ensayoPut)


export default router;