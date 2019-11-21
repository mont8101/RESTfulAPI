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
    var format = req.query.format;
   
    db.all("SELECT * FROM codes", (err, rows) => {
        if (format == null || format == "JSON") {
            var dbCodes = "{\n";

            if (code == null) {
                for (i = 0; i < rows.length - 1; i++) {
                    dbCodes = dbCodes + '"C' + rows[i]["code"] + '": "' + rows[i]["incident_type"] + '",' + "\n";

                }
                dbCodes = dbCodes + '"C' + rows[i]["code"] + '": "' + rows[i]["incident_type"] + '"\n}';
            } else {
                code = code.toString();
                var codeArr = code.split(",");
                console.log(rows.length);
                console.log(codeArr);
                for (var i = 0; i < rows.length; i++) {
                    for (var j = 0; j < codeArr.length; j++) {
                        if (rows[i]["code"] == codeArr[j]) {
                            dbCodes = dbCodes + '"C' + rows[i]["code"] + '": "' + rows[i]["incident_type"] + '",' + "\n";
                        }
                    }
                }
                dbCodes = dbCodes + "}"
            }
        }else if(format == "XML"){
            var dbCodes = "<codes>\n";
            if(code == null){
                for(var i = 0; i<rows.length; i++){
                    dbCodes = dbCodes + "<"+rows[i]["code"]+">"+rows[i]["incident_type"]+"</"+rows[i]["code"]+">\n";
                }
                dbCodes = dbCodes + "</codes>";
            }else{
                code = code.toString();
                var codeArr = code.split(",");
                for(var i = 0; i<rows.length; i++){
                    for(var j=0; j<code.length;j++){
                        if(rows[i]["code"] == codeArr[j]){
                            dbCodes = dbCodes + "<"+rows[i]["code"]+">"+rows[i]["incident_type"]+"</"+rows[i]["code"]+">\n";
                        }
                    }
                }
                dbCodes = dbCodes + "</codes>";
            }
        }
        //dbCodes = JSON.parse(dbCodes);
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send(dbCodes);
    });

});

app.get("/neighborhoods", (req, res) => {
    var id = req.query.id;
    var format = req.query.format;

    db.all("SELECT * FROM neighborhoods", (err, rows) => {
        if (format == null || format == "JSON") {
            var dbNeighborhoods = "";
            //console.log(rows);
            if (id == null) {
                for (i = 0; i < rows.length; i++) {
                    dbNeighborhoods = dbNeighborhoods + '"N' + rows[i]["neighborhood_number"] + '": "' + rows[i]["neighborhood_name"] + '",' + "\n"
                }
            } else {
                id = id.toString();
                id = id.split(",");
                //console.log(id);
                //console.log(rows[1]["neighborhood_number"]);
                //console.log(rows.length);
                for (var i = 0; i < rows.length; i++) {
                    for (var j = 0; j < id.length; j++) {
                        if (rows[i]["neighborhood_number"] == id[j]) {

                            dbNeighborhoods = dbNeighborhoods + '"N' + rows[i]["neighborhood_number"] + '": "' + rows[i]["neighborhood_name"] + '",' + "\n";
                        }
                    }
                }
            }

        } else if (format == "XML") {
            var dbNeighborhoods = "<neighborhoods>\n";
            if(id == null){
                for (i = 0; i < rows.length; i++) {
                    dbNeighborhoods = dbNeighborhoods + "<"+rows[i]["neighborhood_number"]+">"+rows[i]["neighborhood_name"]+ "</"+rows[i]["neighborhood_number"]+">\n";
                }
                dbNeighborhoods += "</neightborhoods>";
            }else{
                var dbNeighborhoods = "<neighborhoods>\n";
                id = id.toString();
                id = id.split(",");
                for (var i = 0; i < rows.length; i++) {
                    for (var j = 0; j < id.length; j++) {
                        if (rows[i]["neighborhood_number"] == id[j]) {

                            dbNeighborhoods = dbNeighborhoods + "<"+rows[i]["neighborhood_number"]+">"+rows[i]["neighborhood_name"]+ "</"+rows[i]["neighborhood_number"]+">\n";
                        }
                    }
                }
                dbNeighborhoods += "</neightborhoods>";
            }
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send(dbNeighborhoods);
    });
});

app.get("/incidents", (req, res)=>{
    db.all("SELECT case_number, code, incident, police_grid, neighborhood_number, block, DATE(date_time) as dateOfIncident, TIME(date_time) as timeOfIncident FROM incidents", (err, rows)=>{
        var dbIncidents = "";
        var theLength = rows.length;
        var limit = req.query.limit;
        if(limit != null){
            theLength = limit;
        }
        for(i = 0; i < theLength; i++) {
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

app.put("/new-incident", (req, res)=>{
    var thePromise = new Promise((resolve, reject) =>{
        db.all("SELECT case_number FROM Incidents WHERE case_number = " + req.body.case_number + ";", (err, rows)=>{
            if (rows.length > 0){
                resolve();
            }
            else{
                reject();
            }
        });
    });
    thePromise.then(()=>{
        res.type("text").status(500).send("That case is already in the database");
    }).catch(()=>{
        db.run(`INSERT INTO Incidents (case_number, date_time, code, incident, police_grid, neighborhood_number, block) VALUES ('` + req.body.case_number + `', '` + req.body.date + `T` + req.body.time + `', ` + req.body.code + `, '` + req.body.incident + `', ` + req.body.police_grid + `, ` + req.body.neighborhood_number + `, '` + req.body.block + `');`, (err)=> {
            if(err) {
                console.log(err);
            }
            else{
                res.type("text").status(200).send("Record has been added");
            }
        });
    });
}); 

console.log('Now listening on port ' + port);
app.listen(port);
