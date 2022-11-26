import mongoose from 'mongoose';

const ConsecutivoSchema = new mongoose.Schema({
    consecutivoMuestra: { type: Number, default: 1 },
    consecutivoOferta: { type: Number, default: 1 },
    iva: { type: Number, default: 19 },
    oferta: {
        version: {},
        aprobacion: {},
        codigo: {}
    }
})

export default mongoose.model("Consecutivo", ConsecutivoSchema)
