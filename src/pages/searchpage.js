import './Bookspage.css'
import Pageintro from '../components/Pageinto';
import Bookcard from '../components/bookcard';
import { API_BASE_URL } from '../apiConfig';
import {AiFillCaretLeft , AiFillCaretRight} from 'react-icons/ai'
import { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const storedToken = localStorage.getItem('token');


function Searchpage(){

    if(!storedToken){
        window.location.href = "/loginrequest";
    }

    const [searchParams] = useSearchParams();
    const str = searchParams.get('query')   ;
    console.log(str);

    const [booksdatafetch , setbooksdata] = useState([]) ; 

    useEffect(() => {

        const getbooks = async () => {

            const response = await fetch(`${API_BASE_URL}/getallbooks/`)
            const data = await response.json()
            setbooksdata(data)
        }

        getbooks();
        
        
    }, [])

 

    const booksdata = booksdatafetch.filter((item) => item.name.toLowerCase().includes(str.toLowerCase()) )



    const maxbooks_inpage = 9 ;
    const totalbooks = booksdata.length;

    const totalpages = Math.ceil(totalbooks / maxbooks_inpage) ; 

    let   startindex = 0 ; 
    let   endindex   = startindex + maxbooks_inpage ; 


    const [bookstoshow , setbookstoshow] = useState(booksdata.slice(startindex , endindex)) ; 

    console.log(bookstoshow) ;
    
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
        <Pageintro pagename={"Book Store"}></Pageintro>

        <div className='bookslist' ref={booklistRef}>
            { 
            
                booksdata.map( (book , index) => {
                    
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

export default Searchpage;