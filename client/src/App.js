import React, { useEffect, useState } from 'react';
import Register from './Pages/Register';
import {Routes, Route, Navigate} from 'react-router-dom'
import Dashboard from './Pages/Dashboard';
import Login from './Pages/Login';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import InputTodo from './Pages/InputTodo';

toast.configure()

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  function setAuth(boolean){
    setIsAuthenticated(boolean)
  }
  async function isAuth(){
    try {
      const response = await fetch(
        'http://localhost:5000/verified',{
          method:"GET",
          headers:{token:localStorage.token}
        })
        const parseResponse = await response.json()
        parseResponse === true ? setIsAuthenticated(true): setIsAuthenticated(false)
    } catch (err) {
      console.error(err.message)
    }
  }
  useEffect(()=>{
    isAuth()
  })
  return (
    <div>
      <Routes>
        <Route exact path="/register" element={ !isAuthenticated ? (<Register setAuth={setAuth}/>)
        :(<Navigate to='/login'/>)}/>
        <Route exact path='/login' element={ !isAuthenticated ? (<Login setAuth={setAuth}/>)
        :(<Navigate to='/dashboard'/>)}/>
        <Route exact path='/dashboard' element={ isAuthenticated ? (<Dashboard setAuth={setAuth}/>)
        :(<Navigate to='/login'/>)}/>
        <Route exact path='/todo-list' element={isAuthenticated ? (<InputTodo setAuth={setAuth}/>)
        :(<Navigate to='/login'/>)}/>
      </Routes>
    </div>
  );
}

export default App;
