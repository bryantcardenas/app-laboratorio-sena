import mongoose from "mongoose"

const UsuarioSchema = new mongoose.Schema({
    tipoPersona: { type: String, required: true, default: "Natural" },
    //Natural  Juridica
    nombre: { type: String,maxlength:50, required: true },
    apellidos:{type:String,maxlength:50,required:true},//////////
    documento: { type: String, required: true, unique: true },
    direccion: { type: String, required: true },
    ciudad: { type: mongoose.Schema.ObjectId, ref: "Ciudad", required: true },
    departamento: { type: mongoose.Schema.ObjectId, ref: "Ciudad"},/////////////////
    contacto: { type:String,required:true},
    cargo:{type:String},////////////////////
    celular:{type:String,maxlength:50},////////////////////
    telefono: { type: String, maxLength: 14, required: true },
    correo: { type: String, required: true, unique: true },
    password: {type: String, required: true,minlength:8},
    rol: { type: String, required: true, default: "Cliente" },//admin, tecnico
    estado: { type: Number, default: 1 },
    createdAt: { type: Date, default: Date.now() },
    //0 inactivo  1:activo   2:vacaciones 
})

export default mongoose.model("Usuario", UsuarioSchema)