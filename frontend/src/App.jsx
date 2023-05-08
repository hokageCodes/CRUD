import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/HomePage';
import SignupPage from './components/signup/Signup';
import Login from './components/login/Login';
import { AuthProvider } from './Provider/AuthProvider';
// import Navbar from './components/Navbar';

const App = () => {
  return (

    <Router>
          <AuthProvider>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/signup" element={<SignupPage />} />
        <Route exact path="/login" element={<Login />} />
      </Routes>
    </AuthProvider>

    </Router>

  );
};

export default App;
