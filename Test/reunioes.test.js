const reuniaoController = require('../controllers/reunioes.controller');

test("FindAll Test", async () => {
  const req = {
    query: {
      title: "example",
    },
  };

  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  const data = [
    { title: "Reuniao 1", datainicio: "2023-06-08", datafim: "2023-06-09", grausessao: 1, tiposessao: "Ordinary", descricao: "Description 1" },
    { title: "Reuniao 2", datainicio: "2023-06-10", datafim: "2023-06-11", grausessao: 2, tiposessao: "Extraordinary", descricao: "Description 2" },
  ];

  jest.spyOn(reuniaoController, "findAll").mockImplementation(async () => {
    return res.status(200).json({ success: true, reunioes: data });
  });

  // Perform the findAll request
  await reuniaoController.findAll(req, res);

  // Check the response
  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.json).toHaveBeenCalledWith({ success: true, reunioes: data });
});

test("Create Test", async () => {
  const req = {
    body: {
      title: "New Reuniao",
      datainicio: "2023-06-12",
      datafim: "2023-06-13",
      grausessao: 1,
      tiposessao: "Ordinary",
      descricao: "Description",
    },
  };

  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  jest.spyOn(reuniaoController, "create").mockImplementation(async () => {
    return res.status(201).json({ success: true, msg: "New reuniao created.", URL: "/reunioes/exampleID" });
  });

  // Perform the create request
  await reuniaoController.create(req, res);

  // Check the response
  expect(res.status).toHaveBeenCalledWith(201);
  expect(res.json).toHaveBeenCalledWith({ success: true, msg: "New reuniao created.", URL: "/reunioes/exampleID" });
});

test("FindOne Test", async () => {
  const req = {
    params: {
      reuniaoID: "exampleID",
    },
  };

  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  const reuniao = {
    title: "Reuniao 1",
    datainicio: "2023-06-08",
    datafim: "2023-06-09",
    grausessao: 1,
    tiposessao: "Ordinary",
    descricao: "Description 1",
  };

  jest.spyOn(reuniaoController, "findOne").mockImplementation(async () => {
    return res.status(200).json({ success: true, reuniao: reuniao });
  });

  // Perform the findOne request
  await reuniaoController.findOne(req, res);

  // Check the response
  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.json).toHaveBeenCalledWith({ success: true, reuniao: reuniao });
});
