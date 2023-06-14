module.exports = (mongoose) => {
   
    const schema = mongoose.Schema(
    {
        title: { type: String, 
            //required: [true, 'Title field is mandatory']
         },
    descricao: String,
    diagnostico:String,
    objetivo:String,
    meta:String,
    status:String,
    },


    { timestamps: false }
    );
    const Atividade = mongoose.model("atividades", schema);
    return Atividade;
};
    