import React from 'react';
import {createUserWithEmailAndPassword} from 'firebase/auth'
import {auth} from '../firebase-config'
import Axios from 'axios'
const Login = () => {

  const [register,setRegister] = React.useState({
    email:'',
    password:''
  })
  const registerUser=async()=>{
   try {
     const {user} = await createUserWithEmailAndPassword(auth , register.email,register.password)
     console.log(user)

    //  request storing uid and other data to the db
    const response = await Axios.post('http://localhost:3001/auth/register', {
      uid:user.uid,
      email:user.email
    })
    console.log(response.data)
   } catch (error) {
    console.log(error.message)
   }
  }
  return (
    <div className='h-full'>
      <p>register</p>
      <input className='sample' type="text" placeholder='email' onChange={(e)=>setRegister({
        ...register,
        email: e.target.value
      })}/>
      <input  className='sample ml-2' type="password" name="" id="" placeholder='password'  onChange={(e)=>setRegister({
        ...register,
        password: e.target.value
      })}/>
      <button className='sample ml-2 p-1' onClick={registerUser}>login</button>
    </div>
  );
}

export default Login;
