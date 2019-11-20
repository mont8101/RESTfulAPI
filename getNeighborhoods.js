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

// open stpaul_crime.sqlite3 database
var db = new sqlite3.Database(db_filename, sqlite3.OPEN_READONLY, (err) => {
    if (err) {
        console.log('Error opening ' + db_filename);
    }
    else {
        console.log('Now reading ' + db_filename + '\n');
    }
});

app.use(express.static(public_dir));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/codes", (req, res)=>{
    db.all("SELECT * FROM codes", (err, rows)=>{
        var dbCodes = "";
        for(i = 0; i < rows.length; i++) {
            dbCodes = dbCodes + '"C' + rows[i]["code"] + '": "' + rows[i]["incident_type"] + '",' + "\n"
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send(dbCodes);
    });
});

app.get("/neighborhoods", (req, res)=>{
    db.all("SELECT * FROM neighborhoods", (err, rows)=>{
        var dbNeighborhoods = "";
        for(i = 0; i < rows.length; i++) {
            dbNeighborhoods = dbNeighborhoods + '"N' + rows[i]["neighborhood_number"] + '": "' + rows[i]["neighborhood_name"] + '",' + "\n"
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send(dbNeighborhoods);
    });
});

app.get("/incidents", (req, res)=>{
    db.all("SELECT * FROM incidents", (err, rows)=>{
        var dbIncidents = "";
        for(i = 0; i < rows.length; i++) {
            dbIncidents = dbIncidents + '"I' + rows[i]["case_number"] + '": {' + "\n" +
            '"time": "' + rows[i]["date_time"] + '",' + "\n" +
            '"code": ' + rows[i]["code"] + ',' + "\n" +
            '"incident": "' + rows[i]["incident"] + '",' + "\n" +
            '"police_grid": ' + rows[i]["police_grid"] + ',' + "\n" +
            '"neighborhood_number": ' + rows[i]["neighborhood_number"] + ',' + "\n" +
            '"block": "' + rows[i]["block"] + '",' + "\n" + "}," +"\n"       
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send(dbIncidents);
    });
});
console.log('Now listening on port ' + port);
app.listen(port);
