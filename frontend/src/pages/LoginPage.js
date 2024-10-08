import {useContext, useState} from "react";
import {Navigate} from "react-router-dom";
import {UserContext} from "../UserContext";
//import * as dotenv from('dotenv');
import axios from "axios";
const BASE_URL='https://quill-app-backend.onrender.com';

export default function LoginPage() {
  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');
  const [redirect,setRedirect] = useState(false);
  const {setUserInfo} = useContext(UserContext);
  async function login(ev) {
    ev.preventDefault();
    const response = await axios.post(`${BASE_URL}/login`, 
      { username, password },
      { 
        headers: { 'Content-Type': 'application/json' }, 
        withCredentials: true, 
      }
    );
    
    if (response.data?.id) {
      console.log("Respones",response.data);
      let userInfo=response.data
      //response.data.json().then(userInfo => {
        //console.log("User Info", userInfo);
      if(userInfo){
        setUserInfo(userInfo);
        setRedirect(true);
      }
      //});
    } else {
      alert('wrong credentials');
    }
  }

  if (redirect) {
    return <Navigate to={'/'} />
  }
  return (
    <form className="login" onSubmit={login}>
      <h1>Login</h1>
      <input type="text"
             placeholder="username"
             value={username}
             onChange={ev => setUsername(ev.target.value)}/>
      <input type="password"
             placeholder="password"
             value={password}
             onChange={ev => setPassword(ev.target.value)}/>
      <button>Login</button>
    </form>
  );
}
