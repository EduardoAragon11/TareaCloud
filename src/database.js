const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./user');

db.exec(`
    CREATE TABLE user(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email VARCHAR,
        name VARCHAR,
        lastName VARCHAR
    )
`);
