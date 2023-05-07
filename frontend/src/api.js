const API_BASE_URL = 'http://localhost:5000/api/todos';
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
              const response = await axios.post('http://localhost:5000/api/auth/login', {
            email,
            password,
        });

        console.log(response.data);
        return {data: response.data};
        } catch (err) {
        return {error: err.response.data.error};
        }
}

export const registerUser= async (email, password, name) => {
    try {
        const response = await fetch('http://localhost:5000/api/auth/signup', {
        method:  'POST',
        body: JSON.stringify({
            email,
            password,
            name
        }),
    },);

        console.log(response.data);
        return {data: response.data};
        } catch (err) {
        return {error: err.response.data.error};
        }
}

export const getAllTodos = async () => {
   try{
    const response = await fetch(`${API_BASE_URL}`, {
        headers: {
            Authorization: getToken(),
        },
    });
    console.log('dd', response.ok)
    if (response.ok) {
        return await response.json();
    } else {
        throw new Error('Error retrieving todos');
    }
}catch(error) {
    console.log(error);
    throw new Error('Error retrieving todos');
}
};

export const createTodo = async (title, description, id) => {
    console.log(id);
    const response = await fetch(`${API_BASE_URL}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: getToken(),
        },
        body: JSON.stringify({
            title,
            description,
            user: id

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
