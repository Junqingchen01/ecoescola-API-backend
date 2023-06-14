module.exports = (mongoose) => {
    const schema = mongoose.Schema(
    {
    nome: { type: String, 
        required: [true, 'Title field is mandatory']
    },
    apelido: String,
    username:{ type: String, required: [true, 'Username is mandatory'] },
    password:{ type: String, required: [true, 'Password is mandatory'] },
    email:String,
    contacto:Number,
    localizacao:String,
    pontos:Number,
    tarefas:Number,
    cargo:String,
    
    },


    { timestamps: false }
    );
    const utilizadors = mongoose.model("utilizadors", schema);
    return utilizadors;
};
    