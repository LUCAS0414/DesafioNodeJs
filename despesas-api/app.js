const express = require("express");
const { engine } = require("express-handlebars");
const path = require("path");
const despesasRoutes = require("./routes/despesasRoutes");

const app = express();

// Configurar o Handlebars como engine de templates
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views")); // Pasta onde estarão os templates

// Middleware para processar dados enviados pelo formulário
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Rotas
app.use("/", despesasRoutes);

// Iniciar o servidor
const PORT = 3000;
app.listen(PORT, () =>
  console.log(`Servidor rodando em http://localhost:${PORT}`)
);
