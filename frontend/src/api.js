const API_BASE_URL = 'http://localhost:5000/api/todos';

const getToken = () => {
    const token = localStorage.getItem('authToken');
    if (token) {
        return `Bearer ${token}`;
    } else {
        return '';
    }
};

export const getAllTodos = async () => {
    const response = await fetch(`${API_BASE_URL}`, {
        headers: {
            Authorization: getToken(),
        },
    });
    if (response.ok) {
        return await response.json();
    } else {
        throw new Error('Error retrieving todos');
    }
};

export const createTodo = async (title, description) => {
    const response = await fetch(`${API_BASE_URL}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: getToken(),
        },
        body: JSON.stringify({
            title,
            description,
        }),
    });
    if (response.ok) {
        return await response.json();
    } else {
        throw new Error('Error creating todo');
    }
};

export const updateTodo = async (id, title, description) => {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: getToken(),
        },
        body: JSON.stringify({
            title,
            description,
        }),
    });
    if (response.ok) {
        return await response.json();
    } else {
        throw new Error('Error updating todo');
    }
};

export const deleteTodo = async (id) => {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: getToken(),
        },
    });
    if (!response.ok) {
        throw new Error('Error deleting todo');
    }
};
