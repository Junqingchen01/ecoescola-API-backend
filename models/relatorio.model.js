module.exports = (mongoose) => {
   
    const schema = mongoose.Schema(
    {
        resumo: String,
        processo:String,
        conclucao:String, 
    },


    { timestamps: false }
    );
    const Relatorio = mongoose.model("relatorios", schema);
    return Relatorio;
};