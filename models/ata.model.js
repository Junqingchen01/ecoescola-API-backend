module.exports = (mongoose) => {
    const schema = mongoose.Schema(
      {
        descricao: String
      },
      {
        timestamps: true
      }
    );
    const Ata = mongoose.model("Ata", schema);
    return Ata;
  };