import './App.css';
import SignUp from './components/SignUp.js';
import SignIn from './components/SignIn';
import ForgotPassword from './components/ForgotPassword';
import PasswordReset from './components/PasswordReset';
import { Routes,Route} from 'react-router-dom';
import {ProtectedRoute} from './components/ProtectedRoute';
import HomePage from './components/HomePage';

function App() {
  return (
    <div className="App">
      <div>
      <Routes>
      <Route path="/" element={<SignIn/>} />
      <Route path="/signup" element={<SignUp/>} />
      <Route path="/forgotpassword" element={<ForgotPassword/>} />

      <Route path="/homepage" element={
        <ProtectedRoute>
      <HomePage/>
      </ProtectedRoute>
      } />
      
      <Route path="/passwordreset" element={<PasswordReset/>} />
    </Routes>
        </div>
    

    </div>
  );
}

export default App;
