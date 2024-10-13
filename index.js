const express = require("express")
const cors = require("cors")
const app = express()
const conn = require("./db/conn")
const Aluno = require("./models/Aluno")
const mysql = require("mysql2")

app.use(cors())
app.use(express.json())

app.get('/alunos', async (request, response) => {
    const { turma } = request.query

    try {
      const alunos = await Aluno.findAll({ where: { turma } });
      response.json(alunos);
    } catch (err) {
      console.error('Erro ao buscar alunos:', err);
      response.status(500).send({ error: 'Erro ao buscar alunos' });
    }
});

app.post("/alunos/disponibilidade", async (request, response) => {
    const { id, disponibilidade } = request.body

    try {
        await Aluno.update(
            { disponibilidade: disponibilidade ? false : true },
            { where: { id } }
        )
    } catch(err) {
        console.log(err)
    }

    response.status(200).send()
})

app.get("/alunos/bloqueados", async (request, response) => {
    let hash = {}
    const turmas = []

    try {
        const alunos = await Aluno.findAll({where: { disponibilidade: false }})
        alunos.map(aluno => {
            if(hash[aluno.turma]) {
                return
            }

            turmas.push(aluno.turma)
            hash[aluno.turma] = 1
        })


        response.json({ alunos, turmas })
    } catch(err) {
        console.error('Erro ao buscar alunos:', err);
        response.status(500).send({ error: 'Erro ao buscar alunos' });
    }
})
  
conn
  .sync({ alter: true })
  .then(() => {
    app.listen(3000, () => {
        console.log("Servidor rodando na porta 3000!");
    });
  })
  .catch((err) => console.log(err));


// app.get('/', async (request, response) => {
//     const query = `SELECT * FROM Alunos`

//     conn.query(query, (err, data) => {
//         if (err) {
//             return console.log(err)
//         }

//         response.json(data)
//     })
// })

// const conn = mysql.createConnection({
//     host: 'sql10.freesqldatabase.com',
//     user: 'sql10737210',
//     password: 'Ehbz4EHUt9',
//     database: 'sql10737210',
//   })
  
//   conn.connect(function (err) {
//     if (err) {
//       console.log(err)
//     }
  
//     console.log('Conectado ao MySQL!')
  
//     app.listen(3000, () => {
//         console.log("Servidor rodando na porta 3000!")
//     })
//   })