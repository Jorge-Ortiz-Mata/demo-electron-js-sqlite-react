const fs = require("fs");
const path = require('path');
const { dbPath, backupsDir } = require("./index");

const backUpDatabase = () => {
  const backupPath = path.join(backupsDir, `backup-${Date.now()}.sqlite`);
  
  if (!fs.existsSync(backupsDir)) {
    fs.mkdirSync(backupsDir);
  }

  fs.copyFile(dbPath, backupPath, (err) => {
    if (err) {
      console.error('Something went wrong: ', err);
    } else {
      deleteOldBackupFiles(backupsDir, 10);
    }
  });
}

// Función para eliminar backups antiguos
const deleteOldBackupFiles = (backupsDir, limit) => {
  fs.readdir(backupsDir, (err, files) => {
    if (err) {
      console.error('Error leyendo la carpeta de backups:', err);
      return;
    }

    // Ordena los archivos por fecha de creación (los más antiguos primero)
    files.sort((a, b) => {
      return fs.statSync(path.join(backupsDir, a)).mtime.getTime() - 
             fs.statSync(path.join(backupsDir, b)).mtime.getTime();
    });

    // Elimina archivos si hay más de 'limit'
    if (files.length > limit) {
      for (let i = 0; i < files.length - limit; i++) {
        const filePath = path.join(backupsDir, files[i]);
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error('Error eliminando backup antiguo:', err);
          } else {
            console.log('Backup antiguo eliminado:', filePath);
          }
        });
      }
    }
  });
};

module.exports = {
  backUpDatabase
};
