import React from 'react'
import "./Footer.css";

const Footer = () => {
      return ( 
            <>
              <footer>
                    <div className="container footer">
                          <div className="row">
                            <div className="col-12 col-lg-9 mx-auto">
                                 
                                 <div className="row">
                                       <div className="col-6 col-lg-3">
                                         <h2>Company</h2>  <hr style={{width: '9rem'}}/>
                                         <ul className="footer-list">
                                         <li><a href="!#">Company</a></li>
                                         <li><a href="!#">Company</a></li>
                                         <li><a href="!#">Company</a></li>
                                         <li><a href="!#">Company</a></li>
                                         </ul>
                                       </div>

                                       <div className="col-6 col-lg-3">
                                         <h2>Support</h2>  <hr style={{width: '9rem'}}/>
                                         <ul className="footer-list">
                                         <li><a href="!#">Support</a></li>
                                         <li><a href="!#">Support</a></li>
                                         <li><a href="!#">Support</a></li>
                                         <li><a href="!#">Support</a></li>
                                         </ul>
                                       </div>


                                       <div className="col-6 col-lg-3">
                                         <h2>Services</h2> <hr style={{width: '9rem'}}/>
                                         <ul className="footer-list">
                                         <li><a href="!#">Services</a></li>
                                         <li><a href="!#">Services</a></li>
                                         <li><a href="!#">Services</a></li>
                                         <li><a href="!#">Services</a></li>
                                         </ul>
                                       </div>



                                       <div className="col-6 col-lg-3 social">
                                         <h2>Follow Us</h2>
                                         <div className="row m-s">
                                               <div className="col-3">
                                               <a href="!#"><i className="fab fa-facebook fontawsome-style logo-style"></i></a>
                                               </div>

                                               <div className="col-3">
                                               <a href="!#"><i style={{color: '#fb3958'}} className="fab fa-instagram fontawsome-style logo-style"></i></a>
                                               </div>

                                               <div className="col-3">
                                               <a href="!#"><i style={{color: "#00acee"}}className="fab fa-twitter fontawsome-style logo-style"></i></a>
                                               </div>

                                               <div className="col-3">
                                               <a href="!#"><i style={{color: "#FF0000"}} className="fab fa-youtube fontawsome-style logo-style"></i></a>
                                               </div>
                                         </div>
                                       </div>
                                 </div>
                               <hr/>
                               <div className="mt-3 fend">
                                     <p style={{
                                           marginLeft:"2rem"
                                     }} className="main-hero-para f-para text-center w-100">Copyright @ 2022 IMTIAZ. ALL rights reserved.</p>
                               </div>

                            </div>
                          </div>
                    </div>
              </footer>
            </>
      )
}

export default Footer