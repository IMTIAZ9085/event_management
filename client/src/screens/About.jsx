import React from 'react';
import "./about.css";

const About = () => {

      return (
            <>
                  <section className="common-section our-services">

                  <div className="container mb-2">
                    <div className="row">

                    {/* //1st section left side */}
                          <div className="col-12 col-lg-5 text-center leftside-img order-lg-first order-last">
                            <img className="img-fluid abtimg"   style={{height: '25rem', width: '46rem'}} src="login.jpg" alt="aboutimg" />
                          </div>

                     {/* 1st section right side data */}
                     <div className="col-12 col-lg-7 rightside">
                           <h4 className="head1">--Available @ Google Play Store and Apple App Store</h4>
                           <h1 className="main-title">Structure Your Daily Event</h1>
                          
                                    <div className="row our-services-info">
                               <div className="col-11 our-services-data">
                               lorem ipsum dolor sit amet, consectetur adip
                        lorem ipsu lorem ipsum dolor sit amet, consectetur adip <br />
                        lorem ipsum lorem ipsum dolor sit amet,  <br /> consectetur adip
                        lorem ipsum lorem ipsum dolor sit amet, consectetur adip
                               </div>
                           </div>
                         
                           <br />
                           <button className="btn btn-primary learn">Learn More</button>
                     </div>
                    </div>
                  </div>

                  </section>


                  
                  
                  {/* //support section */}
                  <section className="common-section our-services">

<div className="container mb-4">
  <div className="row">

   {/* 1st section right side data */}
   <div className="col-12 col-lg-7 rightside">
         <h4 className="head1">--Support in Any Language</h4>
         <h1 className="main-title">Invite People To Your Event</h1>
  
                  <div className="row our-services-info">
             <div className="col-11 our-services-data">
             lorem ipsum dolor sit amet, consectetur adip
                        lorem ipsu lorem ipsum dolor sit amet, consectetur adip <br />
                        lorem ipsum lorem ipsum dolor sit amet,  <br /> consectetur adip
                        lorem ipsum lorem ipsum dolor sit amet, consectetur adip
             </div>
         </div>
         <br />
         <button className="btn btn-primary learn">Learn More</button>
   </div>

    
    {/* //1st section left side */}
    <div className="col-12 col-lg-5 text-center leftside-img ">
          <img className="img-fluid abtimg"  style={{height: '25rem', width: '46rem'}} src="ev2.jpg" alt="aboutimg" />
        </div>

  </div>
</div>

</section>
            </>
      )
}

export default About