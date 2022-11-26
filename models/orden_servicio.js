import mongoose from "mongoose";

const Ordenschema = new mongoose.Schema({
    idMuestra: { type: mongoose.Schema.ObjectId, ref: "Muestra", required: true },
    ensayo: [{
        idensayo: { type: mongoose.Schema.ObjectId, ref: "Ensayo", required: true },
        responsable: { type: mongoose.Schema.ObjectId, ref: "Usuario", },
        supervisado: { type: mongoose.Schema.ObjectId, ref: "Usuario", },
        resultado: { type: Number, default: "" },
        incertidumbre: { type: Number, default: "" },
        estado: { type: String, default: "En proceso" },
    }],

    observaciones: { type: String, default: "" },
    estado: { type: Number, default: 1 },
    createdAt: { type: Date, default: Date.now() }
})

export default mongoose.model('Orden', Ordenschema)