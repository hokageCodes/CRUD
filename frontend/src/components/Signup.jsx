import {  useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css'
import { useAuth } from '../Provider/AuthProvider';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
const { signup } = useAuth()
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(email, password, name)
    if(email && password && name){
    await signup(email, password, name);
    }else{
      console.log(email, password,name);
    }
    } catch (err) {
      setError(err.response.data.error);
    }
  };
  // useEffect(() =>{
  //   logout();
  // })

  return (
    <div>
      <h2>Signup</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Signup</button>
      </form>
      <p>
        Already have an account? <Link to="/">Login</Link>
      </p>
    </div>
  );
};

export default SignupPage;
