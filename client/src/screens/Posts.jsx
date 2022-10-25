import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const Posts = ({posts,loading,isinvite}) => {
  //state for updating the values of the items
const [isPut, setisPut] = useState(false);
const [isupdate,setupdate] = useState(false);
const [updatedItem,setupupdatedItem] = useState({
  event_name:"",
  email:"",
  description:"",
  Start_date:"",
  end_date:"",
  event_type:"",
  id:""
});


//for updatedItem
// function openUpdate(id){
//   setisPut(true);
//   setupupdatedItem(previnput=>{
//     return(
//       {
//         ...previnput,
//         id:id,
//       }
//     )
//   })
// }

async function openUpdate(id){
  try{
    setisPut(true);
    setupdate(true);
    const result = await axios.get(`/api/event/events/${id}`);
    console.log(result.data);
    setupupdatedItem({
      event_name:result.data.event_name,
      email:result.data.email,
      description:result.data.description,
      Start_date:result.data.Start_date,
      end_date:result.data.end_date,
      event_type:result.data.event_type,
      id:id
    });
  }catch(e){
    console.log(e);
  }
 
}


function updateItem(id){
  axios.put("api/event/put/"+id,updatedItem);
  alert("updated successfully");
  setisPut(false);
  window.location.reload();
  // console.log(`updated item id ${id}`);
}

//function for deleting event
function deleteItem(id){
  axios.delete("/api/event/deleteEvent/"+id);
  alert("Delete successfully");
  // setisPut(false);
  window.location.reload();
  // console.log(`updated item id ${id}`);
}


function handleUpdate(event) {
  const {name,value} = event.target;
  setupupdatedItem((previnput)=>{
    return {
        ...previnput,
        [name]:value,
      }
  });
  console.log(updatedItem);
}


  if(loading) {
    return <h3>Loading...</h3>;
  }
  return (
    <>

{
      !isupdate && posts.length>0 ? (<button  style={{marginLeft:"32rem",marginBottom:"1rem"}} className="btn btn-primary sort">SORT EVENTS BY DATE</button>):
        (<><h3>You Got No Invitation</h3></>)
      }

      <div className="main_div">
      
      { isPut?
  (
      <>
  

      <div id="update">
      <h1>UPDATE EVENT</h1>
      <input className="ip_val"  onChange={handleUpdate} name="event_name" value={updatedItem.event_name} placeholder="Event Name"/> <br /><br />
            {/* <input className="ip_val"  onChange={handleUpdate} name="email" value={updatedItem.email} placeholder="Provide Creator Email"/> <br /> <br /> */}
            <input  className="ip_val" onChange={handleUpdate} name="description" value={updatedItem.description} placeholder="Description" /> <br /> <br />
            <input  className="ip_val" type="date" onChange={handleUpdate} name="Start_date" value={updatedItem.Start_date} placeholder="Start Date" /> <br /> <br />
            <input  className="ip_val" type="date" onChange={handleUpdate} name="end_date" value={updatedItem.end_date} placeholder="End Date" />   <br /> <br />
            <input  className="ip_val" onChange={handleUpdate} name="event_type" value={updatedItem.event_type} placeholder="Event Type" /> <br /> <br />
            <button id="ip_btn" className="btn btn-success"onClick={()=>{updateItem(updatedItem.id)}}>UPDATE NOTE</button>
     </div>
     
     </>
     )
     :
     (<>
      {  
            posts.map((event)=>(
              <div className="card text-white mb-3" style={{maxWidth:"18rem"}} key={event._id}>
              <Link style={{textDecoration:"none"}} to={`/events/${event._id}`}>
  <div className="card-header" style={{fontSize:"1.5rem",color:"red"}}>{event.event_name}</div>
  </Link>
  <div className="card-body">
    <h5 className="card-title">{event.description}</h5>
    {/* <p className="card-text">{event.Start_date}</p>
    <p className="card-text">{event.end_date}</p> */}
    Start Date : <p className="card-text">{event.Start_date}</p>
    End Date : <p className="card-text">{event.end_date}</p>
    {
      isinvite?(<></>):(
        <button className="btn btn-danger"onClick={()=>{openUpdate(event._id)}}>Update</button>
      )
    }
    <button style={{marginLeft:"4rem"}} className="btn btn-success"onClick={()=>{deleteItem(event._id)}}>DELETE</button>
  </div>
  </div>
            )
            )
      } </>)}
      </div> 
    </>
  )
}

export default Posts;


  // {/* <div className="event">
  //                 <Link to={`/events/${event._id}`}>
  //                 <h4>{event.event_name}</h4>
  //                 </Link>
  //                 <h5>{event.email}</h5>
  //                 <p>{event.description}</p>
  //                 <button onClick={()=>{openUpdate(event._id)}}>Update</button>
  //                 </div> */}