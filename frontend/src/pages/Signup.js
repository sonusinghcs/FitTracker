import React,{useState} from 'react'
import { useSignup } from '../hooks/useSignup'
function Signup() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { signup , error,isloading} = useSignup()
    const handleSubmit = async (e)=>{
        e.preventDefault()
        
        await signup(email,password)
 
    }
  return (
    <form className='signup' onSubmit={handleSubmit}>
        <h3>Sign up</h3>
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
        <button disabled={isloading}>Sign up</button>
        {error && <div className='error'>{error}</div>}
    </form>
  )
}

export default Signup