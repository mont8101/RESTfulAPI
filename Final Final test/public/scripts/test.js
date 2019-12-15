function Prompt() {
    $("#dialog-form").dialog({
        autoOpen: true,
        modal: true,
        width: "360px",
        buttons: {
            "Ok": function() {
                var prompt_input = $("#prompt_input");
                Init(prompt_input.val());
                $(this).dialog("close");
            },
            "Cancel": function() {
                $(this).dialog("close");
            }
        }
    });
}

var app;
var map;

var hood1 = {name: "Capitol River", loc: L.latLng(44.950810, -93.093836)}
var hood2 = {name: "Como", loc: L.latLng(44.979915, -93.155522)}
var hood3 = {name: "Conway/Battlecreek/Highwood", loc: L.latLng(44.935056, -93.027985)}
var hood4 = {name: "Dayton's Bluff", loc: L.latLng(44.954975, -93.061132)}
var hood5 = {name: "Greater East Side", loc: L.latLng(44.977595, -93.025413)}
var hood6 = {name: "Hamline/Midway", loc: L.latLng(44.962902, -93.167076)}
var hood7 = {name: "Highland", loc: L.latLng(44.912619, -93.177302)}
var hood8 = {name: "Macalester-Groveland", loc: L.latLng(44.934333, -93.167037)}
var hood9 = {name: "North End", loc: L.latLng(44.977405, -93.106506)}
var hood10 = {name: "Payne/Phalen", loc: L.latLng(44.977491, -93.065931)}
var hood11 = {name: "West Side", loc: L.latLng(44.929972, -93.078387)}
var hood12 = {name: "St. Anthony", loc: L.latLng(44.969538, -93.197965)}
var hood13 = {name: "Summit Hill", loc: L.latLng(44.937493, -93.137083)}
var hood14 = {name: "Summit/University", loc: L.latLng(44.951619, -93.126488)}
var hood15 = {name: "Thomas/Dale(Frogtown)", loc: L.latLng(44.959457, -93.120456)}
var hood16 = {name: "Union Park", loc: L.latLng(44.948496, -93.174570)}
var hood17 = {name: "West Seventh", loc: L.latLng(44.927909, -93.127797)}

hoods = [hood1,hood2,hood3,hood4,hood5,hood6,hood7,hood8,hood9,hood10,hood11,hood12,hood13,hood14,hood15,hood16,hood17];

function addBoundary(){
    L.polygon([
    [44.988043, -93.207677],//1
    [44.988088, -93.187250],//2
    [44.976978, -93.187247],//3
    [44.977480, -93.167165],//4
    [44.988164, -93.167165],//5
    [44.988286, -93.156694],//6
    [44.992049, -93.156694], //this is where the lake is in between
    [44.992171, -93.005117],
    [44.890956, -93.004430],
    [44.890956, -93.020051],//9
    [44.919406, -93.050607],//10
    [44.919893, -93.090948],//11
    [44.923417, -93.091119],//12
    [44.923296, -93.096269],//13
    [44.919771, -93.096097],//14
    [44.919649, -93.128541],//15
    [44.906399, -93.135408],//16
    [44.904048, -93.138936],//mid
    [44.893591, -93.153098],//17
    [44.887389, -93.174384],//18
    [44.888422, -93.178160],//19
    [44.893652, -93.177130],//20
    [44.896063, -93.190340],//21
    //[44.898860, -93.191713],//22
    [44.903967, -93.191541],//22
    [44.909195, -93.200811],//23
    [44.926720, -93.199961],//mid
    [44.941646, -93.200468],//24
    [44.951973, -93.204931],//25
    [44.953188, -93.208021],//26
    [44.959720, -93.208026]//27
    ]).addTo(map);
    
    L.polygon([
    [44.926720, -93.199961],//1
    [44.926902, -93.144686],//2
    [44.915476, -93.144686],//3
    [44.908608, -93.155501],//4
    [44.905143, -93.153613],//5
    [44.911039, -93.144000],//6
    [44.904048, -93.138936],//7
    [44.893591, -93.153098],//8
    [44.887389, -93.174384],//9
    [44.888422, -93.178160],//10
    [44.893652, -93.177130],//11
    [44.896063, -93.190340],//12
    [44.903967, -93.191541], //13
    [44.909195, -93.200811] //14
    ]).addTo(map);
    
    L.polygon([
    [44.926720, -93.199961],//river side bot left
    [44.926902, -93.144686],
    [44.930231, -93.141932],//start right side going north
    [44.931294, -93.143820],
    [44.931963, -93.146652],
    [44.934059, -93.149528],
    [44.941320, -93.152660], //north right
    [44.941646, -93.200468], //north left
    ]).addTo(map);
   
    L.polygon([
    [44.941646, -93.200468],
    [44.941320, -93.152660],
    [44.955724, -93.146932],//top right
    [44.959672, -93.187187],//middle point
    [44.954449, -93.187187],
    [44.959368, -93.200062],
    [44.959720, -93.208026], //top left
    [44.953188, -93.208021], 
    [44.951973, -93.204931]
    ]).addTo(map);
    
    L.polygon([
    [44.959720, -93.208026],//27
    [44.959368, -93.200062],
    [44.954449, -93.187187],
    [44.966221, -93.187448],//up
    [44.966209, -93.186239],//right
    [44.969519, -93.186311],//up
    [44.969670, -93.186796],//left
    [44.972160, -93.186918],//up
    [44.970078, -93.166799],//right
    [44.973297, -93.166840],//up como border
    [44.973393, -93.175748],//left como border 
    [44.977272, -93.175526],//up
    [44.976978, -93.187247],//3
    [44.988088, -93.187250],//2
    [44.988043, -93.207677]//1
    ]).addTo(map);
    
    L.polygon([
    [44.970078, -93.166799],
    [44.973297, -93.166840],
    [44.973393, -93.175748],
    [44.977272, -93.175526],
    [44.977480, -93.167165],//4
    [44.988164, -93.167165],//5
    [44.988286, -93.156694],//6
    [44.992049, -93.156694],
    [44.992068, -93.126102],//between 7 and 7.5
    [44.977414, -93.126367],//down
    [44.977380, -93.135303],
    [44.975574, -93.135327],
    [44.975710, -93.139422],
    [44.979083, -93.143420],//flat by lake
    [44.979338, -93.146853],//^^
    [44.967073, -93.146853]
    ]).addTo(map);
    
    L.polygon([
    [44.955724, -93.146932],//bot left Thomas Dale
    [44.959672, -93.187187],
    [44.966221, -93.187448],
    [44.966209, -93.186239],
    [44.969519, -93.186311],
    [44.969670, -93.186796],
    [44.972160, -93.186918],
    [44.970078, -93.166799],
    [44.967073, -93.146853],//top left Thomas Dale
    ]).addTo(map);
   
    L.polygon([
    [44.955724, -93.146932],//bot left Thomas Dale
    [44.967073, -93.146853],//top left Thomas Dale
    [44.965105, -93.116079],
    [44.963101, -93.105908],
    [44.963557, -93.091273],
    [44.958000, -93.090801],
    [44.955935, -93.097410],
    [44.955874, -93.105908],
    [44.954933, -93.105951],
    [44.954963, -93.109212],
    [44.955813, -93.109212]
    ]).addTo(map);
    
    L.polygon([
    [44.967073, -93.146853],//top left Thomas Dale
    [44.965105, -93.116079],
    [44.963101, -93.105908],
    [44.963557, -93.091273],
    [44.992099, -93.089172],
    [44.992068, -93.126102],
    [44.977414, -93.126367],//down
    [44.977380, -93.135303],
    [44.975574, -93.135327],
    [44.975710, -93.139422],
    [44.979083, -93.143420],//flat by lake
    [44.979338, -93.146853]
    ]).addTo(map);
    
    L.polygon([
    [44.955847, -93.090582],
    [44.963557, -93.091273],
    [44.992099, -93.089172],//top left
    [44.992125, -93.044841], //top right
    [44.974045, -93.045419],//down
    [44.968001, -93.050610],
    [44.965591, -93.065858],
    [44.967159, -93.070021],
    [44.966683, -93.072111],
    [44.962067, -93.072712],
    [44.960731, -93.076231],
    [44.956844, -93.076660],
    [44.954050, -93.082153],
    [44.955690, -93.084041]
    ]).addTo(map);
    
    L.polygon([
    [44.992125, -93.044841], //top left
    [44.992171, -93.005117], //7.5
    [44.963020, -93.004871],
    [44.963287, -93.046195], //bottom left
    [44.972457, -93.043792],
    [44.974045, -93.045419] //pointy bit
    ]).addTo(map);
    
    L.polygon([
    [44.974045, -93.045419], //pointy bit
    [44.968001, -93.050610],
    [44.965591, -93.065858],
    [44.967159, -93.070021],
    [44.966683, -93.072111],
    [44.962067, -93.072712],
    [44.960731, -93.076231],
    [44.956844, -93.076660],
    [44.954050, -93.082153],
    [44.955690, -93.084041], //from pp
    [44.955847, -93.090582], //from pp
    [44.952566, -93.087522], 
    [44.952753, -93.082368], 
    [44.946612, -93.078992],
    [44.947171, -93.071739], 
    [44.942531, -93.058357],
    [44.947192, -93.040392],
    [44.957651, -93.039512],
    [44.957758, -93.037752],
    [44.960485, -93.037752],
    [44.960489, -93.039529],
    [44.963287, -93.046195],
    [44.972457, -93.043792]
    ]).addTo(map);
    
    L.polygon([
    [44.941320, -93.152660],//bottom left
    [44.955724, -93.146932],//top left
    [44.955813, -93.109212],//small box
    [44.954963, -93.109212],//^^
    [44.950615, -93.109693],//down 
    [44.950523, -93.105358],//right
    [44.945056, -93.110079],//down left
    [44.944540, -93.108749],//down right
    [44.941199, -93.118190],//down left
    ]).addTo(map);

    L.polygon([
    [44.941320, -93.152660],
    [44.934059, -93.149528],
    [44.931963, -93.146652],
    [44.931294, -93.143820],
    [44.930231, -93.141932],
    [44.931963, -93.130688],
    [44.941352, -93.112154],
    [44.941199, -93.118190]
    ]).addTo(map);

    L.polygon([
    [44.926902, -93.144686],//2
    [44.915476, -93.144686],//3
    [44.908608, -93.155501],//4
    [44.905143, -93.153613],//5
    [44.911039, -93.144000],//6
    [44.904048, -93.138936],//7
    [44.906399, -93.135408],//16
    [44.919649, -93.128541],//15
    [44.942319, -93.091489],//up right
    [44.943986, -93.092470],//under downtown
    [44.943661, -93.100346],//^^
    [44.941352, -93.112154],//^^
    [44.931963, -93.130688],
    [44.930231, -93.141932]
    ]).addTo(map);
    
    L.polygon([
    [44.919649, -93.128541],//15
    [44.942319, -93.091489],//up right
    [44.946558, -93.078902],//follow river
    [44.947171, -93.071739],
    [44.942531, -93.058357],//change
    [44.932402, -93.049891],//last river point
    [44.919406, -93.050607],//10
    [44.919893, -93.090948],//11
    [44.923417, -93.091119],//12
    [44.923296, -93.096269],//13
    [44.919771, -93.096097]//14
    ]).addTo(map);
    
    L.polygon([
    [44.955847, -93.090582], //from pp
    [44.952566, -93.087522], 
    [44.952753, -93.082368], 
    [44.946612, -93.078992],//end db
    [44.942319, -93.091489],//up right
    [44.943986, -93.092470],//under downtown
    [44.943661, -93.100346],//^^
    [44.941352, -93.112154],//^^
    [44.941199, -93.118190],//last of summit hill
    [44.944540, -93.108749],
    [44.945056, -93.110079],
    [44.950523, -93.105358],
    [44.950615, -93.109693],
    [44.954963, -93.109212],//end small box
    [44.954933, -93.105951],
    [44.955874, -93.105908],
    [44.955935, -93.097410],
    [44.958000, -93.090801],
    [44.963557, -93.091273],
    ]).addTo(map);
}

function Init(apiUrl) {
    var northWest = L.latLng(44.993385, -93.211626),
    southEast = L.latLng(44.888645, -93.001340),
    bounds = L.latLngBounds(northWest, southEast);

    map = L.map('map', {
        center: [44.953310, -93.091463],
        zoom: 13,
        maxBounds: bounds,
        minZoom: 13,
        maxZoom: 18,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    addBoundary();
    
    //console.log(apiUrl);
    var codes;
    var neighborhoods;
    var incidents;

    var promise1 = new Promise(function(resolve, reject) { 
        $.getJSON(apiUrl+"/codes", (data) =>{
            resolve(data);
        });
    });
    var promise2 = new Promise(function (resolve, reject) { 
        $.getJSON(apiUrl+"/neighborhoods", (data) =>{
            resolve(data);
        });
    });

    var promise3 = new Promise(function (resolve, reject){
        $.getJSON(apiUrl+"/incidents?start_date=2019-10-01&end_date=2019-31-10", (data) =>{
            resolve(data);
        });
    });

    Promise.all([promise1, promise2, promise3]).then(function(results){
        codes = results[0];
        neighborhoods = results[1];
        incidents = results[2];
        var table;
        var numberOfCrimes = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

		for(key in incidents) {
            table = {
                codeNumber: "",
                incident: "",
                date: "",
                address: "",
                neighborhood: "",
                policeGrid: "",
            };
			table.codeNumber = key;
			table.incident = incidents[key].incident;
			table.date = incidents[key].date;
			table.address = incidents[key].block;
			table.neighborhood = incidents[key].neighborhood_number;
			table.policeGrid = incidents[key].police_grid; 
            app.rowData.push(table);
            
            numberOfCrimes[incidents[key].neighborhood_number-1]++;
        }
        
        for(let i = 0; i < hoods.length; i++){
            L.marker(hoods[i].loc, { 
                title: hoods[i].name
            }).addTo(map).bindPopup(hoods[i].name+" total crimes: "+numberOfCrimes[i]).openPopup()
        }
    });

    app = new Vue({
        el: "#app",
        data: {
            input: "",
            rowData:[],
            mapBounds: map.getBounds()
        },
		methods: {
			visibleOnMap: function(neighborhood_number){
                let loc = hoods[neighborhood_number-1].loc;
                if (this.mapBounds.contains(loc)){
                    return true;
                }
                return false;
            },
            crimeTypeBackground: function(codeNumber){
                if(110 <= codeNumber && codeNumber <= 566){
                    // violent (red)
                    return "background: #ffaaaa;;"
                } else if (600 <= codeNumber && codeNumber <= 1436){
                    // property (yellow)
                    return "background: #ffffaa;"
                }
                // other (green)
                return "background: #aaffaa;"
            },
            crimeTypeColor: function(codeNumber){
                if(110 <= codeNumber && codeNumber <= 566){
                    // violent (red)
                    return "color: #6b0000;"
                } else if (600 <= codeNumber && codeNumber <= 1436){
                    // property (yellow)
                    return "color: #d2c400;"
                }
                // other (green)
                return "color: #0e6500;"
            }
		}		
    });

	map.on("moveend", function () {
        app.mapBounds = map.getBounds();
    });
    map.on('zoomend', function () {
        app.mapBounds = map.getBounds();
    });
}

function addIncidentMarker(address, date, time, incident, code){
    address = address.replace('X', '0');
    getLatLngFromAddress(address)
        .then(data => {
            if(data.length > 0) {
                let lat = data[0].lat;
                let lng = data[0].lon;
                // Create a popup with date, time, incident, and delete button when hovering over that marker
                let popup = L.popup({closeOnClick: false, autoClose: false}).setContent([address, date+' '+time, incident].join('<br/> '));
                let marker = L.marker([lat, lng], {title: address}).bindPopup(popup).addTo(map);
                app.incidentMarkers.push(marker);
            } else {
                alert("Address '"+address+"' not found");
            }
        });
}

function searchLocation(){
    $.getJSON("https://nominatim.openstreetmap.org/search?q="+app.input+"&format=json", (data) =>{
        //console.log(data);
        var lat = data[0].lat;
        var lon = data[0].lon;
        //console.log(lat);
        //console.log(lon);

        if (lat < 44.888645){
            lat = 44.888645;
        }else if (lat > 44.993385) {
            lat = 44.993385;
        }

        if (lon < -93.211626) {
            lon = -93.211626;
        }else if (lon > -93.001340){
            lon = -93.001340;
        }
	
        map.panTo(new L.LatLng(lat, lon));

        $("#searchbar").val(data[0].display_name);
        
        L.marker(new L.LatLng(lat, lon), {title: (data[0].display_name)}).addTo(map).bindPopup(data[0].display_name).openPopup();
    });
}