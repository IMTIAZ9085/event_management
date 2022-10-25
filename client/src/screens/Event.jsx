import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import Pagination from './Pagination';
import Posts from './Posts';
const Event = (props) => {
const {email} = props;
const [events,setEvents] = useState([]);
const [loading,setLoading]= useState(false);
const [currentPage,setCurrentPage] = useState(1);
const [postsPerPage,setPostPerPage] = useState(4);
     //FETCHING PRODUCT DATA FROM THE API
  useEffect(() =>{
      const fetchData = async() =>{
        try{
      // console.log("here nwo")
        setLoading(true);
         const result = await axios.get('/api/event/events');
         setEvents(result.data);
         setLoading(false);
        //  console.log(result.data[0].event_name);
        }catch(e){
          console.log(e.message);
        }
       
        // console.log(result);
        // console.log(products);
    };
     fetchData();
    },[]);
   
  
    //filtering the user particular events
    const posts = events.filter((e) => e.email===email);
      //sorting my post data by date

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost,indexOfLastPost);


    //SPRTING OUR EVENT BY DATE
    function byDate(a,b){
      return new Date(a.Start_date).valueOf()-new Date(b.Start_date).valueOf();
      }
     
    const SortingEvent=()=>{
      currentPosts.sort(byDate);
      console.log(posts[0].Start_date);
    }
//  function byDate(a,b){
//   if(a.Start_date<b.Start_date)
//     return 1;
//     else
//     return 0;
//  }
  
    //change current page
    const paginate=(pageNumber)=>{
      setCurrentPage(pageNumber);
    }
  return (
    <div>
      {/* <h2 style={{marginLeft:"32rem"}}>MY EVENTS</h2> */}
      {/* {
        posts.length>0 ? (<button onClick={SortingEvent} style={{marginLeft:"32rem",marginBottom:"1rem"}} className="btn btn-primary sort">SORT EVENTS BY DATE</button>):
        (<h2>NO EVENT CREATED YET</h2>)
      } */}
      {
        posts.length>0 ? (<Posts style={{marginLeft:"1rem"}} posts={currentPosts} isupdate={false} loading={loading}/>
):
        (<h2>NO EVENT CREATED YET</h2>)
      }

      <div className="pagin" >
      <Pagination postsPerPage={postsPerPage} totalPosts={posts.length} paginate={paginate}/>
    </div>
    </div>
  )
}

export default Event;