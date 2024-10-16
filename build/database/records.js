const { dbPath } = require("./index");
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database(dbPath);

const getAllRecords = (callback) => {
  db.all('SELECT * FROM records ORDER BY id DESC', [], (err, rows) => {
    if (err) {
      console.error('Error retrieving records', err.message);
      callback(err, null);
    } else {
      callback(null, rows);
    }
  });
};

const saveRecord = (data, callback) => {
  const { title, content, severity } = data;

  db.run('INSERT INTO records (title, content, severity) VALUES (?, ?, ?)', [title, content, severity], function (err) {
    if (err) {
      console.error('Error inserting data', err.message);
      callback(err, null);
    } else {
      console.log('Record saved to database with ID', this.lastID);
      callback(null, { id: this.lastID, title, content, severity });
    }
  });
};

module.exports = {
  getAllRecords,
  saveRecord,
};
