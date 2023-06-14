const db = require("../models");
const Atividade = db.atividades;
   
exports.create = async (req, res) => {
  try {
    const { title, descricao, diagnostico, objetivo, meta, status } = req.body;

    // Check if any required field is missing
    if (!title || !descricao || !diagnostico || !objetivo || !meta || !status) {
      return res.status(400).json({ success: false, msg: 'Please provide all the required data.' });
    }

    // Check if an activity with the same title already exists
    const existingActivity = await Atividade.findOne({ title });
    if (existingActivity) {
      return res.status(400).json({ success: false, msg: 'Activity already exists with the same title.' });
    }

    const atividade = new Atividade({
      title,
      descricao,
      diagnostico,
      objetivo,
      meta,
      status,
    });

    await atividade.save();
    res.status(201).json({
      success: true,
      msg: 'New activity created.',
      URL: `/atividade/${atividade._id}`,
    });

  } catch (err) {
    // Capture mongoose validation errors
    if (err.name === 'ValidationError') {
      let errors = [];
      Object.keys(err.errors).forEach((key) => {
        errors.push(err.errors[key].message);
      });
      return res.status(400).json({ success: false, msgs: errors });
    }
    res.status(500).json({
      success: false,
      msg: err.message || 'Some error occurred while creating the activity.',
    });
  }
};


exports.findAll = async (req, res) => {
    const title = req.query.title;

    let condition = title ? {title: new RegExp(title, 'i')} : {};

    try{
        let data = await Atividade
            .find(condition)
            .select('title descricao diagnostico objetivo meta status')
            .exec();
        return res.status(200).json({ success:true ,atividades: data});

    }
    catch(err){
        return res.status(500).json({ success:true, msg: err.message})
    }
};


exports.findOne = async (req, res) => {
    try {
        const atividade = await Atividade.findById(req.params.atividadeID)
        if(atividade === null)
            return res.status(400).json({
                success:false ,msg:"cannot find"
            });
            return res.json({ success:true, atividade:atividade})
    }
    catch (err) {
        // capture mongoose validation errors
        if (err.name === "CastError") {
        return res.status(400).json({ success: false, msgs: "ID ins not a valid" });
        }
        res.status(500).json({ success: false,
            msg: err.message || "Some error occurred while creating the tutorial. " });
    }
};

exports.update = async (req, res) => {
    if(!req.body || !req.body.status)
        return res.status(400).json({ sucesso:false, msg:"status can not be empty"})
    try{
        const atividade = await Atividade.findByIdAndUpdate(
            req.params.atividadeID,
            req.body,
            {
                runValidators: true
                
            }
        ).exec();
        if(!atividade)
            return res.status(404).json({ sucesso:false ,msg:'cant update atividade'});
        return res.status(200).json({sucesso:true, msg:'sucessfully'})    
    }
    catch(err){
                // capture mongoose validation errors
                if (err.name === "ValidationError") {
                    let errors = [];
                    Object.keys(err.errors).forEach((key) => {
                        errors.push(err.errors[key].message);
                });
                return res.status(400).json({ success: false, msgs: errors });
                }
                res.status(500).json({ success: false,
                    msg: err.message || "Some error occurred while creating the tutorial. " });
    }    
};


