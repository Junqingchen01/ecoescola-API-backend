const db = require("../models");
const Relatorio = db.Relatorio;


exports.findAll = async (req, res) => {
    const title = req.query.title;

    let condition = title ? {title: new RegExp(title, 'i')} : {};

    try{
        let data = await Relatorio
            .find(condition)
            .select('resumo processo conclucao')
            .exec();
        return res.status(200).json({ success:true ,relatorio: data});

    }
    catch(err){
        return res.status(500).json({ success:false, msg: err.message})
    }
};




exports.update = async (req, res) => {
    if (!req.body || !req.body.resumo || !req.body.processo || !req.body.conclucao) {
      return res.status(400).json({ sucesso: false, msg: "Fields cannot be empty." });
    }
  
    try {
      const relatorio = await Relatorio.findByIdAndUpdate(
        req.params.relatorioID,
        req.body,
        {
          runValidators: true,
          new: true, // To return the updated relatorio
        }
      ).exec();
  
      if (!relatorio) {
        return res.status(404).json({ sucesso: false, msg: "Relatorio not found." });
      }
  
      return res.status(200).json({ sucesso: true, msg: "Relatorio updated successfully.", relatorio });
    } catch (err) {
      // Capture mongoose validation errors
      if (err.name === "ValidationError") {
        let errors = [];
        Object.keys(err.errors).forEach((key) => {
          errors.push(err.errors[key].message);
        });
        return res.status(400).json({ success: false, msgs: errors });
      }
  
      res.status(500).json({ success: false, msg: err.message || "Some error occurred while updating the relatorio." });
    }
  };
  