import {
  BrowserRouter, Route, Routes
} from "react-router-dom";
import Admin from "./pages/admin/Admin";
import EmailVerify from "./pages/EmailVerify/EmailVerify";
import ForgotPassword from "./pages/forgotpassword/Forgotpassword";
import Home from "./pages/home/Home";
import List from "./pages/list/List";
import ListProperty from "./pages/listproperty/ListProperty";
import Login from "./pages/login/Login";
import PasswordReset from "./pages/passwordreset/Passwordreset";
import Profile from "./pages/profile/Profile";
import Hotels from "./pages/property/Hotels";
import Property from "./pages/property/Property";
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
     <Route path="/profile/:id" element={<Profile/>} />
     <Route path="/property/:type" element={<Property/>} />
     <Route path="/property/hotels/:id" element={<Hotels/>} />
     <Route path="/listproperty" element={<ListProperty/>} />
     <Route path="/admin" element={<Admin/>} />
     </Routes>
    </BrowserRouter>
  );
}

export default App;