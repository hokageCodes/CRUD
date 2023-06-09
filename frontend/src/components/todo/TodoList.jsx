import { useState, useEffect } from 'react';
import { getAllTodos, createTodo, updateTodo, deleteTodo } from '../../api';
import { useAuth } from '../../Provider/AuthProvider';

import './todo.css';

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const { currentUser } = useAuth();

    const loadTodos = async () => {
        try {
            const todos = await getAllTodos(currentUser.id);
            setTodos(todos);
        } catch (error) {
            // console.log(error);
        }
    };

    useEffect(() => {
        loadTodos();
    }, []);

    const handleCreateTodo = async (event) => {
        event.preventDefault();
        try {
            console.log(title, description, currentUser.id);
            const newTodo = await createTodo(title, description, currentUser.id);
            setTodos([...todos, newTodo]);
            setTitle('');
            setDescription('');
        } catch (error) {
            console.log(error);
        }
    };
    const handleUpdateTodo = async (id, value, field) => {
        try {
            const updatedTodo = {
                ...todos.find((todo) => todo._id === id),
                [field]: value,
            };
            await updateTodo(id, updatedTodo.title, updatedTodo.description);
            const updatedTodos = todos.map((todo) =>
                todo._id === updatedTodo._id ? updatedTodo : todo
            );
            setTodos(updatedTodos);
        } catch (error) {
            console.log(error);
        }
    };
    

    const handleDeleteTodo = async (id) => {
        try {
        await deleteTodo(id);
            const updatedTodos = todos.filter((todo) => todo._id !== id);
            setTodos(updatedTodos);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="todolist-container">
        <h1 className="todolist-title">My To-Do List</h1>
        <form className="todolist-form" onSubmit={handleCreateTodo}>
            <input
                type="text"
                placeholder="Title"
                className="todolist-input"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Description"
                className="todolist-input"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                required
            />
            <button type="submit" className="todolist-btn">Add</button>
        </form>
        <ul className="todolist-list">
            {todos.map((todo) => (
            <li key={todo._id} className="todolist-item">
                <input
                    type="text"
                    value={todo.title}
                    className="todolist-input"
                    onChange={(event) =>
                        handleUpdateTodo(todo._id, event.target.value, todo.description)
                    }
                    required
                />
                <input
                    type="text"
                    value={todo.description}
                    className="todolist-input"
                    onChange={(event) =>
                        handleUpdateTodo(todo._id, todo.title, event.target.value)
                    }
                required
                />
                <button onClick={() => handleDeleteTodo(todo._id)} className="todolist-delete-btn">Delete</button>
            </li>
            ))}
        </ul>
        </div>
    );
};

export default TodoList;
