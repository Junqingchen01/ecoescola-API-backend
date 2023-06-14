const ataController = require('../controllers/atas.controller');
const db = require("../models");
const Reuniao = db.Reunioes;
const Ata = db.Ata;

test("Create Test", async () => {
  const req = {
    params: {
      reuniaoID: "exampleReuniaoID",
    },
    body: {
      descricao: "New Ata",
    },
  };

  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  const reuniao = {
    _id: "exampleReuniaoID",
    title: "Reuniao 1",
    datainicio: "2023-06-08",
    datafim: "2023-06-09",
    grausessao: 1,
    tiposessao: "Ordinary",
    descricao: "Description 1",
    atas: [],
  };

  const ata = {
    _id: "exampleAtaID",
    descricao: "New Ata",
  };

  jest.spyOn(ataController, "create").mockImplementation(async () => {
    reuniao.atas.push(ata._id);
    return res.status(201).json({ success: true, msg: "New ata created.", reuniao });
  });

  jest.spyOn(Reuniao, "findById").mockImplementation(async () => {
    return reuniao;
  });

  jest.spyOn(Ata.prototype, "save").mockImplementation(async () => {
    return ata;
  });

  // Perform the create request
  await ataController.create(req, res);

  // Check the response
  expect(res.status).toHaveBeenCalledWith(201);
  expect(res.json).toHaveBeenCalledWith({ success: true, msg: "New ata created.", reuniao });
});
