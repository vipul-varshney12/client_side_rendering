const express = require('express');
const app = express();

app.use(express.json());
const path = require("path");
app.use(express.static(path.join(__dirname, 'public')));

const todos = ['swim', 'game', 'dance', 'coding'];

app.get('/todos', (req, res) => {
    res.json({ todos });
});

app.post('/todos', (req, res) => {
    console.log(req.body);
    todos.push(req.body.value);
    res.send({ success: true });
});

app.put('/todos/:index', (req, res) => {
    const index = req.params.index;
    const newValue = req.body.value;
    todos[index] = newValue;
    res.send({ success: true });
});

app.delete('/todos/:index', (req, res) => {
    const index = req.params.index;
    todos.splice(index, 1);
    res.send({ success: true });
});

app.listen(5009, () => {
    console.log('server up at port 5009');
});
