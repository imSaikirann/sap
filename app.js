const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const app = express();

// Create a database connection
const db = new sqlite3.Database('./myDb.db', (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Server is running on port 3000 and DB is connected.");
    }
});

app.use(express.json());

app.get("/rbs", (req, res) => {
    db.all("SELECT * FROM anime", [], (err, rows) => {
        if (err) {
            console.log(err.message);
        } else {
            res.json(rows);
        }
    });
});

app.post('/rbs',(req,res)=>{
    const {name,main} = req.body
    db.run('INSERT INTO anime (name,main) VALUES(?,?)',[name,main] ,function(err){
        if(err)
        {
            console.log(err)
        }
        else{
            res.json({msg:"ADDED"})
        }
    })
})

app.put('/rbs/:id',(req,res)=>{
    const id = req.params.id
    const {name,main} = req.body
    db.run('UPDATE anime SET  name = ? ,main= ? WHERE id = ?',[name,main,id],function(err){
        if(err)
        {
            console.log(err)
        }
        else
        {
            res.json({msg:"Updated"})
        }
    })
})

app.delete('/rbs/:id',(req,res)=>{
    const id = req.params.id
    db.run('DELETE FROM anime WHERE id = ?',id,function(err){
        if(err)
        {
            console.log(err)
        }
        else{
            res.json({msg:id.name})
        }
    })
})

app.listen(3000, () => {
    console.log("Server is running on port 3000 and DB is connected.");
});
