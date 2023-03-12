import {
  BrowserRouter, Route, Routes
} from "react-router-dom";
import EmailVerify from "./pages/EmailVerify/EmailVerify";
import ForgotPassword from "./pages/forgotpassword/Forgotpassword";
import Home from "./pages/home/Home";
import List from "./pages/list/List";
import Login from "./pages/login/Login";
import PasswordReset from "./pages/passwordreset/Passwordreset";
import Register from "./pages/register/Register";
import Single from "./pages/single/Single";
function App() {
  return (
    <BrowserRouter>
    <Routes>
     <Route path="/" element={<Home/>}/>
     <Route path="/hotels" element={<List/>}/>
     <Route path="/hotels/:id" element={<Single/>}/>
     <Route path="/register" element={<Register/>}/>
     <Route path="/login" element={<Login/>}/>
     <Route path="/auth/:id/verify/:token" element={<EmailVerify/>}/>
     <Route path="/forgot-password" element={<ForgotPassword/>}/>
     <Route path="/password-reset/:id/:token" element={<PasswordReset />} />
     </Routes>
    </BrowserRouter>
  );
}

export default App;
