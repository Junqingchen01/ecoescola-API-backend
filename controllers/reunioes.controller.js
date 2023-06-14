const db = require("../models");
const Reuniao = db.Reunioes;
const Ata = db.Ata;

exports.create = async (req, res) => {
  const { title } = req.body;

  try {
    // Check if reuniao with the same title already exists
    const existingReuniao = await Reuniao.findOne({ title });
    if (existingReuniao) {
      return res.status(400).json({ success: false, msg: "A reuniao with the same title already exists." });
    }

    const reuniao = new Reuniao({ 
      title: req.body.title,
      datainicio: req.body.datainicio,
      datafim: req.body.datafim,
      grausessao: req.body.grausessao,
      tiposessao: req.body.tiposessao,
      descricao: req.body.descricao
    });

    await reuniao.save(); 
    res.status(201).json({ 
      success: true, msg: "New reuniao created.", URL: `/reunioes/${reuniao._id}` 
    });
  } catch (err) {
    // Capture mongoose validation errors
    if (err.name === "ValidationError") {
      let errors = [];
      Object.keys(err.errors).forEach((key) => {
        errors.push(err.errors[key].message);
      });
      return res.status(400).json({ success: false, msgs: errors });
    }
    res.status(500).json({ success: false, msg: err.message || "Some error occurred while creating the reuniao." });
  }
};

exports.findAll = async (req, res) => {
  const title = req.query.title;

  let condition = title ? { title: new RegExp(title, 'i') } : {};

  try {
    let data = await Reuniao
      .find(condition)
      .select('title datainicio datafim grausessao tiposessao descricao')
      .exec();
    return res.status(200).json({ success: true, reunioes: data });
  } catch (err) {
    return res.status(500).json({ success: false, msg: err.message });
  }
};

exports.findOne = async (req, res) => {
  try {
    const reuniao = await Reuniao.findById(req.params.reuniaoID).populate("atas");

    if (!reuniao) {
      return res.status(400).json({ success: false, msg: "Cannot find reuniao." });
    }else{
      const reuniaoID = req.params.reuniaoID
      console.log(reuniaoID)
      return res.json({ success: true, reuniao });
    }

    
    
  } catch (err) {
    // Capture mongoose validation errors
    if (err.name === "CastError") {
      return res.status(400).json({ success: false, msg: "ID is not valid." });
    }

    res.status(500).json({ success: false, msg: err.message || "Some error occurred while finding reuniao." });
  }
};
