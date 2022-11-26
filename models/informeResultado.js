import mongoose from 'mongoose';

const ResultadoSchema = new mongoose.Schema({
    idMuestra: { type: mongoose.Schema.ObjectId, ref: "Muestra", required: true },
    infoNro: { type: Number},
    fechaEmisionInforme: { type: Date, required: true },
    fechaAnalisis: {type: Date,required: true},
    ensayo: {type: mongoose.Schema.ObjectId,ref: "Ensayo",required: true},
    resultado: {type: String,required: true},
    incertidumbreExpandida: {type: String,required: true},
    observaciones: { type: String, default: "" },
    reviso:{type:String,required:true},
    aprobo:{type:String,required:true},
    estado:{type:Number,default:1},
    createdAt: { type: Date, default: Date.now },
})

export default mongoose.model("Resultado", ResultadoSchema) 