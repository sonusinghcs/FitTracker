import React from 'react'
import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
function Navbar() {
  const {user} = useAuthContext()
  const {logout} = useLogout()
  const handleclick = () => {
   logout()
  }
  return (
    <header>
        <div className="container">
            <Link to = '/'>
            <h1>Workout Buddy</h1>
            </Link>
            <nav>
              {user &&(<div>
                <span>{user.email}</span>
                <button onClick={handleclick}>Log out</button>
              </div>)}
              {!user && (<div>
                <Link to='/login'> Login</Link>
                <Link to='/signup'> signup</Link>
              </div>)}
            </nav>
        </div>
    </header>
  )
}

export default Navbar