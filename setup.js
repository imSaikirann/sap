const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./myDb.db');

db.serialize(() => {
    db.run('CREATE TABLE IF NOT EXISTS anime (id INTEGER PRIMARY KEY, name TEXT, main TEXT)');

    const stmt = db.prepare('INSERT INTO anime (name, main) VALUES (?, ?)'); 

    const names = ['onepiece', 'AOT'];
    const mainChar = ['luffy', 'Eren'];

    for (let i = 0; i < names.length; i++) {
        stmt.run(`Name of the anime ${names[i]}`, `Main character: ${mainChar[i]}`); 
    }

    stmt.finalize(); 
});

db.close(); 
