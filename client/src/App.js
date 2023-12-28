import {Routes , Route} from 'react-router-dom'
import Home from './pages/Home';
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from './components/Routes/ProtectedRoute';
import PublicRoute from './components/Routes/PublicRoute';

function App() {
  return (
    <>
    <ToastContainer/>
      <Routes>
        <Route
         path="/"
          element={

            <ProtectedRoute>
            <Home/>
           </ProtectedRoute>
          }
          />


        <Route path="/login" element={
          <PublicRoute>
        <Login/>
        </PublicRoute>}
         />
        <Route path="/Register" element={
        <PublicRoute>

          <Register/>
        </PublicRoute>
      
        } 
        />
      </Routes>
    </>
  );
}

export default App;
