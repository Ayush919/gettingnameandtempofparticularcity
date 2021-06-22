const express = require('express');
const path = require("path");
const app = express();
const requests = require('requests');
const hbs = require("hbs");

const templatepath = path.join(__dirname , '../templates/views');
const partialpath = path.join(__dirname , '../templates/partials');

app.set('view engine' , 'hbs');
app.set('views' , templatepath);
hbs.registerPartials(partialpath);

app.use(express.static(templatepath));
app.get('' , (req,res)=>{
    res.render('index');

})
app.get('/about',(req,res)=> {
    requests(
        `http://api.openweathermap.org/data/2.5/weather?q=${req.query.name}&units=metric&appid=f054e1769cf05c48feb44ce1e6d2a0c7`
    )
      .on("data", (chunk) => {
        const objdata = JSON.parse(chunk);
        const arrData = [objdata];
        console.log(`city name is ${arrData[0].name} `);
        console.log(`the temp is ${arrData[0].main.temp}`);
         
        
       res.write(arrData[0].name);
        
      })
      .on("end", (err) => {
        if (err) return console.log("connection closed due to errors", err);
        res.end();
      });

})
app.listen(8080,()=>{
    console.log('hello buddy');
})