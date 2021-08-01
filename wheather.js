const express = require('express');

const https = require('https');

const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.get('/',function(req,res){
 res.sendFile(__dirname + "/index.html");    
})

app.post("/", function(req,res){
    const cityName = req.body.cityName;
    const url = "https://api.openweathermap.org/data/2.5/find?q=" +cityName+"&appid=3a280efca84738697ac0ec68c4cf43f9&units=metric"

https.get(url,function(response){
    console.log(response.statusCode); 
    response.on("data", function(data){
        const wheatherData = JSON.parse(data);
        const temp = wheatherData.list[0].main.temp;
        const wheatherDescription = wheatherData.list[0].weather[0].description;
        const icon = wheatherData.list[0].weather[0].icon;
        const iconUrl = "https://openweathermap.org/img/wn/"+ icon +"@2x.png";
        console.log(temp); 
        console.log(wheatherDescription);
        res.write("<h1>The temperature in " +cityName+ " is = " + temp + " Degree</h1>");
        res.write("<h2>The wheather is currently = " + wheatherDescription + "</h2>");
        res.write("<img src="+iconUrl+" alt= icon>");
        
        res.send();
    })       
})
})
app.listen(8080,function() {
    console.log("Listening on port 8080");
});


