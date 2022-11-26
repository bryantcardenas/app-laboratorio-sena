import mongoose from "mongoose";

const ConsecutivoSchema = new mongoose.Schema({
    numeroCotizacion: { type: Number, default: 1 },
    infoNro: { type: Number, default: 1 },
    codMuestra: { type: Number, default: 1 },
}) 

export default mongoose.model("consecutivo",ConsecutivoSchema)