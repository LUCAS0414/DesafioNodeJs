const db = require("../database/init");

// Listar despesas
exports.listarDespesas = (req, res) => {
  const query = `
        SELECT d.id, d.valor, d.data_compra, d.descricao, tp.tipo AS tipo_pagamento, c.nome AS categoria
        FROM despesas d
        JOIN tipos_pagamentos tp ON d.tipo_pagamento_id = tp.id
        JOIN categorias c ON d.categoria_id = c.id
        WHERE strftime('%m-%Y', d.data_compra) = strftime('%m-%Y', 'now')
    `;

  db.all(query, [], (err, rows) => {
    if (err) {
      console.error("Erro ao executar query:", err);
      return res.status(500).json({ data: null, success: false });
    }

    res.json({ data: rows, success: true });
  });
};

// Cadastrar despesa
exports.cadastrarDespesa = (req, res) => {
  const { valor, data_compra, descricao, tipo_pagamento_id, categoria_id } =
    req.body;

  if (
    !valor ||
    !data_compra ||
    !descricao ||
    !tipo_pagamento_id ||
    !categoria_id
  ) {
    return res.status(400).json({ data: null, success: false });
  }

  const query = `
        INSERT INTO despesas (valor, data_compra, descricao, tipo_pagamento_id, categoria_id)
        VALUES (?, ?, ?, ?, ?)
    `;

  db.run(
    query,
    [valor, data_compra, descricao, tipo_pagamento_id, categoria_id],
    function (err) {
      if (err) {
        return res.status(500).json({ data: null, success: false });
      }
      res.json({ data: { id: this.lastID }, success: true });
    }
  );
};
