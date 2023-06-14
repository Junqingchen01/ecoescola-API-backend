const relatoriosController = require('../controllers/relatorios.controller');

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
    { resumo: "Resumo 1", processo: "Processo 1", conclucao: "Conclusão 1" },
    { resumo: "Resumo 2", processo: "Processo 2", conclucao: "Conclusão 2" },
  ];

  jest.spyOn(relatoriosController, "findAll").mockImplementation(async () => {
    return res.status(200).json({ success: true, relatorio: data });
  });

  await relatoriosController.findAll(req, res);

  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.json).toHaveBeenCalledWith({ success: true, relatorio: data });
});

test("Update Test", async () => {
  const req = {
    params: {
      relatorioID: "exampleID",
    },
    body: {
      resumo: "Updated Resumo",
      processo: "Updated Processo",
      conclucao: "Updated Conclusão",
    },
  };

  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  const updatedRelatorio = {
    _id: "exampleID",
    resumo: "Updated Resumo",
    processo: "Updated Processo",
    conclucao: "Updated Conclusão",
  };

  jest.spyOn(relatoriosController, "update").mockImplementation(async () => {
    return res.status(200).json({
      sucesso: true,
      msg: "Relatorio updated successfully.",
      relatorio: updatedRelatorio,
    });
  });

  await relatoriosController.update(req, res);

  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.json).toHaveBeenCalledWith({
    sucesso: true,
    msg: "Relatorio updated successfully.",
    relatorio: updatedRelatorio,
  });
});
