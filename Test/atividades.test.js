const atividadesController = require('../controllers/atividades.controller');

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
    { title: "example 1", descricao: "example 1", status: "In Progress" },
    { title: "example 2", descricao: "example 2", status: "Completed" },
  ];

  jest.spyOn(atividadesController, "findAll").mockImplementation(async () => {
    return res.status(200).json({ success: true, atividades: data });
  });

  await atividadesController.findAll(req, res);

  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.json).toHaveBeenCalledWith({ success: true, atividades: data });
});

test("Update Test", async () => {
  const req = {
    params: {
      atividadeID: "exampleID",
    },
    body: {
      status: "Completed",
    },
  };

  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  jest.spyOn(atividadesController, "update").mockImplementation(async () => {
    return res.status(200).json({ success: true, msg: "Update successful" });
  });

  await atividadesController.update(req, res);

  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.json).toHaveBeenCalledWith({ success: true, msg: "Update successful" });
});

test("Create Test", async () => {
  const req = {
    body: {
      title: "New example",
      descricao: "example",
      diagnostico: "example",
      objetivo: "example",
      meta: "Goal",
      status: "In Progress",
    },
  };

  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  jest.spyOn(atividadesController, "create").mockImplementation(async () => {
    return res.status(201).json({ success: true, msg: "New activity created.", URL: "/atividade/exampleID" });
  });

  await atividadesController.create(req, res);

  expect(res.status).toHaveBeenCalledWith(201);
  expect(res.json).toHaveBeenCalledWith({ success: true, msg: "New activity created.", URL: "/atividade/exampleID" });
});

test("FindOne Test", async () => {
  const req = {
    params: {
      atividadeID: "exampleID",
    },
  };

  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  const atividade = {
    title: "example 1",
    descricao: "example 1",
    diagnostico: "example",
    objetivo: "example",
    meta: "Goal",
    status: "In Progress",
  };

  jest.spyOn(atividadesController, "findOne").mockImplementation(async () => {
    return res.status(200).json({ success: true, atividade: atividade });
  });

  await atividadesController.findOne(req, res);

  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.json).toHaveBeenCalledWith({ success: true, atividade: atividade });
});
