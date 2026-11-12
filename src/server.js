
import express from "express";
import bruxos from "./data/bruxos.js";

const app = express();

app.use(express.json());

// Rota principal
app.get("/", (req, res) => {
    res.json({
        mensagem: "API dos Bruxos funcionando!"
    });
});


app.get("/bruxos", (req, res) => {

    const { casa, nome, idade } = req.query;

    let resultado = bruxos;

    // Filtrar por casa
    if (casa) {
        resultado = resultado.filter(
            b => b.casa.toLowerCase() === casa.toLowerCase()
        );
    }

    // Filtrar por nome
    if (nome) {
        resultado = resultado.filter(
            b => b.nome.toLowerCase().includes(nome.toLowerCase())
        );
    }

    // Filtrar por idade
    if (idade) {
        resultado = resultado.filter(
            b => b.idade === Number(idade)
        );
    }

    res.json({
        total: resultado.length,
        data: resultado
    });

});


// Buscar bruxo por ID
app.get("/bruxos/:id", (req, res) => {
    const id = Number(req.params.id);

    const bruxo = bruxos.find(b => b.id === id);

    if (!bruxo) {
        return res.status(404).json({
            mensagem: "Bruxo não encontrado"
        });
    }

    res.json(bruxo);
});

// Cadastrar novo bruxo
app.post("/bruxos", (req, res) => {
    const novoBruxo = {
        id: bruxos.length > 0
            ? Math.max(...bruxos.map(b => b.id)) + 1
            : 1,
        nome: req.body.nome,
        casa: req.body.casa,
        idade: req.body.idade
    };

    bruxos.push(novoBruxo);

    res.status(201).json(novoBruxo);
});

// Atualizar bruxo
app.put("/bruxos/:id", (req, res) => {
    const id = Number(req.params.id);

    const indice = bruxos.findIndex(b => b.id === id);

    if (indice === -1) {
        return res.status(404).json({
            mensagem: "Bruxo não encontrado"
        });
    }

    bruxos[indice] = {
        id,
        nome: req.body.nome,
        casa: req.body.casa,
        idade: req.body.idade
    };

    res.json(bruxos[indice]);
});

// Excluir bruxo
app.delete("/bruxos/:id", (req, res) => {
    const id = Number(req.params.id);

    const indice = bruxos.findIndex(b => b.id === id);

    if (indice === -1) {
        return res.status(404).json({
            mensagem: "Bruxo não encontrado"
        });
    }

    bruxos.splice(indice, 1);

    res.json({
        mensagem: "Bruxo excluído com sucesso!"
    });
});


// Iniciar servidor
app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});
