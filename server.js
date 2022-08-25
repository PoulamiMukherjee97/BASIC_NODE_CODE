const exp=require('express');
const bodyParser=require('body-parser')
const app=exp();
app.use(exp.json())
app.use(bodyParser.json()); // supports json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // supports encoded bodies

var formData;
app.post("/dataShow",(req,res)=>
{   
    formData=req.body;
    res.send(req.body)
})
app.get("/dataShow",(req,res)=>{
res.send(formData)})

app.listen(3000,()=>console.log("Listening to port 3000"));