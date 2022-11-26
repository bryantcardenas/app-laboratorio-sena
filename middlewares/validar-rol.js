const validarRol = (...roles) => {
    return (req, res, next) => {

    // ["CLIENTE","ADMIN","TECNICO"];

        if (!(roles.includes(req.usuario.rol))) {
            return res.status(401).json({ msg: `El servicio requiere uno de estos roles ${roles}` });
        }
        next();
    }
}



export { validarRol }