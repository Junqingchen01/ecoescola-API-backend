module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      title: String,
      datainicio: String,
      datafim: String,
      grausessao: String,
      tiposessao: String,
      descricao: String,
      atas: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Ata' }
      ]
    },
    {
      timestamps: false,
      strictPopulate: false
    }
  );
  const Reunioes = mongoose.model("Reuniao", schema);
  return Reunioes;
};