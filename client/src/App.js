import './App.css';
import { BrowserRouter,Routes,Route} from 'react-router-dom';
import PrivateRoute from './components/Routing/PrivateRoute';

import PrivateScreen from './screens/PrivateScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import ResetPasswordScreen from './screens/resetPasswordScreen';
import CreateEvents from './screens/createEvents';
import Eachevents from './screens/Eachevents';
import Navbar from './components/DesignComp/Navbar';
import NotFound from './screens/NotFound';
import Footer from './components/DesignComp/Footer';
import About from './screens/About';
// import Invite from './screens/Invite';
import Myinvite from './screens/Myinvite';

function App() {
  return (
      <BrowserRouter>
         <div className="app">
         <Navbar/>
          <Routes>
          {/* <PrivateRoute exact path="/" element={<PrivateScreen/>}/> */}
          <Route exact path="/" element={<PrivateScreen/>}></Route>
          <Route exact path="/login" element={<LoginScreen/>}></Route>
          {/* register */}
          <Route exact path="/register" element={<RegisterScreen/>} ></Route>
          <Route exact path="/forgetPassword" element={<ForgotPasswordScreen/>}></Route>
          <Route exact path="/resetPassword/:resetToken" element={<ResetPasswordScreen/>}></Route>
          <Route exact path="/createEvents" element={<CreateEvents/>}></Route>
          <Route exact path="/events/:_id" element={<Eachevents/>}></Route>
          <Route exact path="/about" element={<About/>}></Route>
          {/* <Route exact path="/invite" element={<Invite/>}></Route> */}
          <Route exact path="/invitation" element={<Myinvite/>}></Route>
          <Route  path="*" element={<NotFound/>}></Route>
          
          </Routes>
          <Footer/>
         </div>
      </BrowserRouter>
  );
}

export default App;
