import axios from 'axios';
import React, {useState, useContext, useEffect, useReducer } from 'react'
import {  Link, useNavigate, useParams } from 'react-router-dom';


const Eachevents = () => {
  const [loading,setLoading]= useState(false);
  const [Users,setUsers] = useState([]);
  const navigate = useNavigate();
      if(!localStorage.getItem("authToken")){
        navigate("/login");
  }
      const params = useParams();
      const {_id} = params;
      const [data,setData] = useState({}); 
      useEffect(()=>{
       const fetchData = async()=>{
        try{
            const result = await axios.get(`/api/event/events/${_id}`);
            // if(result) console.log(result);
            setData(result.data);
        }catch(e){
            console.log(e);
        }
       };
       fetchData();
    
      },[_id]);

  //FETCHING ALL USER DATA TO INVITE PEOPLE
     //FETCHING PRODUCT DATA FROM THE API
     useEffect(() =>{
      const fetchData = async() =>{
        try{
      // console.log("here nwo")
        setLoading(true);
         const result = await axios.get('/api/auth/users');
         setUsers(result.data);
         setLoading(false);
         console.log(Users)
        }catch(e){
          console.log(e.message);
        }
    };
     fetchData();
    },[_id]);

  // const inviteHandler=async(req,res)=>{
  //   try{
  //       axios.put(`/api/auth/invited/${Users._id}`,{postid:data._id})
  //   }catch(e){
  //     console.log(e.message);
  //   }
  // }
   function inviteHandler(userid){
    console.log(userid);
    console.log(data._id);
    axios.put("/api/auth/invited/"+userid,{postid:data._id});
        alert("Invited successfully");
    // }catch(e){
    //   console.log(e.message);
    // }
  }

  return (
    <>
     {/* <Navbar/> */}
    {/* <h1>{data.event_name}</h1>
    <h2>{data.description}</h2>
    <h3>{data.email}</h3> */}
    <div className="card w-75 m-auto mt-5 mb-5">
  <div className="card-body text-white">
    <h3 className="card-title text-danger">{data.event_name}</h3>
    <p className="card-text">{data.description}.</p>
    <h5>Start Date: {data.Start_date}</h5>
    <h5>End Date: {data.end_date}</h5>
    {/* <a href="/invite" className="btn btn-danger">Invite</a> */}
    <button className="btn btn-danger" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">Invite</button>

  </div>
</div>



<div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
  <div className="offcanvas-header">
    <h5 id="offcanvasRightLabel">Invite People</h5>
    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div className="offcanvas-body">
  {
    Users.map((user)=>(
      <div className="invite-each d-flex mt-2"  key={user._id}> 
      <h6 className="invite-name" >{user.username}</h6>
      {/* <h3>{user._id}</h3> */}
      <button className="btn btn-danger" onClick={()=>{inviteHandler(user._id)}} style={{marginLeft:"2rem",fontSize:"0.5rem"}}>Invite</button>
      </div>
    ))
  } 
  </div>
</div>

    </>
    
  )
}

export default Eachevents;