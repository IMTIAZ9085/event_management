import {useState,useEffect, useContext} from 'react';
import axios from 'axios';
import {Link,useNavigate} from 'react-router-dom';
// import Navbar from '../components/DesignComp/Navbar';
import { AuthContext } from '../context/AuthContext';
import loginCall from '../context/apiCalls'; 

const LoginScreen = ({history}) => {
      // const {user,dispatch} = useContext(AuthContext);
      const {state,setState} = useContext(AuthContext);
      const navigate = useNavigate();
      const [Input, setInput] = useState({
            email:"", 
            password:""
       }) 

      //  useEffect(() =>{
      //       const fetchData2 = async() =>{
      //             try{
      //            console.log(Input.email);
      //              const result = await axios.get('/api/auth/owner/'+Input.email);
      //             dispatch({type:"LOGIN_SUCCESS",payload:result});
      //              console.log(user);
      //             }catch(e){
      //               console.log(e.message);
      //             }
      //         }; 
      //         fetchData2();

      //     },[]);
 
       
       useEffect(()=>{
            if(localStorage.getItem("authToken")){
                  navigate("/");
            }
      },[navigate]);

      const handleUpdate=async(event)=>{
       const {name,value} = event.target;
       setInput(previnput=>{
        return{
         ...previnput,
         [name]:value 
        }
       })
       }
      
       const submitData=async(event)=>{
            event.preventDefault();
            // console.log(Input);
      
            const userData = {
                  email:Input.email,
                  password:Input.password
            } 
       
           try{
            // loginCall(userData.email,dispatch);
            // console.log(user);
            const result = await axios.get('/api/auth/owner/'+userData.email);
            setState(result.data.user); 
            console.log(result);
            console.log(state); 
             const {data} =await axios.post('api/auth/login',userData);
            //  dispatch({type:"LOGIN_SUCCESS",payload:{data}});
            console.log(Input.email);

            // console.log(result.data.user);
      //      await dispatch({type:"LOGIN_SUCCESS",payload:result.data.user});
            // console.log(user);
            // console.log(data);

             localStorage.setItem("authToken",data.token);
      //      console.log(user); 
             navigate("/");
            // console.log(data); 
            setInput({
                  email:"",
                  password:"",
            })

            if(data){
            alert('Successfully send data');}

             
      }
            catch(e){
                  console.log(e);
            }
      
       }

      return (<>
      {/* <div className="main" style={{display: 'flex',flexDirection: 'row'}}> */}
           {/* <div className="login_ip2">
           </div> */}

            <div className="login_ip" style={{display: 'flex',flexDirection: 'row'}}>
            <div className="container log-element">
            <div className="row">
            <div className="col-12 col-lg-7">
            <img id="login-image" style={{height: '30rem',width: '40rem'}} src="ev1.jpg" alt="event"/>
            </div>
            <div className="col-12 col-lg-5">
            <div className="login_div">
            <h2>LOGIN PAGE</h2>
            <input  className="ip_val" type="email" onChange={handleUpdate} name="email" value={Input.email} placeholder="email" />
            <br/>
            <br/>
            <input  className="ip_val" type="password" onChange={handleUpdate} name="password" value={Input.password} placeholder="password" />
            <br /> <br/>
            <button id="ip_btn" className="btn btn-danger" onClick={submitData}>SIGNIN</button> <br/>

            <span>Don't have an account ? <Link style={{textDecoration:"none"}} to="/register">Register</Link></span>
            <br/>
            <span>Forget Password ? <Link style={{textDecoration:"none"}} to="/forgetPassword">Forget Password</Link></span>
            </div>
            </div>
                   
            </div>
            </div>
            </div>
            {/* </div> */}
            </>
  )
}

export default LoginScreen;