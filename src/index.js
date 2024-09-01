const express = require('express');
const app = express();
const morgan = require('morgan');

app.set('port', process.env.PORT || 3000);
app.use(express.json());

//Database

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./user');

const insert = db.prepare('INSERT INTO user(email, name, lastName) VALUES (?,?,?)');

app.get('/user/all', (req, res) => {
    db.all("SELECT * FROM user", (err, rows) => {
        console.log(rows);
        res.send(JSON.stringify(rows));
    })
})

app.get('/user/:id', (req, res) => {
    db.get("SELECT * FROM user WHERE id = $id", {
        $id: req.params.id
    }, (err, row) => {
        res.send(JSON.stringify(row));
    });
})

app.post('/user', (req,res) => {
    const { email, name, lastName } = req.body;
    
    insert.run(email, name, lastName, function(err) {
        res.send("User added successfully");
    });
})

app.listen(app.get('port'), () => {
    console.log(`Server listening on port ${app.get('port')}`);
});