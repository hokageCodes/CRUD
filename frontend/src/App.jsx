import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/HomePage';
import SignupPage from './components/Signup';
import Login from './components/Login';
// import Navbar from './components/Navbar';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/signup" element={<SignupPage />} />
        <Route exact path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
