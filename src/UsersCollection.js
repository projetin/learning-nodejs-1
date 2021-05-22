import EventEmitter from "events";
import Connection from "./Connection/Connection.js";
import Notification from "./Notification.js";

export class UsersCollection extends EventEmitter {
  collection = [];

  constructor() {
    super();

    this.on("newUser", () => {
      Notification.notify("Novo Usuário Cadastrado");
    });
  }

  async addUser(user) {
    const [{ insertId }] = await Connection.conn.query(
      `INSERT INTO users (name, email) VALUES ('${user.name}', '${user.email}');`
    );

    this.emit("newUser", user);

    return insertId;
  }

  async get() {
    const [rows] = await Connection.conn.query("SELECT * FROM users");
    return rows;
  }

  async byId(id) {
    const [[row]] = await Connection.conn.query(
      `SELECT * from users WHERE id = ${id}`
    );
    return row;
  }

  async update(id, user) {
    try {
      await Connection.conn.query(
        `UPDATE users SET name = '${user.name}', email = '${user.email}' WHERE id = ${id}`
      );

      return true;
    } catch (e) {
      return false;
    }
  }

  async delete(id) {
    try {
      await Connection.conn.query(`DELETE FROM users WHERE id = ${id}`);

      return true;
    } catch (e) {
      return false;
    }
  }
}

export const Teste = "Oi";
