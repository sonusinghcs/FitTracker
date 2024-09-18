import {BrowserRouter,Routes,Route,Navigate} from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext';

import Home from './pages/Home';
import Navbar from './Components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  const {user} = useAuthContext()
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />
      <div className="pages">
        <Routes>
          <Route exact path="/" element={user?<Home />:<Navigate to = '/login'/>} />
          <Route
          path='/signup'
          element={!user?<Signup />:<Navigate to='/'/>}
          />
          <Route
          path='/login'
          element={!user?<Login />:<Navigate to = '/'/>}
          />
        </Routes>
        

      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
