const utilizadorController = require('../controllers/utilizadors.controller');

test("FindAll Test", async () => {
  const req = {
    query: {
      nome: "example",
    },
  };

  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  const data = [
    { nome: "test1", apelido: "test1", username: "test1", email: "test1@example.com" },
    { nome: "test2", apelido: "test2", username: "test2", email: "test2@example.com" },
  ];

  jest.spyOn(utilizadorController, "findAll").mockImplementation(async () => {
    return res.status(200).json({ success: true, Utilizador: data });
  });

  await utilizadorController.findAll(req, res);

  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.json).toHaveBeenCalledWith({ success: true, Utilizador: data });
});

test("Update Test", async () => {
  const req = {
    params: {
      utilizadorID: "test1",
    },
    body: {
      nome: "test1",
      apelido: "test1",
      username: "test1",
      email: "test1@example.com",
      contacto: "123456789",
      password: "test1",
      localizacao: "test1",
      cargo: "test1",
    },
  };

  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  jest.spyOn(utilizadorController, "update").mockImplementation(async () => {
    return res.status(200).json({ success: true, msg: "Update successful" });
  });

  await utilizadorController.update(req, res);


  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.json).toHaveBeenCalledWith({ success: true, msg: "Update successful" });
});

test("Create Test", async () => {
  const req = {
    body: {
      nome: "test3",
      apelido: "test3",
      username: "test3",
      email: "test1@example.com",
      contacto: "123456789",
      password: "test3",
      localizacao: "test3",
      cargo: "test3",
    },
  };

  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  jest.spyOn(utilizadorController, "create").mockImplementation(async () => {
    return res.status(201).json({ success: true, msg: "New utilizador registered! Welcome, John!" });
  });

  await utilizadorController.create(req, res);

  expect(res.status).toHaveBeenCalledWith(201);
  expect(res.json).toHaveBeenCalledWith({ success: true, msg: "New utilizador registered! Welcome, John!" });
});

test("Login Test", async () => {
  const req = {
    body: {
      username: "test1",
      password: "test1",
    },
  };

  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  jest.spyOn(utilizadorController, "login").mockImplementation(async () => {
    return res.status(200).json({ success: true, accessToken: "token", message: "Login efetuado com sucesso" });
  });

  await utilizadorController.login(req, res);

  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.json).toHaveBeenCalledWith({ success: true, accessToken: "token", message: "Login efetuado com sucesso" });
});
