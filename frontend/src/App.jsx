import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Login from './components/Login';
import Signup from './components/Signup';
import TodoList from './components/TodoList';

function App() {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <Router>
      <Routes>
        <Route
          path='/login'
          element={user ? <Navigate to="/" /> : <Login login={login} />}
        />
        <Route
          path='/signup'
          element={user ? <Navigate to="/" /> : <Signup login={login} />}
        />
        <Route
          path='/'
          element={user ? <TodoList user={user} logout={logout} /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
