import {useState,useEffect, useContext} from 'react'
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import Event from './Event';
import { AuthContext } from '../context/AuthContext';

const PrivateScreen = () => {
      // const {user,dispatch} = useContext(AuthContext);
      const {state} = useContext(AuthContext);
 
      const navigate = useNavigate();

      if(!localStorage.getItem("authToken")){
            navigate("/login"); 
      }
      // const navigate = useNavigate();
      const [error,setError] = useState("");
      const [privateData,setprivateData] = useState({});

      useEffect(() =>{
            console.log(state);
            const fetchPrivateData = async()=>{
                  const config = {
                        headers: {
                              "Content-Type":"application/json",
                              Authorization:`Bearer ${localStorage.getItem("authToken")}`
                        }
                  } 
                  try{  
            // dispatch({type:"LOGIN_START"});
                        const data= await axios.get("/api/private",config);
                        //  await dispatch({type:"LOGIN_SUCCESS",payload:data});
                        // console.log(data.data.user.email);
                        setprivateData(data.data.user);
                        console.log(privateData);
                  }catch(e){
                        localStorage.removeItem("authToken"); 
                        setError("Unauthorized Access");
                  } 
            } 


           
              fetchPrivateData(); 
      },[]);


      const logoutHandler =async()=>{ 
            localStorage.removeItem("authToken");
            navigate("/login");
      }

      return (
      <div className="privateData">
         {
            error?( 
              <span className="error-message">{error}</span>
            ) : (
                  <>
                  <div className="image-parent">
                  <div className="image-content">
                  
                  <h1>Welcome <span className="text-danger" id="myname">{privateData.username}</span></h1>
                  <p>Your Email id is <span className="text-danger" id="myemail">{privateData.email}</span></p>
                  <span>
                  lorem ipsum dolor sit amet, consectetur adip
                        lorem ipsu lorem ipsum dolor sit amet, consectetur adip <br />
                        lorem ipsum lorem ipsum dolor sit amet,  <br /> consectetur adip
                        lorem ipsum lorem ipsum dolor sit amet, consectetur adip
                        lorem ipsum
                         
                  </span>

      </div>
                        <div className="img">
                              <img src="img1.jpg" alt="background-img" />
                             

                        </div>
                        <div className="img-overlay"></div>
                  </div>
                  
                  {/* <div style={{marginLeft:"28rem"}} id="user-details">
                              <h1>Welcome {privateData.username}</h1>
                              <p>Your Email id is {privateData.email}</p>
                        </div> */}
                        
                        <Event email={privateData.email}/>
                        <button className="btn btn-danger logout" style={{marginLeft:"35rem",height:"3rem",width:"9rem",marginTop:"2rem",marginBottom:"5rem"}} onClick={logoutHandler}>Logout</button>
                  </>
            )
         }
      </div>

  )
}

export default PrivateScreen;