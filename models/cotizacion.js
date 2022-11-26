import mongoose from "mongoose"

const CotizacionSchema = new mongoose.Schema({
    numCotizacion: { type: String },//
    idCliente: { type: mongoose.Schema.ObjectId, ref: "Usuario", required: true },
    idContacto: { type: mongoose.Schema.ObjectId, ref: "Usuario", required: true },
    oferta: { type: Date, required: true },
    entregaResultados: { type: Date, required: true },//
    elaborado: { type: mongoose.Schema.ObjectId, ref: "Usuario", required: true },//
    items: {
        item1: {
            itemsEnsayo: [{
                ensayo: { type: mongoose.Schema.ObjectId, ref: "Ensayo", required: true },
                costoEnsayo: { type: Number, required: true },
            }],
            costo: { type: Number, default: 0 }
        },
        item2: {
            itemsEnsayo: [{
                ensayo: { type: mongoose.Schema.ObjectId, ref: "Ensayo" },
                costoEnsayo: { type: Number },
            }],
            costo: { type: Number, default: 0 }
        },
        item3: {
            itemsEnsayo: [{
                ensayo: { type: mongoose.Schema.ObjectId, ref: "Ensayo" },
                costoEnsayo: { type: Number },
            }],
            costo: { type: Number, default: 0 }
        },
    },

    total: { type: Number, required: true },
    subtotal: { type: Number, required: true },
    iva: { type: Number, required: true },
    descuento: { type: Number, required: true },
    observaciones: { type: String, default: "" },
    estado: { type: Number, default: 1 },
    createdAt: { type: Date, default: Date.now() }
})

export default mongoose.model("Cotizacion", CotizacionSchema)