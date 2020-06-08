const Express = require("express");
const BodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
//?Connection String para a base de dados MongoDB em cloud através do ATLAS
const url =
  "mongodb+srv://brunosilva:Bruno-1998@cluster0-mubfv.mongodb.net/test?authSource=admin&replicaSet=Cluster0-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass%20Community&retryWrites=true&ssl=true";

var app = Express();
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});
var database, collection;

app.listen(8080, () => {
  MongoClient.connect(url, { useNewUrlParser: true }, (error, client) => {
    if (error) {
      throw error;
    }
    //?Base de dados MTW no mongoDBs
    database = client.db("MTW");

    const checkAuth = require("./backend/middleware/check-auth");

    //?Endpoints relacionados com as collections Paciente e Psicólogo
    //?EndPoint que recebe:  todos os pacientes ou psicologos // filtrados por email, id, nome, password
    app.get("/api/:collection", checkAuth, async function (req, res) {
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
    //Cria uma collection
    app.post("/api/:collection", checkAuth, async function (req, res) {
      collection = database.collection(req.params.collection);

      let options = parseHeaderOptionsInsert(req);

      if (options == "Bad Body!") {
        return res.status(400).send("Bad Body!");
      } else {
        let exists = await collection.findOne({ email: options.email });

        if (exists == null) {
          await collection.insertOne(options, (error, result) => {
            if (error) {
              res.status(500).json({
                error: err,
              });
            }
            else {
              res.status(201).json({
                message: "User created!",
                result: result,
              });
            }
          });
        } else {
          return res.send("Pessoa já existe");
        }
      }
    });
    //Login dos pacientes e dos Psicólogos
    app.post("/api/login/:collection", async function (req, res) {
      collection = database.collection(req.params.collection);

      let options = parseHeaderOptionsLogin(req);
      let user;

      if (options === "Bad Body") {
        return res.status(400).send(options);
      }
      else {
        switch (req.params.collection) {
          case 'psicologos': user = await collection.findOne({ email: options.email, password: options.password });
            break;
          case 'pacientes': user = await collection.findOne({ email: options.email });
            break;
        }

        // checkPass = bcrypt.compare(options.password)
        if (user !== null) {
          const token = jwt.sign(
            { email: user.email, userId: user._id },
            "secret",
            { expiresIn: "1h" }
          );
          //envia token ao user
          res.status(200).json({
            token: token,
          });
        }
        else {
          return res.status(401).json({
            message: "Auth failed",
          });
        }
      }
    });
    //Apaga uma collection
    app.delete("/api/:collection", checkAuth, async function (req, res) {
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
    app.get("/api/pacientes/lista", checkAuth, async function (req, res) {
      collection = database.collection('pacientes');

      let user = jwt.decode(req.headers.authorization.split(" ")[1], 'secret');

      await collection.find({ emailpsicologo: user.email }).toArray((error, result) => {
        if (error) {
          return res.status(500).send(error);
        } else if (result == null) {
          return res.status(404).send('NOTFOUND');
        }
        res.send(result);
    });
  });
    app.post("/api/paciente/questionario/:collection", checkAuth, async function(req, res) {
      collection = database.collection(req.params.collection);
       let user = jwt.decode(req.headers.authorization.split(" ")[1], 'secret');

          req.body.email = user.email;
          req.body.date = new Date();

          await collection.insertOne(req.body, (error, result) => {
            if (error) {
              res.status(500).json({
                error: error,
              });
            } else {
              res.status(201).json({
                message: "Poll finished",
                result: result,
              });
            }
        });
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
function parseHeaderOptionsLogin(req) {
  let options = {};

  if (req.params.collection == "psicologos") {

    if (req.body.password !== undefined && typeof req.body.password == "string") {
      options.password = req.body.password;
    } else {
      return "Bad Body!";
    }

    if (req.body.email !== undefined && typeof req.body.email == "string") {
      options.email = req.body.email;
    } else {
      return "Bad Body!";
    }
  }
  else if (req.params.collection == "pacientes") {
    if (req.body.email !== undefined && typeof req.body.email == "string") {
      options.email = req.body.email;
    } else {
      return "Bad Body!";
    }
  }
  return options;
}
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
