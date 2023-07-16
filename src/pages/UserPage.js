import './UserPage.css'
import Pageintro from '../components/Pageinto';
import Bookcard from '../components/bookcard';
import { API_BASE_URL } from '../apiConfig';


import {AiFillCaretLeft , AiFillCaretRight} from 'react-icons/ai'
import { useState, useRef , useEffect} from 'react';

const maxbooks_inpage = 9 ;

let   startindex = 0 ; 
let   endindex   = startindex + maxbooks_inpage ; 
 
const storedToken = localStorage.getItem('token');

function UserPage() {

    if(!storedToken){
        window.location.href = "/loginrequest";
    }

    const [booksdata , setbooksdata] = useState([]) ; 
    const [bookstoshow , setbookstoshow] = useState([]); 

    useEffect(() => {

        const getbooks = async () => {

            const response = await fetch(`${API_BASE_URL}/getallbooks/`)
            const data = await response.json()
            setbooksdata(data)
            setbookstoshow(data.slice(startindex, endindex))
        }

        getbooks();
        
        
    }, [])

    const totalbooks = booksdata.length;

    const totalpages = Math.ceil(totalbooks / maxbooks_inpage) ; 

    const booklistRef = useRef()

    function moveback(){
        
        if(startindex>0){
            startindex = startindex - maxbooks_inpage ; 
            endindex   = endindex   - maxbooks_inpage ;
            setbookstoshow(booksdata.slice(startindex , endindex)) ;
            window.scrollTo({
                top: booklistRef.current.getBoundingClientRect().top + window.scrollY,
                behavior: 'smooth'
            });
        }
    }

    function movenext(){
        if(endindex<totalbooks){
            startindex = startindex + maxbooks_inpage ; 
            endindex   = endindex   + maxbooks_inpage ; 
            setbookstoshow(booksdata.slice(startindex , endindex)) ;
            window.scrollTo({
                top: booklistRef.current.getBoundingClientRect().top + window.scrollY,
                behavior: 'smooth'
            });
        }
    }
        
    
    function gotopage(index){
            startindex = index*maxbooks_inpage ; 
            endindex   = startindex + maxbooks_inpage;
            setbookstoshow(booksdata.slice(startindex , endindex)) ;
            window.scrollTo({
                top: booklistRef.current.getBoundingClientRect().top + window.scrollY,
                behavior: 'smooth'
            });
    }

    return(
        <div className='Bookspage'>
            <Pageintro pagename={"Welcome"}></Pageintro>

            <div className='bookslist' ref={booklistRef}>
                { console.log(bookstoshow)}
                { 
                    bookstoshow.map( (book , index) => {
                        return(
                            <Bookcard
                                key={index}
                                id={book.id}
                                name={book.name}
                                price={book.price}
                                writer={book.writer_name}
                                src = {book.image_url}
                                allowreview = {true}
                            ></Bookcard>
                        )
                        
                    })
                }
            </div>

            <div className='bookspage_btn_container'>
                <button className='prevbtn' onClick={moveback}><AiFillCaretLeft></AiFillCaretLeft></button>
                {Array(totalpages).fill(0).map( (item , index) => (   
                    <button key={index} className='gotobtn' onClick={() => gotopage(index)}>{index}</button>
                ))}
                <button className='nextbtn' onClick={movenext}><AiFillCaretRight></AiFillCaretRight></button>
            </div>
            
        </div>
    );
}

export default UserPage;