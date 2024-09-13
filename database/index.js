const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'sqlite-demo-database.db');
const db = new sqlite3.Database(dbPath);

const createRecordsTable = () => {
  db.run(`CREATE TABLE IF NOT EXISTS records (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, content TEXT, severity INTEGER)`, [], function (err) {
    if(err) {
      console.log(err)
    } else {
      console.log("The records table was created!")
    }
  });
}

const initializeDatabase = () => {
  createRecordsTable();
}

module.exports = {
  initializeDatabase,
}
