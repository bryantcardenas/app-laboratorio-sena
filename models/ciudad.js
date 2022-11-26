import mongoose from 'mongoose';

const CiudadSchema = new mongoose.Schema({
    CodDepartamento: { type: String, required: true },
    Departamento: { type: String, required: true },
    CodCiudad: { type: String, required: true },
    Ciudad: { type: String, required: true },
    

})

export default mongoose.model('Ciudad', CiudadSchema)