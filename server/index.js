const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");

//conectando banco
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "artefatobandejao",
});

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello world");
});

// criando instancias no banco
app.post("/register", (req, res) => {
  //recebe as infos
  const { email, name } = req.body;
  let insert = "INSERT INTO aluno (email, nome) VALUES (?, ?)"; //string insert

  //VERIFICA SE ALUNO JA ESTA CADASTRADO
  db.query("SELECT * from aluno WHERE email = ?", [email], (err, result) =>{
    if(err){ //se der erro
      console.error(err);
      return console.log("Deu ruim rapaziada kkk");
    }
    if(result.length > 0){  //se o resultado for > 0 significa q ja tem um email cadastrado, logo:
      return console.log("o aluno %s já esta cadastrado", name);
    }
    // Se os resultados anteriores forem falso, ent o email não existe, inseir os dados no banco:
    db.query(insert, [email, name], (err, result) =>{
      if (err) {
        console.error(err);
        return console.log("deu ruim dnv manerr ksksksk");
      }

      // Retorna uma resposta de sucesso
      return console.log("Aluno cadastrado com sucesso");
    })
  })
});

app.listen(3001, () => {
  console.log("Rodando servidor");
});
