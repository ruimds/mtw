const Express = require("express");
const BodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
//?Connection String para a base de dados MongoDB em cloud através do ATLAS
const url =
  "mongodb+srv://brunosilva:Bruno-1998@cluster0-mubfv.mongodb.net/test?authSource=admin&replicaSet=Cluster0-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass%20Community&retryWrites=true&ssl=true";

var app = Express();
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
var database, collection;

app.listen(8080, () => {
  MongoClient.connect(url, { useNewUrlParser: true }, (error, client) => {
    if (error) {
      throw error;
    }
    //?Base de dados MTW no mongoDBs
    database = client.db("MTW");

    //?Endpoints relacionados com as collections Paciente e Psicólogo
    //?EndPoint que recebe:  todos os pacientes ou psicologos // filtrados por email, id, nome, password
    app.get("/api/:collection", async function (req, res) {
      collection = database.collection(req.params.collection);

      let options = parseHeaderOptions(req);

      if (isEmpty(options) === false) {
        await collection.findOne(options, (error, result) => {
          if (error) {
            return res.status(500).send(error);
          } else if (result == null) {
            return res.status(404).send("Não encontrado!");
          }
          res.send(result);
        });
      } else {
        await collection.find({}).toArray((error, result) => {
          if (error) {
            return res.status(500).send(error);
          } else if (result == null) {
            return res.status(404).send("Não encontrado!");
          }
          res.send(result);
        });
      }
    });
    //?EndPoint que permite inserir um paciente ou um psicólogo
    app.post("/api/:collection", async function (req, res) {
      collection = database.collection(req.params.collection);

      let options = parseHeaderOptionsInsert(req);

      if (options == "Bad Body!") {
        return res.status(400).send("Bad Body!");
      } else {
        let exists = await collection.findOne({ email: options.email });

        if (exists == null) {
          await collection.insertOne(options, (error, result) => {
            if (error) {
              return res.status(500).send(error);
            }
            res.send("Pessoa inserida na base de dados");
          });
        } else {
          return res.send("Pessoa já existe");
        }
      }
    });
    //?EndPoint que permite apagar um paciente ou um psicólogo
    app.delete("/api/:collection", async function (req, res) {
      collection = database.collection(req.params.collection);

      let options = parseHeaderOptionsDelete(req);

      if (isEmpty(options) === false) {
        let exists = await collection.findOne(options);

        if (exists !== null) {
          await collection.deleteOne(options, (error, result) => {
            if (error) {
              return res.status(500).send(error);
            }
            res.status(202).send("Eliminado com sucesso!");
          });
        } else {
          return res.status(404).send("Não Encontrado");
        }
      }
    });
  });
});

//*GET/POST/DELETE http://127.0.0.1:8080/api/pacientes
//*GET/POST/DELETE http://127.0.0.1:8080/api/psicologos

//?Função que permite dar parse dos headers utilizados no endpoint GET
function parseHeaderOptions(req) {
  let options = {};

  if (req.headers.email !== undefined) {
    options.email = req.headers.email;
  }

  if (req.headers.nome !== undefined) {
    options.nome = req.headers.nome;
  }

  if (req.headers.password !== undefined) {
    options.password = req.headers.password;
  }

  if (req.headers._id !== undefined) {
    options._id = new ObjectId(req.headers._id);
  }

  return options;
}
//?Função que permite dar parse dos headers utilizados no endpoint DELETE
function parseHeaderOptionsDelete(req) {
  let options = {};

  if (req.headers.email !== undefined) {
    options.email = req.headers.email;
  }

  if (req.headers._id !== undefined) {
    options._id = new ObjectId(req.headers._id);
  }

  return options;
}
//?Função que permite dar parse dos headers utilizados no endpoint POST
function parseHeaderOptionsInsert(req) {
  let options = {};

  if (req.params.collection == "psicologos") {
    if (req.body.servico !== undefined && typeof req.body.servico == "string") {
      options.servico = req.body.servico;
    } else {
      return "Bad Body!";
    }

    if (
      req.body.password !== undefined &&
      typeof req.body.password == "string"
    ) {
      options.password = req.body.password;
    } else {
      return "Bad Body!";
    }
  } else if (req.params.collection == "pacientes") {
    if (req.body.genero !== undefined && typeof req.body.genero == "string") {
      options.genero = req.body.genero;
    } else {
      return "Bad Body!";
    }

    if (
      req.body.emailpsicologo !== undefined &&
      typeof req.body.emailpsicologo == "string"
    ) {
      options.emailpsicologo = req.body.emailpsicologo;
    } else {
      return "Bad Body!";
    }

    if (req.body.idade !== undefined && typeof req.body.idade == "number") {
      options.idade = req.body.idade;
    } else {
      return "Bad Body!";
    }
  }

  if (req.body.email !== undefined && typeof req.body.email == "string") {
    options.email = req.body.email;
  } else {
    return "Bad Body!";
  }

  if (req.body.nome !== undefined && typeof req.body.nome == "string") {
    options.nome = req.body.nome;
  } else {
    return "Bad Body!";
  }

  return options;
}
//?Função que permite verificar se o objeto em causa está vazio ou não
function isEmpty(obj) {
  return !Object.keys(obj).length > 0;
}
