import './footer.css'

import {FaFacebookF , FaTelegramPlane} from 'react-icons/fa'
import { BsTwitter , BsInstagram , BsTelephoneFill , BsMap}  from 'react-icons/bs'


function Footer(){
    return (
        <div className="footercontainer">
            <div className='footer_toppart'>

                <div>
                    <h1>Connect</h1>
                    <p>Far far away, behind the word mountains, far from the countries.</p>
                    <div className='footer_icons'>
                        <div><FaFacebookF></FaFacebookF></div>
                        <div><BsInstagram></BsInstagram></div>
                        <div><BsTwitter></BsTwitter></div>
                    </div>
                </div>

                <div>
                    <h1>Extra Links</h1>
                     
                         <p>Affiliate Program</p> 
                         <p>Business Services</p> 
                         <p>Education Services</p> 
                         <p>Gift Cards</p> 
                     
                </div>

                <div>
                    <h1>Legal</h1>
                     
                         <p>Blog</p> 
                         <p>Join us</p> 
                         <p>Privacy and Policy</p> 
                         <p>Terms and Conditions</p> 
                     
                </div>

                <div>
                    <h1>Company</h1>
                     
                         <p>About Us</p> 
                         <p>Join us</p> 
                         <p>Contact</p> 
                         <p>Career</p> 
                     
                </div>

                <div className='contactdiv'>
                    <div>
                        <BsMap></BsMap>
                        <p>203 San Francisco</p>
                    </div>
                    <div>
                        <BsTelephoneFill></BsTelephoneFill>
                        <p>+2 392 3929 210</p>
                    </div>
                    <div>
                        <FaTelegramPlane></FaTelegramPlane>
                        <p>	info@yourdomain.com</p>
                    </div>
                </div>




            </div>

        </div>
    )
}

export default Footer