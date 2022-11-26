import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import HelpersCiudad from "../helpers/ciudad.js";
import { buscarCiudadCodigoGet, buscarCiudadNombreGet, buscarDepartamentoNombreGet, ciudadDepartamentoGet, ciudadGetListarTodos, ciudadPut } from "../controllers/ciudad.js";

const router = Router()

router.put("/:id", [
    validarJWT,
    check('coddepartamento', "El coddepartamento es obligatorio").not().isEmpty(),
    check('ciudad', "La ciudad es obligatoria").not().isEmpty(),
    check('codciudad', "El codciudad es obligatorio").not().isEmpty(),
    validarCampos,
], ciudadPut)

router.get("/CiudadDepartamento", ciudadGetListarTodos)

router.get("/departamento", [
    check('coddepartamento', "el codigo del departamento es obligatoria").not().isEmpty(),
    check('coddepartamento').custom(HelpersCiudad.existeDepartamentoById),
    validarCampos
], ciudadDepartamentoGet)

router.get("/ciudadnombre", [
    check('codciudad', "el codigo de la ciudad es obligatorio").not().isEmpty(),
    check('codciudad').custom(HelpersCiudad.existeCiudadById)
], buscarCiudadCodigoGet)

router.get("/departamentonombre", [
    check('departamento', "El nombre del departamento es requerido")
], buscarDepartamentoNombreGet)

    
router.get("/:Ciudad", [
    validarCampos
], buscarCiudadNombreGet)

export default router