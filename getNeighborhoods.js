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
    var code = req.query.code;
    /*if(code == null){
        db.all("SELECT * FROM codes", (err, rows)=>{
            //console.log(code);
            var dbCodes = "";
            //console.log(rows[4]);
            for(i = 0; i < rows.length; i++) {
                dbCodes = dbCodes + '"C' + rows[i]["code"] + '": "' + rows[i]["incident_type"] + '",' + "\n"
            }
            res.setHeader('Content-Type', 'application/json');
            res.status(200).send(dbCodes);
            
            db.close();
        });       
    }else{
        db.all("SELECT * FROM codes", (err, rows)=>{
            var dbCodes = "";
            code = code.toString();
            var codeArr = code.split(",");
            console.log(rows.length);
            console.log(codeArr);
            for(var i = 0; i<rows.length; i++){
                for(var j = 0; j<codeArr.length; j++){
                    //console.log(i)
                    if (rows[i]["code"]==codeArr[j]){
                        dbCodes = dbCodes + '"C' + rows[i]["code"] + '": "' + rows[i]["incident_type"] + '",' + "\n"
                    }
                }
                
            }
            res.setHeader('Content-Type', 'application/json');
            res.status(200).send(dbCodes);
            console.log(dbCodes);
            db.close();
        });  
    }*/
    db.all("SELECT * FROM codes", (err, rows)=>{
        var dbCodes = "";

        if(code == null){
            for(i = 0; i < rows.length; i++) {
                dbCodes = dbCodes + '"C' + rows[i]["code"] + '": "' + rows[i]["incident_type"] + '",' + "\n"
            }
        }else{
            code = code.toString();
            var codeArr = code.split(",");
            console.log(rows.length);
            console.log(codeArr);
            for(var i = 0; i<rows.length; i++){
                for(var j = 0; j<codeArr.length; j++){
                    //console.log(i)
                    if (rows[i]["code"]==codeArr[j]){
                        dbCodes = dbCodes + '"C' + rows[i]["code"] + '": "' + rows[i]["incident_type"] + '",' + "\n"
                    }
                }
                
            }
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
    db.all("SELECT case_number, code, incident, police_grid, neighborhood_number, block, DATE(date_time) as dateOfIncident, TIME(date_time) as timeOfIncident FROM incidents", (err, rows)=>{
        var dbIncidents = "";
        for(i = 0; i < rows.length; i++) {
            date = rows[i]["date_time"]
            dbIncidents = dbIncidents + '"I' + rows[i]["case_number"] + '": {' + "\n" +
            '"date": "' + rows[i]["dateOfIncident"] + '",' + "\n" +
            '"time": "' + rows[i]["timeOfIncident"] + '",' + "\n" +
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
