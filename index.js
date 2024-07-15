import express from "express";
import bodyParser from "body-parser";
import fs from "fs";
import path from "path";

const app = express();
const port = 3000;

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

var tasks = [];
var weektasks = [];

app.get('/', (req, res) => {
    // Create an array to store your tasks
    const active = "Home";
    res.render('index', { tasks, active });
  });
  
  app.get('/week', (req, res) => {
    // Render the weektodo.ejs page for the week's todo list
    const active = "Taskify"
    res.render('week' , { weektasks, active });
  });
// Add a task
app.post('/addTask', (req, res) => {
    const { task } = req.body;
    tasks.push(task); // Assuming tasks is declared in your server file
    res.redirect('/');
  });
  
  app.all('/delete/:index', (req, res) => {
    const index = req.params.index;
       
    if (req.method === 'POST') {
        console.log({index});
        tasks = tasks.filter(task => task !== index );

      res.redirect('/');
    } else if (req.method === 'GET') {
      res.render('delete', { index });
    }
  });

  app.post('/addweekTask', (req, res) => {
    const { weektask } = req.body;
    weektasks.push(weektask); // Assuming tasks is declared in your server file
    res.redirect('/week');
  });

  app.all('/weekdelete/:week', (req, res) => {
    const week = req.params.week;
       
    if (req.method === 'POST') {
        console.log({week});
        weektasks = weektasks.filter(weektask => weektask !== week );

      res.redirect('/week');
    } else if (req.method === 'GET') {
      res.render('weekdelete', { week });
    }
  });

  app.post('/save', (req, res) => {
    const alertMessage = 'You have successfully taskified'; // Your alert message
    // Send a JSON response with the alert message
    res.json({ message: alertMessage });
  });

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
  