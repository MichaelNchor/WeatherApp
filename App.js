const express = require("express");

const app = express();

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));

const https = require("https");

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  let weatherData;
  let icon;
  let urlImage;
  let unit = "metric";
  let cityName = req.body.cityName;
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cityName +
    "&appid=336cebda2cd46723ec444f6ab1600b67&units=" +
    unit;
  https.get(url, function (response) {
    console.log("status: ", response.statusCode);
    response.on("data", function (data) {
      weatherData = JSON.parse(data);
      //opposite JSON.stringify(data)
      icon = weatherData.weather[0].icon;
      urlImage = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.set("Content-Type", "text/html");
      res.write(
        "<h3>" +
          "The Temperature at " +
          weatherData.name +
          " is " +
          weatherData.main.temp +
          " degree Celcius" +
          "</h3>"
      );
      res.write(
        "<h4>The weather is " + weatherData.weather[0].description + "</h4>"
      );
      res.write("<img src=" + urlImage + ">");
      res.send();
    });
  });
});

app.listen(5500, function (req, res) {
  console.log("Server working on port: 5500");
});
