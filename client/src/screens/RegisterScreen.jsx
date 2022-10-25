import {useState,useEffect} from 'react';
import axios from 'axios';
import {Link,useNavigate} from 'react-router-dom';
// import {Link} from 'react-router-dom';

const RegisterScreen = ({history}) => {
  const navigate = useNavigate();
      const [Input, setInput] = useState({
            name:"",
            email:"",
            password:""
            // c_password:"",
       })

       useEffect(()=>{
            if(localStorage.getItem("authToken")){
                  navigate("/");
                  // history.push("/");
                
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
                  username:Input.name,
                  email:Input.email,
                  password:Input.password
                  // c_password:Input.c_password,
            }
      
           try{
           
             const {data} =await axios.post('api/auth/register',userData);
             localStorage.setItem("authToken",data.token);
             navigate("/");
            // history.push("/");
            console.log(data);
            setInput({
                  name:"",
                  email:"",
                  password:"",
            })

            if(data){
            alert('Successfully send data');
          navigate("/login");      
      }

             
      }
            catch(e){
                  console.log(e);
            }
      
       }

      return (<>
            <div className="register_ip">
             <h3>REGISTER PAGE</h3>
            <input className="ip_val"  onChange={handleUpdate} name="name" value={Input.name} placeholder="name"/> <br /> <br />
            <input  className="ip_val" onChange={handleUpdate} name="email" value={Input.email} placeholder="email" /> <br /> <br />
            <input  className="ip_val" onChange={handleUpdate} name="password" value={Input.password} placeholder="password" /> <br /> <br />
            {/* <input  className="ip_val" onChange={handleUpdate} name="c_password" value={Input.c_password} placeholder="conform password" /> */}
            <button id="ip_btn" className="btn btn-danger" onClick={submitData}>SIGNUP</button> <br /> <br/>
            <span>Already have an account ? <Link style={{textDecoration:"none"}} to="/login">Login</Link></span>
            </div>
            </>
  )
}

export default RegisterScreen;