const Joi = require ('joi');
const express = require('express');
const app = express();

app.use(express.json());

const courses = [{ id: 1, course: "Course 1"}, { id: 2, course: "Course 2"}, { id: 3, course: "Course 3"}];

app.get('/', (req,res) => {
    res.send('Hello World');
})
app.get('/api/courses', (req,res) =>{
    res.send(courses);
})
app.get('/api/courses/:year/:month', (req,res) =>{
    res.send([{params: req.params},{ query: req.query}]);
})
app.post('/api/courses', (req,res) => {
    const schema = Joi.object({
        name : Joi.string().min(3).required()
    })
    const result = schema.validate(req.body);
    // res.send(result);
    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }
    // if(!req.body.name){
    //     req.status(400).send("Bad Request");
    //     return;
    // }
    const course = {
        id: courses.length + 1,
        course : req.body.name
    }
    courses.push(course);
    res.send(course);
})
app.put('/api/courses/:id', (req,res) =>{
    const course = courses.find(course => course.id === parseInt(req.params.id));
    if(!course) res.status(404).send("Course not found");
    const schema = Joi.object({
        name : Joi.string().min(3).required()
    })
    const result = schema.validate(req.body);
    // res.send(result);
    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }
    course.course = req.body.name;
    res.send(course);
})
app.delete('/api/courses/:id', (req,res) =>{
    const course = courses.find(course => course.id === parseInt(req.params.id));
    if(!course) res.status(404).send("Course not found");
    const schema = Joi.object({
        name : Joi.string().min(3).required()
    })
    const result = schema.validate(req.body);
    // res.send(result);
    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }
    courses.splice(courses.indexOf(course),1);
    res.send(course);
})
app.get('/api/courses/:id', (req,res) =>{
    const course = courses.find(course => course.id === parseInt(req.params.id));
    if(!course) res.status(404).send("Course not found");
    res.send(course);
})



app.listen(3000, () => console.log("Listening to port 3000"));

