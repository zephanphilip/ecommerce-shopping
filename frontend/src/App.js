import {BrowserRouter,Route,Routes,Navigate} from 'react-router-dom'

import { useAuthContext } from './hooks/useAuthContext';

//pages and components
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import Admin from './pages/Admin';
import Cart from './pages/Cart';
import ViewBook from './pages/ViewBook';
import RentedBooks from './pages/RentedBooks';
import Profile from './pages/Profile';




function App() {

  const { user } =useAuthContext()

  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
      <div className="pages">
        <Routes>
        <Route
         path='/'
        element={user ? (user.role !== 'admin' ? <Home /> : <Navigate to="/admin" />) : <Navigate to="/login" />}
          />
          <Route
           path='/login'
           element={!user ? <Login /> : <Navigate to="/"/>}
          /> 
          <Route
          path='/admin'
          element={user && user.role === 'admin' ? <Admin /> : <Navigate to="/login" />}
          />
          <Route
           path='/signup'
           element={!user ? <Signup /> : <Navigate to="/"/>}
          />
          <Route
              path='/cart'
              element={user ? <Cart /> : <Navigate to="/login" />}
            />
             <Route
              path='/profile'
              element={user ? <Profile /> : <Navigate to="/login" />}
            />
            <Route
            path='/viewbook/:id'
            element = {user ? <ViewBook /> : <Navigate to='/login'/>}/>
            <Route path="/rented-books" element={user ?<RentedBooks />: <Navigate to='/login'/>} />
        </Routes>
      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
