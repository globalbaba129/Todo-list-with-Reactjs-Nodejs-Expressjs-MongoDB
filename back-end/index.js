import TaskData from "./model/todoModel.js";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

const app = express();
app.use(cors());
dotenv.config(); // Corrected method

const db_url = process.env.DB_URL; // Ensure this variable matches the key in your .env file

mongoose.connect(db_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Database connected successfully'))
    .catch((error) => console.error('Database connection failed:', error));

// Middleware to parse JSON request bodies
app.use(express.json());

// Todo list API: Create a new todo item
app.post('/api/add_todo_list', (req, res) => {
    const tasks = req.body.task; // Assuming task is sent in the request body

    TaskData.create({
        task: tasks
    })
        .then(result => res.json(result))
        .catch(err => res.status(500).json({ error: err.message }));
});

// Todo list API: fetch all todo items
app.get('/api/fetch_todo_list', (req, res) => {
    TaskData.find()
        .then(result => res.json(result))
        .catch(err => res.status(500).json({ error: err.message }));
});

// Todo list API: update one todo item
app.patch('/api/update_todo_list/:id', (req, res) => {
    const { id } = req.params;
    TaskData.findById(id)
        .then(todo => {
            if (todo) {
                todo.done = !todo.done; // Toggle the completion status
                return todo.save();
            }
            res.status(404).json({ error: "Todo not found" });
        })
        .then(updatedTodo => res.json(updatedTodo))
        .catch(err => res.status(500).json({ error: err.message }));
});

// Todo list API: delete one todo item
app.delete('/api/delete_todo_list/:id', (req, res) => {
    const { id } = req.params;
    TaskData.findByIdAndDelete(id)
        .then(result => {
            if (result) {
                res.json({ message: "Todo deleted successfully" });
            } else {
                res.status(404).json({ error: "Todo not found" });
            }
        })
        .catch(err => res.status(500).json({ error: err.message }));
});

app.listen(5000, () => {
    console.log('Server is up on http://localhost:5000/');
});
