import express from "express";
import faker from "faker";

import { UsersCollection, Teste } from "./src/UsersCollection.js";
import Notification from "./src/Notification.js";
import { sleep, users } from "./src/Helpers/Helper.js";
import Connection from "./src/Connection/Connection.js";

const app = express();
app.use(express.json());

app.get("/users", async (req, res) => {
  const usersCollection = new UsersCollection();
  const users = await usersCollection.get();

  res.send(users);
});

app.post("/users", async (req, res) => {
  const data = req.body;
  const usersCollection = new UsersCollection();
  const newUserId = await usersCollection.addUser(data);

  const user = await usersCollection.byId(newUserId);

  res.json(user);
});

app.get("/users/:id", async (req, res) => {
  const usersCollection = new UsersCollection();
  const user = await usersCollection.byId(req.params.id);

  res.status(!!user ? 200 : 404);

  console.log("teste");

  res.json(user);
});

app.put("/users/:id", async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  const usersCollection = new UsersCollection();

  const user = await usersCollection.byId(id);

  res.status(!!user ? 200 : 404);
  if (!user) {
    res.send({ message: "User Not Found" });
  }

  const isUpdated = await usersCollection.update(id, body);
  res.status(isUpdated ? 200 : 500);
  res.json(user);
});

app.delete("/users/:id", async (req, res) => {
  const { id } = req.params;
  const usersCollection = new UsersCollection();
  const isDeleted = await usersCollection.delete(id);

  res.json({ success: isDeleted });
});

app.get("/test/6", async (req, res) => {
  const test = "1";

  const promessaMensagem = async () => {
    await sleep(5000);

    if (test === 1) {
      return "Deu bom";
    } else {
      throw new Error("Deu ruim");
    }
  };

  promessaMensagem()
    .then((msg) => {
      console.log("Then", msg);
    })
    .catch((msg) => {
      console.log("Error", msg);
    });

  res.send({
    test: true,
  });
});

app.get("/test/5", (req, res) => {
  // Emite Finalização
  res.on("finish", () => {
    Notification.notify("Requisição Finalizada");
  });
  res.on("error", () => {
    Notification.notify("Requisição com Erro");
  });

  const usersCollection = new UsersCollection();

  // Cria Usuario Fake
  const makeUser = (id) => {
    return {
      id,
      name: faker.name.findName(),
      email: faker.internet.email(),
    };
  };

  // Adiciona novo usuario depois de tempo determinado
  const addUser = (id, time) => {
    setTimeout(() => {
      usersCollection.addUser(makeUser(id));
    }, time);
  };

  addUser(1, 1000);
  addUser(2, 2000);
  addUser(3, 3000);
  addUser(4, 4000);
  addUser(5, 5000);
  res.status(500);

  setTimeout(() => {
    res.json(usersCollection.get());
  }, 6000);
});
// get,post,put,patch,delete

app.get("/test/1/:qqrcoisa", (req, res) => {
  const { qqrcoisa } = req.params;
  const [math, arthur, nick] = users;
  const nickById = users.find((value, index) => {
    console.log("value", value);
    console.log("index", index);

    return value.id === 2;
  });

  res.json({
    users: users,
    arthur: arthur,
    nickById: nickById,
    math: math,
    nick: nick,
  });
});

app.get("/test/2", (req, res) => {
  const sendMessage = (name, fn) => {
    const message = fn("só tem baitola no rolê");
    return `${name}: ${message}`;
  };

  const msg1 = sendMessage("Arthur", (msg) => {
    return "Bom dia " + msg;
  });

  const msg2 = sendMessage("Mathews", () => {
    return "Bom dia";
  });

  const msg3 = sendMessage("Nickolas", () => {
    return "Bom dia";
  });

  res.json([msg1, msg2, msg3]);
});

app.get("/test/3", (req, res) => {
  const test = 1;
  const promessaMensagem = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (test === 1) {
          resolve("Deu bom");
        } else {
          reject("Deu erro");
        }
      }, 5 * 1000);
    });
  };

  return promessaMensagem()
    .then((msg1) => {
      console.log("Promessa com sucesso", msg1);
      return res.json({
        message: "Success",
      });
    })
    .catch((msg1) => {
      console.error("Promessa com erro", msg1);
      return res.json({
        message: "Error",
      });
    })
    .finally(() => {
      console.log("Finalizou!");
    });
});

app.get("/test/4", (req, res) => {
  res.json({
    name: faker.name.findName(),
    email: faker.internet.email(),
    avatar: faker.internet.avatar(),
    oba: false,
  });
});

app.listen(4000, () => {
  // Listen on port 3000
  console.log("Listening!"); // Log when listen success
});
