import mongoose from "mongoose";

const SeguimientoSchema= new mongoose.Schema({
    // Codigo:{type:mongoose.Schema.ObjectId,ref:"Resultado",required:true},
    Codigo:{type:String,required:true},
    DatosCliente:{type:mongoose.Schema.ObjectId,ref:"Usuario",required:true},
    DatosContacto:{type:mongoose.Schema.ObjectId,ref:"Usuario",required:true}, 
    Solicitud:{type:String,required:true},
    MedioSolicitud:{type:mongoose.Schema.ObjectId,ref:"Cotizacion",required:true},   
    RecibidoP:{type:mongoose.Schema.ObjectId,ref:"Usuario",required:true}, 
    PorcentajeAceptacion:{type:String,required:true},
    RegistroAceptacion:{type:String,required:true},
    MotivoRechazo:{type:String,required:true},
    SeguimientoCotizaciones:{type:mongoose.Schema.ObjectId,ref:"Cotizacion",required:true},
    createdAt:{type:Date,default:Date.now()}
})

export default mongoose.model("Seguimiento",SeguimientoSchema)
 
