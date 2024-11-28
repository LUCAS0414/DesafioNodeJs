const express = require("express");
const router = express.Router();
const db = require("../database/init");

// Rota da API: Listar despesas
router.get("/api/despesas", (req, res) => {
  const query = `
        SELECT d.id, d.valor, d.data_compra, d.descricao, tp.tipo AS tipo_pagamento, c.nome AS categoria
        FROM despesas d
        JOIN tipos_pagamentos tp ON d.tipo_pagamento_id = tp.id
        JOIN categorias c ON d.categoria_id = c.id
        WHERE strftime('%m-%Y', d.data_compra) = strftime('%m-%Y', 'now')
    `;

  db.all(query, [], (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ data: null, success: false });
    }

    res.json({ data: rows, success: true });
  });
});

// Rota da API: Cadastrar despesa
router.post("/api/despesas", (req, res) => {
  const { valor, data_compra, descricao, tipo_pagamento_id, categoria_id } =
    req.body;

  const query = `
        INSERT INTO despesas (valor, data_compra, descricao, tipo_pagamento_id, categoria_id)
        VALUES (?, ?, ?, ?, ?)
    `;

  db.run(
    query,
    [valor, data_compra, descricao, tipo_pagamento_id, categoria_id],
    function (err) {
      if (err) {
        console.error(err);
        return res.status(500).json({ data: null, success: false });
      }

      res.status(201).json({
        data: { id: this.lastID },
        success: true,
      });
    }
  );
});

// Rota Handlebars: Exibir formulário de cadastro
router.get("/cadastro", (req, res) => {
  res.render("cadastro");
});

// Rota Handlebars: Processar o cadastro
router.post("/cadastrar", (req, res) => {
  const { valor, data_compra, descricao, tipo_pagamento_id, categoria_id } =
    req.body;

  const query = `
        INSERT INTO despesas (valor, data_compra, descricao, tipo_pagamento_id, categoria_id)
        VALUES (?, ?, ?, ?, ?)
    `;

  db.run(
    query,
    [valor, data_compra, descricao, tipo_pagamento_id, categoria_id],
    function (err) {
      if (err) {
        console.error(err);
        return res.send("Erro ao cadastrar despesa.");
      }

      res.redirect("/listar");
    }
  );
});

// Rota Handlebars: Listar despesas
router.get("/listar", (req, res) => {
  const query = `
    SELECT d.id, d.valor, d.data_compra, d.descricao, tp.tipo AS tipo_pagamento, c.nome AS categoria
    FROM despesas d
    JOIN tipos_pagamentos tp ON d.tipo_pagamento_id = tp.id
    JOIN categorias c ON d.categoria_id = c.id
    WHERE date(d.data_compra) BETWEEN date('now', 'start of month') AND date('now', 'start of month', '+1 month', '-1 day')
`;

  db.all(query, [], (err, rows) => {
    if (err) {
      console.error(err);
      return res.send("Erro ao listar despesas.");
    }

    res.render("listar", { despesas: rows });
  });
});

module.exports = router;
