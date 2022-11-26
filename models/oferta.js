import mongoose from 'mongoose';

const OfertaSchema = new mongoose.Schema({
    numCotizacion: { type: String, required: true },///ej: 0001-2022V1 
    fechaEmision: { type: Date, required: true, default: Date.now },
    idCliente: { type: mongoose.Schema.ObjectId, ref: "Usuario", required: true },
    idContacto: { type: mongoose.Schema.ObjectId, ref: "Usuario", required: true },
    validezOferta: { type: Date, required: true },   //debe ser mayor ala de emision
    entregaResultados: { type: Date, required: true },
    idElaboradoPor: { type: mongoose.Schema.ObjectId, ref: "Usuario", required: true },
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
                ensayo: { type: mongoose.Schema.ObjectId, ref: "Ensayo", required: true },
                costoEnsayo: { type: Number, required: true },
            }],
            costo: { type: Number, default: 0 }
        },
        item3: {
            itemsEnsayo: [{
                ensayo: { type: mongoose.Schema.ObjectId, ref: "Ensayo", required: true },
                costoEnsayo: { type: Number, required: true },
            }],
            costo: { type: Number, default: 0 }
        },
    },
    observaciones: { type: String, default: "" },
    subTotal: { type: Number, required: true },
    descuento: { type: Number, required: true },///descuento sobre el subtotal
    iva: { type: Number, required: true },
    total: { type: Number, required: true },
    estado: { type: Number, default: 1 },  //0 anulada   1:vigente
    createdAt: { type: Date, default: Date.now() }
})

export default mongoose.model('Oferta', OfertaSchema)