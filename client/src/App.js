import {Routes , Route, Switch} from 'react-router-dom'
import Home from './pages/Home';
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from './components/Routes/ProtectedRoute';
import PublicRoute from './components/Routes/PublicRoute';
import Donar from './pages/Dashboard/Donar';
import DonorDetails from './pages/Dashboard/DonorDetails';


function App() {
  return (
    <>
    <ToastContainer/>
      <Routes>
        
        <Route path="/" element={<ProtectedRoute> <Home/> </ProtectedRoute>} />
        <Route path="/login" element={<PublicRoute> <Login/> </PublicRoute>}  />
        <Route path="/Signup" element={<PublicRoute> <Signup/> </PublicRoute>} />
        <Route path="/donor" element={<ProtectedRoute> <Donar/> </ProtectedRoute>} />
      
       
        <Route path="/donar/:id" component={DonorDetails} />
      
      
      </Routes>
    </>
  );
}

export default App;
