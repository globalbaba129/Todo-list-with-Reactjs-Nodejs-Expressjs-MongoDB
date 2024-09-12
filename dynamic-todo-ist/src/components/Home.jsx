import "./Home.css";
import Create from "./Create";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaCheckCircle, FaTrash } from "react-icons/fa";

const Home = () => {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        // Function to fetch todos
        const fetchTodos = () => {
            axios.get('http://localhost:5000/api/fetch_todo_list')
                .then(res => setTodos(res.data))
                .catch(err => console.error(err));
        };

        // Fetch data on component mount
        fetchTodos();

        // Set up polling
        const intervalId = setInterval(fetchTodos, 1000); // Fetch data every 5 seconds


    }, []);

    const handleEdit = (id) => {
        axios.patch(`http://localhost:5000/api/update_todo_list/${id}`)
            .then(res => {
                setTodos(todos.map(todo =>
                    todo._id === id ? { ...todo, done: !todo.done } : todo
                ));
            })
            .catch(err => console.error(err));
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:5000/api/delete_todo_list/${id}`)
            .then(res => {
                setTodos(todos.filter(todo => todo._id !== id));
            })
            .catch(err => console.error(err));
    };

    return (
        <>
            <h1>Dynamic Todo List</h1>
            <Create />
            {
                todos.length === 0 ? (
                    <h1>No Record Found</h1>
                ) : (
                    <ul className="todo-list">
                        {todos.map(todo => (
                            <li key={todo._id} className="task">
                                <div className="task-item" onClick={() => handleEdit(todo._id)}>
                                    <FaCheckCircle className={`todo-icon ${todo.done ? 'checked' : ''}`} />
                                    <p className={todo.done ? "task-text completed" : "task-text"}>{todo.task}</p>
                                </div>
                                <button className="delete-button" onClick={(e) => { e.stopPropagation(); handleDelete(todo._id); }}>
                                    <FaTrash />
                                </button>
                            </li>
                        ))}
                    </ul>
                )
            }
        </>
    );
};

export default Home;
