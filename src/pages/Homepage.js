import './Homepage.css'
import {Link} from 'react-router-dom';
import { useState,useRef ,useEffect} from 'react';

import {GiUnicorn} from 'react-icons/gi'  
import {GiSpellBook} from 'react-icons/gi'
import {BsHouse} from 'react-icons/bs'
import {BiTimer} from 'react-icons/bi'
import {RiDoubleQuotesL} from 'react-icons/ri'
import {AiFillCaretLeft , AiFillCaretRight} from 'react-icons/ai'
import Bookcard from '../components/bookcard';
import FlippedBookcard from '../components/flipped_bookcard';


function Testimonial({comment , name , position , imagesrc}) {
    return(
        <div className='Testimonial'>
            <div className='testimonialicon'>
                    <RiDoubleQuotesL></RiDoubleQuotesL>
            </div>
            <div>
                <p>{comment}</p>
            </div>
            <div className='clientinfo'>
                <img src={imagesrc}></img>
                    <div>
                        <h1>{name}</h1>
                        <h2>{position}</h2>
                    </div>
            </div>
        </div>
    )
}
  
const Testimonialdata = [
    {
        comment : "1Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.", 
        name : "Roger Scott",
        position : "Marketing Manager",
        imagesrc : "https://preview.colorlib.com/theme/publishingcompany/images/person_2.jpg.webp"
    },
    {
        comment : "2Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.", 
        name : "Roger Scott",
        position : "Marketing Manager",
        imagesrc : "https://preview.colorlib.com/theme/publishingcompany/images/person_2.jpg.webp"
    },
    {
        comment : "3Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.", 
        name : "Roger Scott",
        position : "Marketing Manager",
        imagesrc : "https://preview.colorlib.com/theme/publishingcompany/images/person_2.jpg.webp"
    },
    {
        comment : "4Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.", 
        name : "Roger Scott",
        position : "Marketing Manager",
        imagesrc : "https://preview.colorlib.com/theme/publishingcompany/images/person_2.jpg.webp"
    },
    {
        comment : "5Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.", 
        name : "Roger Scott",
        position : "Marketing Manager",
        imagesrc : "https://preview.colorlib.com/theme/publishingcompany/images/person_2.jpg.webp"
    }, 
    {
        comment : "6Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.", 
        name : "Roger Scott",
        position : "Marketing Manager",
        imagesrc : "https://preview.colorlib.com/theme/publishingcompany/images/person_2.jpg.webp"
    },
    {
        comment : "7Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.", 
        name : "Roger Scott",
        position : "Marketing Manager",
        imagesrc : "https://preview.colorlib.com/theme/publishingcompany/images/person_2.jpg.webp"
    }
 
]




function Homepage() {

    
    const [ right, setRight] = useState(0);

    const max   = Testimonialdata.length ; 

    const [booksdata , setbooksdata] = useState([]) ; 

    useEffect(() => {


        const getbooks = async () => {

            const response = await fetch('http://localhost:8000/getallbooks')
            const data = await response.json()
            setbooksdata(data)

        }

        getbooks();
        
        
    }, [])
    
    function moveright(){
        if(right < (max-1)*100){
            setRight( right + 100 )  ;   
        }
    }
    
    function moveleft(){
        if(right>0){
            setRight( right - 100 )  ; 
        }
    }

    return(
        <div>
            <div className='herosection'>
                <div className='hero_content'>
                    <h1>Good books don't give up all their secrets at once</h1>
                    <p>Here You can get all the best books and together with other users you can share your thoughts to get to the secrets of every book.</p>
                    <div className='HeroButtons'>
                        <button id='btn1'><Link to='/user'>View All Books</Link></button>
                        <button id='btn2'><Link to='/user'>Explore Now</Link></button>
                    </div>
                </div>
            </div>

            <div className='servicesection'>
                <div className='Service_Container'>

                    <div className='service'>
                        <div className='circle' id='service1'>
                            <GiUnicorn></GiUnicorn>
                            <div className='smallcircle'></div>
                        </div>
                        <h1>Children's Book</h1>
                        <p>A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
                    </div>

                    <div className='service'>
                        <div className='circle'>
                            <GiSpellBook></GiSpellBook>
                            <div className='smallcircle'></div>
                        </div>
                        <h1>Romance</h1>
                        <p>A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
                    </div>

                    <div className='service'>
                        <div className='circle'>
                            <BsHouse></BsHouse>
                            <div className='smallcircle'></div>
                        </div>
                        <h1>Architecture</h1>
                        <p>A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
                    </div>

                    <div className='service'>
                        <div className='circle'>
                            <BiTimer></BiTimer>
                            <div className='smallcircle'></div>
                        </div>
                        <h1>History</h1>
                        <p>A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
                    </div>
                    

                </div>

            </div>

            <div className='statssection'>
                <div>
                    <h1>75,678</h1>
                    <p>ACTIVE READERS</p>
                </div>

                <div>
                    <h1>3,040</h1>
                    <p>TOTAL PAGES</p>
                </div>

                <div>
                    <h1>283</h1>
                    <p>CUP OF COFFEE</p>
                </div>

                <div>
                    <h1>14,500</h1>
                    <p>FACEBOOK FANS</p>
                </div>
            </div>

            <div className='welcomesection'>
                <div className='welcome_image'>
                    <img src='https://preview.colorlib.com/theme/publishingcompany/images/about-1.jpg.webp'></img>
                </div>

                <div className='welcome_content'>
                    <h2>WELCOME TO BOOK's World</h2>
                    <h1>A Company Created By Authors</h1>
                    <p>Here you can read all your favoruites books and get insight from your follow user and together with toehr users you can share your thoughts and suggestions and reviews of the books.</p>
                    <p>And like this by sharing Knowledge together everyone can uncover the secrets being hidden by those books.We from the world's book welcome you to the world of books and together we hope that we will be able to dive in this world of books</p>
                    <Link to="#AllAuthors"> View All Our Authors </Link>
                </div>
            </div>

            <div className='Bookssection'>
                { booksdata.slice(0,3).map( (book , index) => {
                        return(
                            <Bookcard
                                key={index}
                                id={book.id}
                                name={book.name}
                                price={book.price}
                                writer={book.writer_name}
                                src = {book.image_url}
                                allowreview={true}
                            ></Bookcard>
                        )      
                    })
                }
                 
            </div>

            <div className='Bookssection'>
            { booksdata.slice(4,7).map( (book , index) => {
                        return(
                            <Bookcard
                                key={index}
                                id={book.id}
                                name={book.name}
                                price={book.price}
                                writer={book.writer_name}
                                src = {book.image_url}
                                allowreview={true}
                            ></Bookcard>
                        )      
                    })
                }
                 
            </div>

            <div className='Testimonialsection'>
                <div className='TestimonialHeader'>
                    <h1>Testimonails</h1>
                    <h2>Kind Words From Clients</h2>
                </div>
                
                <div>
                    <div className='TestimonialContainer'>
                        <div className='testimonialslider' style={{right:`${right}%`}}> 
                            {Testimonialdata.map( (testimonial , index) => (
                                <Testimonial 
                                    key={index}
                                    name = {testimonial.name}
                                    position = {testimonial.position}
                                    imagesrc = {testimonial.imagesrc}
                                    comment = {testimonial.comment}
                                ></Testimonial>
                            ))}
                        </div>
                        
                    </div>

                    <div className='testimonial_btn_container'>
                        <button className='leftbtn' onClick={moveleft}><AiFillCaretLeft></AiFillCaretLeft></button>
                        <button className='rightbtn' onClick={moveright}><AiFillCaretRight></AiFillCaretRight></button>
                    </div>

                </div>
            
            </div>
            
      
            
        </div>
    );
}

export default Homepage;