import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-campos";
import { validarJWT } from "../middlewares/validar-jwt";

const router = Router()

router.post("/insertarItems", [
    validarJWT,

    check('codigo', "el codigo es requerido").not().isEmpty(),
    check('codigo', "el codigo debe tener menos de 100 caracteres").isLength()({ max: 100 }),
    check('nombre', "el nombre es requerido").not().isEmpty(),
    check('nombre', "el nombre debe tener menos de 50 caracteres").isLength()({ max: 50 }),
    check('precio', "el precio es requerido").not().isEmpty(),
    check('precio', "el precio debe tener menos de 50 caracteres").isLength()({ max: 50 }),
    check('estado', "el estado es requerido").not().isEmpty(),
    check('duracion', "el estado es requerido").not().isEmpty(),

], validarCampos)


export default router;