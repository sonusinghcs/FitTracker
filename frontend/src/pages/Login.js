import React,{useState} from 'react'
import {useLogin} from '../hooks/useLogin'

function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const {login, error,isloading} = useLogin()
    const handleSubmit = async (e)=>{
        e.preventDefault()
        await login(email, password)
 
    }
  return (
    <form className='login' onSubmit={handleSubmit}>
        <h3>Login</h3>
        <label >Email</label>
        <input
         type='email' placeholder='Email' 
         value={email} 
         onChange={(e)=>setEmail(e.target.value)}
         required/>
        <label >Password</label>
        <input 
        type="paasword" 
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        />
        <button disabled={isloading}>login</button>
        {error && <div className='error'>{error}</div>}
    </form>
  )
}

export default Login