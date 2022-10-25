import {useState,useEffect, useContext} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import Event from './Event';

const CreateEvents = () => {
  const navigate = useNavigate();

  const [privateData,setprivateData] = useState({});
  const [error,setError] = useState("");

      const [Input, setInput] = useState({
            event_name:"",
            email:"", 
            description:"", 
            Start_date:"",
            end_date:"",
            event_type:""
       })

       useEffect(()=>{
            if(!localStorage.getItem("authToken")){
                  navigate("/login");
                  // history.push("/");

            }
      },[navigate]);

      useEffect(() =>{
            // console.log(state);
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
                        // console.log(data.data.user);
                        setprivateData(data.data.user);
                        console.log(privateData);
                  }catch(e){
                        localStorage.removeItem("authToken"); 
                        setError("Unauthorized Access");
                  } 
            } 


           
              fetchPrivateData(); 
      },[]);
      
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
      
            const eventData = {
                  event_name:Input.event_name,
                  email:privateData.email,
              description:Input.description,
              Start_date:Input.Start_date,
              end_date:Input.end_date,
              event_type:Input.event_type
            }
      
           try{
           
             const data =await axios.post('api/event/register_Event',eventData);
            console.log(data);
            setInput({
                  event_name:"",
                  email:"",
                  description:"",
                  Start_date:"",
                  end_date:"",
                  event_type:""
            })

            if(data){
            alert('Successfully send data');
            window.location.reload();

      }

             
      }
            catch(e){
                  console.log(e);
            }
      
       }

      return (
            <>
            <div className="container">
            <div className="row">
            <div className="col-12 col-lg-5">
            
            <div className="create_ip">
            <input className="ip_val"  onChange={handleUpdate} name="event_name" value={Input.event_name} placeholder="Event Name"/> 
            {/* <input className="ip_val"  onChange={handleUpdate} name="email" value={Input.email} placeholder="Provide Creator Email"/> */}
            <input  className="ip_val" onChange={handleUpdate} name="description" value={Input.description} placeholder="Description" />
            <input  className="ip_val" type="date" onChange={handleUpdate} name="Start_date" value={Input.Start_date} placeholder="Start Date" />
            <input  className="ip_val" type="date" onChange={handleUpdate} name="end_date" value={Input.end_date} placeholder="End Date" />
            <input  className="ip_val" onChange={handleUpdate} name="event_type" value={Input.event_type} placeholder="Event Type" /> <br /> <br />
      
            <button id="create_btn" className="btn btn-danger" onClick={submitData}>Create Event</button>
            </div>
            </div>
            <div className=" col-12 col-lg-7 mt-3">
            {/* <p>{user}</p> */}
            <Event email={privateData.email}/>
         {/* {console.log(state.username)} */}
            {/* <Event email={user.email}/> */}
            </div> 
            </div>
            </div> 
            </>
  ) 
}

export default CreateEvents;