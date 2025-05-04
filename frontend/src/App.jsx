import {Routes, Route, Navigate} from "react-router-dom";
import SignUp from "./components/SignUp";
import Login from "./components/Login"
import VerificationEmailPage from "./components/EmailVerification";
import { Toaster } from "@/components/ui/sonner"
import Todo from "./components/Todo"
import { useAuthStore } from "./store/authStore";


const ProtectRoute = ({children}) => {
  const{isAuthenticated, user} = useAuthStore();
  if(!isAuthenticated && !user){
    return <Navigate to = "/login" replace/>
  }

  return children;
}



function App() {
 
  return (
    <div>
      <Routes>
        <Route path="/" element={<ProtectRoute><Todo/></ProtectRoute>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/verifyEmail" element={<VerificationEmailPage/>}/>
      </Routes>
      <Toaster/>
    </div>
  )
}

export default App
