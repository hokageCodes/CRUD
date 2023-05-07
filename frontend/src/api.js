const API_BASE_URL = 'https://crud-production-6abd.up.railway.app';
import axios from 'axios';

const getToken = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user.token) {
        return `Bearer ${user.token}`;
    } else {
        return '';
    }
};

export const loginUser  = async (email, password) => { 

    try {
            const response = await axios.post(`${API_BASE_URL}/api/auth/login`, {
            email,
            password,
        });

        return {data: response.data};
        } catch (err) {
        return {error: err.response.data.error};
        }
}

export const registerUser= async (email, password, name) => {
    console.log(email, password, name)
    try {
        const response = await axios.post(`${API_BASE_URL}/api/auth/signup`, {
            email,
            password,
            name
        },
    );

        console.log(response?.data);
        if(response.data)
        return {data: response.data};

        return {error: response.error};
        } catch (err) {
        return {error: err.response.data.error};
        }
}

export const getAllTodos = async () => {
   try{
    const response = await fetch(`${API_BASE_URL}/api/todos`, {
        headers: {
            Authorization: getToken(),
        },
    });
    if (response.ok) {
        return await response.json();
    } else {
        throw new Error('Error retrieving todos');
    }
}catch(error) {
    console.log(JSON.stringify(error));
    throw new Error('Error retrieving todos');
}
};

export const createTodo = async (title, description) => {
    const response = await fetch(`${API_BASE_URL}/api/todos`, {
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
    const response = await fetch(`${API_BASE_URL}/api/todos/${id}`, {
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
    const response = await fetch(`${API_BASE_URL}/api/todos/${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: getToken(),
        },
    });
    if (!response.ok) {
        throw new Error('Error deleting todo');
    }
};
