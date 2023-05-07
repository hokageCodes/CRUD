import { useState, useEffect } from 'react';
import { getAllTodos, createTodo, updateTodo, deleteTodo } from '../api';
import { useAuth } from '../Provider/AuthProvider';

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const { currentUser, error, setError } = useAuth();

    const loadTodos = async () => {
        try {
            const todos = await getAllTodos();
            setTodos(todos);
        } catch (error) {
            console.log(error);
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

    const handleUpdateTodo = async (id, title, description) => {
        try {
            const updatedTodo = await updateTodo(id, title, description);
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
        <div>
        <h1>My To-Do List</h1>
        <form onSubmit={handleCreateTodo}>
            <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
            />
            <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            required
            />
            <button type="submit">Add</button>
        </form>
        <ul>
            {todos.map((todo) => (
            <li key={todo._id}>
                <input
                type="text"
                value={todo.title}
                onChange={(event) =>
                    handleUpdateTodo(todo._id, event.target.value, todo.description)
                }
                required
                />
                <input
                type="text"
                value={todo.description}
                onChange={(event) =>
                    handleUpdateTodo(todo._id, todo.title, event.target.value)
                }
                required
                />
                <button onClick={() => handleDeleteTodo(todo._id)}>Delete</button>
            </li>
            ))}
        </ul>
        </div>
    );
};

export default TodoList;
