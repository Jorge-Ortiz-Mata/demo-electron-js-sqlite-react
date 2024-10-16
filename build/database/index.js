const path = require('path');
const { app } = require('electron');
const sqlite3 = require('sqlite3').verbose();

const dbPath = path.join(app.getPath('userData'), 'sqlite-database.db');
// const dbPath = path.join(__dirname, 'sqlite-database.db');
const backupsDir = path.join(app.getPath('userData'), 'backups');
// const backupsDir = path.join(__dirname, 'backups');

const db = new sqlite3.Database(dbPath);

const createRecordsTable = () => {
  db.run(`CREATE TABLE IF NOT EXISTS records (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, content TEXT, severity INTEGER)`, [], function (err) {
    if(err) {
      console.log(err)
    } else {
      console.log("The records table was created!")
    }
  });
};

const initializeDatabase = () => {
  createRecordsTable();
};

module.exports = {
  initializeDatabase,
  dbPath,
  backupsDir
};
