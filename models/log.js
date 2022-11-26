import mongoose from 'mongoose';

const logSchema = new mongoose.Schema({

    idUsuario: { type: String },
    idPost: { type: String },
    idPut: { type: String },
    navegador: { type: String },
    ip: { type: String },
    createdAt: { type: Date, default: Date.now() },
})

export default mongoose.model('Log', logSchema)