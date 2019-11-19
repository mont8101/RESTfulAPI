var fs = require('fs')
var path = require('path')

// NPM modules
var express = require('express')
var sqlite3 = require('sqlite3')
var bodyParser = require('body-parser');

var public_dir = path.join(__dirname, 'public');
var template_dir = path.join(__dirname, 'templates');
var db_filename = path.join(__dirname, 'stpaul_crime.sqlite3');

var app = express();
var port = 8000;

// open usenergy.sqlite3 database
var db = new sqlite3.Database(db_filename, sqlite3.OPEN_READONLY, (err) => {
    if (err) {
        console.log('Error opening ' + db_filename);
    }
    else {
        console.log('Now connected to ' + db_filename + '\n');
    }
});

app.use(express.static(public_dir));
app.use(bodyParser.urlencoded({extended: true}));
app.get("/neighborhoods", (req, res)=>{
    db.all("SELECT * FROM neighborhoods", (err, rows)=>{
        console.log(rows);
    });
    
});
console.log('Now listening on port ' + port);
app.listen(port);