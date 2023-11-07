const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./myDb.db');
db.all('SELECT * FROM anime',[],(err,rows)=>{
    if(err)
    {
        console.log(err)
    }
    else
    {
        console.log(rows)
    }
})
db.close()
