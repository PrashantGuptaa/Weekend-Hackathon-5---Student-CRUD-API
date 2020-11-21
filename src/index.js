const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 8080
app.use(express.urlencoded());
let studentArray = require('./InitialData');

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// your code goes here

let intialId = studentArray.length + 1;
app.get("/api/student",(req,res) => {
    res.send(studentArray);
})

app.get("/api/student/:id",(req,res) => {
    const id = req.params.id;
    const studentDet = studentArray.find((student) => student.id === parseInt(id));
    if(!studentDet){
        res.status(404).send("Invalid Id");
        return;
    }
    res.send(studentDet);
});

app.post("/api/student",(req,res) => {
    let {name , currentClass, division } = req.body;
    if(!name || !currentClass || !division){
        res.status(400).send("Incomplete Information");
        return;
    }
    const newStudent = {
        id: intialId,
        name,
        currentClass,
        division
    }
    intialId++;
    studentArray.push(newStudent);
    res.send(studentArray);
})

app.put("/api/student/:id",(req,res) => {
    const id = req.params.id;
    const studentDet = studentArray.find((student) => student.id === parseInt(id));
    if(!studentDet){
        res.status(400).send("Invalid Id");
        return;
    }
    
    if(req.body.name){
        studentDet.name=req.body.name;
    }
    if(request.body.currentClass){
        studentDet.currentClass=parseInt(req.body.currentClass);
    }
    if(request.body.division){
        studentDet.division=req.body.division;
    } 
   

    res.send(studentDet.name);
})


app.delete("/api/student/:id",(req,res)=>{
    const id = req.params.id;
    const studentDetIndex = studentArray.findIndex((student) => student.id === parseInt(id));
    console.log(studentDetIndex);
    if(studentDetIndex === -1){
        res.status(404).send("Invalid Id");
        return;
    }
   // studentArray[studentDetIndex].delete;
    for(let i = studentDetIndex ; i < studentArray.length ; i++){
        studentArray[i] = studentArray[i + 1];
    }
    studentArray.pop();
    res.send(studentArray);
    
})

app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;   
