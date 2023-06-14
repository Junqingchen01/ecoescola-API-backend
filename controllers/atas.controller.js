const db = require("../models");
const Reuniao = db.Reunioes;
const Ata = db.Ata;

exports.create = async (req, res) => {

  const reuniaoID = req.params.reuniaoID;
  const descricao = req.body.descricao;


  try {
    // Check if reuniao exists
    const reuniao = await Reuniao.findById(reuniaoID);


    if (!reuniao) {
      return res.status(404).json({ success: false, msg: "Cannot find reuniao." });
    }

    const ata = new Ata({ descricao });

    let data = await ata.save();

    reuniao.atas.push(data._id);
    await reuniao.save();

    res.status(201).json({ success: true, msg: "New ata created.", reuniao });
  } catch (err) {
    // Capture mongoose validation errors
    if (err.name === "ValidationError") {
      let errors = [];
      Object.keys(err.errors).forEach((key) => {
        errors.push(err.errors[key].message);
      });
      return res.status(400).json({ success: false, msgs: errors });
    }

    res.status(500).json({
      success: false,
      msg: err.message || "Some error occurred while creating the ata.",
    });
  }
};
