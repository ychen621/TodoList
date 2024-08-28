const express = require('express');
const app = express();
const cors = require('cors');
const port = 3000;

app.use(cors());
app.use(express.json());

// In-memory storage for todos
let todos = [];
let idCounter = 1;

// CREATE a new todo
app.post('/todos', (req, res) => {
    const { content } = req.body;
    const newTodo = { id: idCounter++, content, completed: false };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

// READ filter todos
app.get('/todos/filter/:filter', (req, res) => {
    const filter = req.params.filter;
    const filterList = todos;

    if(filter==='completed'){
        res.json(filterList.filter(target => target.completed));
    }
    else if(filter==='active'){
        res.json(filterList.filter(target => !target.completed));
    }
    else{
        res.json(filterList);
    }
    console.log(filterList);
});

// UPDATE a todo by ID
app.put('/todos/:id', (req, res) => {
    const { content, completed } = req.body;
    const todo = todos.find(t => t.id === parseInt(req.params.id));
    if (todo) {
        todo.content = content ?? todo.content;
        todo.completed = completed ?? todo.completed;
        res.json(todo);
    } else {
        res.status(404).json({ message: 'Todo not found' });
    }
});

// DELETE a todo by ID
app.delete('/todos/:id', (req, res) => {
    const index = todos.findIndex(t => t.id === parseInt(req.params.id));
    if (index !== -1) {
        todos.splice(index, 1);
        res.status(204).end();
    } else {
        res.status(404).json({ message: 'Todo not found' });
    }
    console.log(todos);
});

// DELETE all completed todo
app.delete('/todos/clear-completed', (req, res) => {
    for(let todo in todos){
        if(todo.completed){
            const index = todos.findIndex(target => target.id === todo.id);
            if(index !== -1){
                todos.splice(index,1);
                res.status(204).end;
            }
            else{
                res.status(404).json({ message: 'Todo not found' });
            }
        }
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
