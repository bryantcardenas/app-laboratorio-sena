import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import {resultadoPost,listarResultados,activarPut,desactivarPut,editarResultadosPut } from "../controllers/informe_resultado.js";
import HelpersEnsayo from "../helpers/ensayo.js";
import HelpersMuestra from "../helpers/muestra.js";


const router = Router();

router.post('/insertar', [
    validarJWT,
    check('idMuestra').custom(HelpersMuestra.existeMuestraById),
    check('fechaEmisionInforme',"Es Obligatorio").not().isEmpty(),
    check('fechaAnalisis',"Es Obligatorio").not().isEmpty(),
    check('resultado',"Es Obligatorio").not().isEmpty(),
    check('resultado',"Es Obligatorio").not().isEmpty(),
    check('incertidumbreExpandida',"Es Obligatorio").not().isEmpty(),
    check('ensayo',"Es Obligatorio").not().isEmpty(),
    check('ensayo').custom(HelpersEnsayo.existeEnsayo),
    check('observaciones',"Es Obligatorio").not().isEmpty(),

    validarCampos
],resultadoPost)
   
router.get('/listar',listarResultados)

// router.get('/codigo',buscarInformeRPorCodigoDeMuestraGet)

//editar
router.put("/editar/:id", [   // por defecto imforme 1
    validarJWT,  
    check('idMuestra',"no es un id valido").isMongoId(),
    check('idMuestra').custom(HelpersMuestra.existeMuestraById),
    check('ensayo',"id ensayo no valido").isMongoId(),
    check('ensayo').custom(HelpersEnsayo.existeEnsayoById),  
    check('reviso', "Es Obligatorio").not().isEmpty(),
    check('aprobo', "Es Obligatorio").not().isEmpty(),
    
    
    validarCampos
], editarResultadosPut);  

//inactivar 
router.put("/inactivar/:id", [
    validarJWT,
    check('id').isMongoId(),
    validarCampos
], desactivarPut);

//activar 
router.put("/activar/:id", [
    validarJWT,
    check('id').isMongoId(),
    validarCampos
], activarPut);


export default router;