import { Router } from "express"
import { tipoMuestraPost } from "../controllers/tipo_muestra.js";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";



const router = Router();

router.post("/tipo", [
    validarJWT,
    check('tipos', "El campo tipo de Muestra es obligatorio").not().isEmpty(),
    validarCampos
], tipoMuestraPost);


export default router;