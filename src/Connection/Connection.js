import mysql from "mysql2/promise";

class Connection {
  isConnected = false;
  conn = undefined;

  async connect() {
    this.conn = await mysql
      .createConnection("mysql://root:@localhost:3306/learning-nodejs")
      .then((conn) => {
        this.isConnected = true;
        return conn;
      });
  }
}

const ConnectionInstance = new Connection();

ConnectionInstance.connect();

export default ConnectionInstance;
