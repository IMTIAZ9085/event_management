import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Posts from './Posts';
import {useNavigate} from 'react-router-dom';

const Myinvite = () => {

  const navigate = useNavigate();
  if(!localStorage.getItem("authToken")){
    navigate("/login"); 
}
      const [loading,setLoading]= useState(false);
      const [Users,setUsers] = useState([[]]);

      const [privateData,setprivateData] = useState({});
      const [error,setError] = useState("");
    
    
     //FETCHING PRIVATE DATA FROM DATABASE
//      useEffect(() =>{
//       // console.log(state);
//       const fetchPrivateData2 = async()=>{
//             const config = {
//                   headers: {
//                         "Content-Type":"application/json",
//                         Authorization:`Bearer ${localStorage.getItem("authToken")}`
//                   }
//             } 
//             try{  
//       // dispatch({type:"LOGIN_START"});
//                   const data= await axios.get("/api/private",config);
//                   //  await dispatch({type:"LOGIN_SUCCESS",payload:data});
//                   // console.log(data.data.user.email);
//                   // console.log(data.data.user);
//                   setprivateData(data.data.user);
//                   console.log(privateData);
//             }catch(e){
//                   localStorage.removeItem("authToken"); 
//                   setError("Unauthorized Access");
//             } 
//       }      
//         fetchPrivateData2(); 
// },[navigate]);


// const fetchPrivateData2 = async()=>{
//               const config = {
//                     headers: {
//                           "Content-Type":"application/json",
//                           Authorization:`Bearer ${localStorage.getItem("authToken")}`
//                     }
//               } 
//               try{  
//                     const data= await axios.get("/api/private",config);
//                     setprivateData(data.data.user);
//                     console.log(privateData);
//               }catch(e){
//                     localStorage.removeItem("authToken"); 
//                     setError("Unauthorized Access");
//               } 
//         } 
  
  
       
//           fetchPrivateData2(); 







      useEffect(() =>{

            const fetchInviteData = async() =>{
              const config = {
                headers: {
                      "Content-Type":"application/json",
                      Authorization:`Bearer ${localStorage.getItem("authToken")}`
                }
          }  
              try{
                const data= await axios.get("/api/private",config);
                setprivateData(data.data.user);
                // console.log(data.data.user);
              setLoading(true);
              // const vk = privateData._id;
              // console.log(vk);
               const result = await axios.get("/api/event/myinvitation/"+data.data.user._id);
              //  console.log(result);
               setUsers(result.data);
               setLoading(false); 
              //  console.log(Users); 
              }catch(e){
                console.log(e.message);
              } 
          }; 

          fetchInviteData(); 
          },[]);
          
  return (
    <>
 <div className="container">
    <h2 className="ivheading text-danger">MY INVITATION</h2>
    <div className='mt-5'>
    <Posts posts={Users} loading={loading} isinvite={true}/>
    </div>
</div>
    </>
  )
}

export default Myinvite;