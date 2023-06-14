const db = require("../models");
const Utilizador = db.utilizadors;

const jwt = require("jsonwebtoken"); //JWT tokens creation (sign())
const bcrypt = require("bcryptjs"); //password encryption
const config = require("../config/db.config.js");
const { ValidationError } = require("mongoose");


exports.findAll = async (req, res) => {
  const nome = req.query.nome;

  let condition = nome ? { nome: new RegExp(nome, "i") } : {};

  try {
    let data = await Utilizador.find(condition)
      .select(
        "nome apelido username email contacto password localizacao pontos tarefas cargo"
      )
      .exec();
    return res.status(200).json({ success: true, Utilizador: data });
  } catch (err) {
    return res.status(500).json({ success: false, msg: err.message });
  }
};

exports.findOne = async (req, res) => {
  try {
    const utilizador = await Utilizador.findById(req.params.utilizadorID);
    if (utilizador === null) {
      return res.status(400).json({
        success: false,
        msg: "Cannot find utilizador",
      });
    }
    return res.json({ success: true, utilizador: utilizador });
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(400).json({ success: false, msgs: "ID is not valid" });
    }
    res.status(500).json({
      success: false,
      msg: err.message || "Some error occurred while fetching the utilizador.",
    });
  }
};

exports.update = async (req, res) => {
  if (
    !req.body ||
    !req.body.nome ||
    !req.body.apelido ||
    !req.body.email ||
    !req.body.contacto ||
    !req.body.password ||
    !req.body.localizacao ||
    !req.body.cargo
  ) {
    return res
      .status(400)
      .json({ success: false, msg: "Information cannot be empty" });
  }

  try {
    const utilizador = await Utilizador.findByIdAndUpdate(
      req.params.utilizadorID,
      req.body,
      { runValidators: true }
    ).exec();

    if (!utilizador) {
      return res
        .status(404)
        .json({ success: false, msg: "Cannot update utilizador information" });
    }

    return res.status(200).json({ success: true, msg: "Update successful" });
  } catch (err) {
    if (err.name === "ValidationError") {
      let errors = [];
      Object.keys(err.errors).forEach((key) => {
        errors.push(err.errors[key].message);
      });
      return res.status(400).json({ success: false, msgs: errors });
    }

    res.status(500).json({
      success: false,
      msg:
        err.message || "Some error occurred while updating the utilizador.",
    });
  }
};

exports.create = async (req, res) => {
  try {
    const { nome, apelido, username, email, contacto, password, localizacao, cargo } = req.body;

    // Check if any required field is missing
    if (!nome || !apelido || !username || !email || !contacto || !password || !localizacao || !cargo) {
      return res.status(400).json({ success: false, msg: 'Please provide all the required data.' });
    }

    // Check if the username already exists
    const existingUser = await Utilizador.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ success: false, msg: 'Username already exists.' });
    }

    // Hash the password before saving it
    const hashedPassword = bcrypt.hashSync(password,10);

    const utilizador = new Utilizador({
      nome: req.body.nome,
      apelido: req.body.apelido,
      username: req.body.username,
      email: req.body.email,
      contacto: req.body.contacto,
      password: hashedPassword,
      localizacao: req.body.localizacao,
      cargo: req.body.cargo,
      pontos: 0,
      tarefas:0,
    });

    await utilizador.save();
    res.status(201).json({
      success: true,
      msg: `New utilizador registered! Welcome, ${nome}!`,
    });
  } catch (err) {
    console.log(err); // Add this line to log the error object
    if (err.name === "ValidationError") {
      let errorMsgs = [];
      if (err.errors && Array.isArray(err.errors)) {
        errorMsgs = err.errors.map(e => e.message);
      } else {
        errorMsgs.push(err.message);
      }
      res.status(400).json({ success: false, msg: errorMsgs });
    } else {
      res.status(500).json({ success: false, msg: err.message || "Some error occurred while signing up." });
    }
  }
};
exports.login = async (req, res) => {
  try {
    if (!req.body || !req.body.username || !req.body.password) {
      return res.status(400).json({
        success: false,
        message: "Tens de fornecer o nome e a password",
      });
    }

    let user = await Utilizador.findOne({ username: req.body.username }).exec();
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Utilizador não encontrado",
      });
    }

    const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid) {
      return res.status(401).json({
        success: false,
        accessToken: null,
        message: "Password inválida",
      });
    }

    let token = null;
    if (user.cargo === "Admin" || user.cargo === "admin") {
      token = jwt.sign(
        {
          id: user._id,
          cargo: user.cargo,
        },
        config.SECRET,
        {
          expiresIn: "24h",
        }
      );
    }

    return res.status(200).json({
      success: true,
      accessToken: token,
      message: "Login efetuado com sucesso",
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      let errors = {};
      Object.keys(err.errors).forEach((key) => {
        errors[key] = err.errors[key].message;
      });
      res.status(400).json({
        success: false,
        message: errors,
      });
    } else {
      res.status(500).json({
        success: false,
        message: err.message || "Algo correu mal, tente novamente mais tarde.",
      });
    }
  }
};