const sqlite3 = require("sqlite3").verbose();

// Criar e configurar o banco de dados
const db = new sqlite3.Database("database/despesas.db");

// Criação das tabelas
db.serialize(() => {
  //tabela do tipo de pagamentos
  db.run(`
        CREATE TABLE IF NOT EXISTS tipos_pagamentos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            tipo TEXT NOT NULL
        )
    `);

  //tabela das categorias
  db.run(`
        CREATE TABLE IF NOT EXISTS categorias (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            descricao TEXT
        )
    `);

  //tabela das despesas
  db.run(`
        CREATE TABLE IF NOT EXISTS despesas (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            valor REAL NOT NULL,
            data_compra DATETIME NOT NULL,
            descricao TEXT NOT NULL,
            tipo_pagamento_id INTEGER NOT NULL,
            categoria_id INTEGER NOT NULL,
            FOREIGN KEY(tipo_pagamento_id) REFERENCES tipos_pagamentos(id),
            FOREIGN KEY(categoria_id) REFERENCES categorias(id)
          )
    `);

  // Inserção de dados iniciais com "OR IGNORE"
  db.run(`
    INSERT OR IGNORE INTO tipos_pagamentos (id, tipo) 
    VALUES 
      (1,'Dinheiro'), 
      (2,'Débito'), 
      (3,'Crédito'), 
      (4,'PIX')
  `);

  db.run(`
    INSERT OR IGNORE INTO categorias (id, nome, descricao) 
    VALUES 
      (1, 'Alimentação', 'Despesas com alimentos'), 
      (2, 'Saúde', 'Despesas com Saúde'), 
      (3, 'Transporte', 'Despesas com transporte'),
      (4, 'Outros', 'Despesas diversas')
  `);
});

module.exports = db;
