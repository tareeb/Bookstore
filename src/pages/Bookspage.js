import './Bookspage.css'
import Pageintro from '../components/Pageinto';
import Bookcard from '../components/bookcard';
import { API_BASE_URL } from '../apiConfig';
import Review from '../components/Review';
import RequestStatus from '../components/RequestStatus';


import { useSearchParams } from 'react-router-dom';

import { useState , useEffect} from 'react';


const storedToken = localStorage.getItem('token');
const accessToken = localStorage.getItem('access');
const user_id = localStorage.getItem('user_id');


// const Review = ({username , text , id}) => {

//     const [showFullText, setShowFullText] = useState(false);
//     const [comments , setComments] = useState([]);
//     const [showCommentMenu , setShowCommentMenu] = useState(false);
//     const [reviewID , setreviewID] = useState(-1)

//     const [inputValue, setInputValue] = useState('');

//     const handleChange = (event) => {
//         setInputValue(event.target.value);
//     };


//     const handleClick = () => {
//         showFullText ? setShowFullText(false) : setShowFullText(true);
//     };

//     const getcomments = () => {
//         fetch(`${API_BASE_URL}/getcommentbyreview/${id}/`)
//             .then(response => response.json())
//             .then(data => {
//                 console.log(data);
//                 setComments(data);
//             })
//             .catch(error => {
//                 console.error(error);
//             });
//     }

//     const addcomment = async () => {
//         if (inputValue){

//             const data = { "user" : user_id , "review" : reviewID , "text" : inputValue}
//             console.log(data , accessToken);

//             try {
//             const response = await fetch(`${API_BASE_URL}/addcomment/`, {
//                 method: 'POST',
//                 headers: {
//                 'Content-Type': 'application/json',
//                 Authorization: `Bearer ${accessToken}`,
//                 },
//                 body: JSON.stringify(data),
//             });
        
//             if (response.ok) {
//                 const data = await response.json();
//                 console.log('Review added successfully:', data);
//                 getcomments();
//             } else {
//                 const errorData = await response.json();
//                 console.log('Failed to add review:', errorData);
//             }
//             } catch (error) {
//             console.error('An error occurred:', error);
//             }
//         }
//     }


//     return (
//         <div className='review'>
//             <h1>{username}</h1>
//             {!showFullText && <p className='halftext'>{text.substring(0,200)}......</p>}
//             {showFullText && <p className='fulltext'>{text}</p>}
//             {!showFullText && <button className='readmore-button' onClick={handleClick}>Read More</button>}
            
//             { showFullText && <div className='reviews_button'> 
//                 <button className="button" onClick={getcomments}>
//                     Comments
//                 </button> 

//                 <button className='button' onClick={() => { setShowCommentMenu(true); setreviewID(id) }}>
//                     Add Comment
//                 </button>

//                 <button className='button'  onClick={handleClick}>
//                     Close
//                 </button>

//             </div>}

//             {
//                 showFullText && showCommentMenu && <div className='comments'>
//                         <div className='comment menu'>
//                             <input type="text" value={inputValue} onChange={handleChange} />
//                             <button onClick={addcomment}>Submit</button>
//                         </div>
//                     </div>
//             }

//             {comments && showFullText && <div className='comments'>

//                 {comments.map((comment , index) => (
//                     <div className='comment' key={index}>
//                         <h1>{comment.username}</h1>
//                         <p>{comment.text}</p>
//                     </div>
//                 ))}

            
//             </div>}

//         </div>
//     );
// }

function Bookspage() {


    if(!storedToken){
        window.location.href = "/loginrequest";
    }

                
    const [requestStatus, setRequestStatus] = useState(null);
    const [requestMessage, setRequestMessage] = useState(null);
    
    const [showReviewMenu , setShowReviewMenu] = useState(false);
    const [bookid , setBookID] = useState(-1)

    const [reviews , setReviews] = useState([])

    const [searchParams] = useSearchParams();
    
    const name = searchParams.get("name");
    const id = searchParams.get("id");
    const writer = searchParams.get("writer");
    const price = searchParams.get("price");
    const src = searchParams.get("src");


    const [inputValue, setInputValue] = useState('');
    const [reload , setReload] = useState('');

    const handleChange = (event) => {
        setInputValue(event.target.value);
    };

    useEffect(() => {

        const getreviews = async () => {

            fetch(`${API_BASE_URL}/getreviewsbybook/${id}/`)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    setReviews(data);
                })
                .catch(error => {
                    // Handle any errors
                    console.error(error);
                });

        }
        getreviews();
    }, [id , reload])

    const addreview = async () => {

        if (inputValue){

            const data = { "user" : user_id , "book" : bookid , "text" : inputValue}
            console.log(data , accessToken);

            try {
            const response = await fetch(`${API_BASE_URL}/addreview/`, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify(data),
            });
        
            if (response.ok) {
                const data = await response.json();
                console.log('Review added successfully:', data);
                setReload(inputValue);
            } else {
                const errorData = await response.json();
                console.log('Failed to add review:', errorData);
            }
            } catch (error) {
            console.error('An error occurred:', error);
            }
        }

      };

    const placeOrder = async () => {
        const data = { "user" : user_id , "book" : id }
        console.log(data);
            try {
            
                setRequestMessage('Placing Order');
                setRequestStatus('loading');

                const response = await fetch(`${API_BASE_URL}/addorder/`, {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                    },
                    body: JSON.stringify(data),
                });

                console.log(response);
            
                if (response.ok) {
                    const data = await response.json();
                    console.log('Order Placed', data);
                    setRequestMessage('Order Placed');
                    setRequestStatus('success');
                } else {
                    const errorData = await response.json();
                    console.log('Failed to add order: ', errorData);
                    setRequestMessage('Failed to Place Order');
                    setRequestStatus('error');
                }

            } catch (error) {

                setRequestMessage('Network Error');
                setRequestStatus('error');

            console.error('An error occurred:', error);
            }
    };

    const addfav = async () => {
        const data = { "user" : user_id , "book" : id }
        console.log(data);
            try {
            
                setRequestMessage('Adding to Favourite');
                setRequestStatus('loading');

                const response = await fetch(`${API_BASE_URL}/addfav/`, {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                    },
                    body: JSON.stringify(data),
                });

                console.log(response);
            
                if (response.ok) {
                    const data = await response.json();
                    console.log('Added to Fav', data);
                    setRequestMessage('Added to Fav');
                    setRequestStatus('success');
                } else {
                    const errorData = await response.json();
                    console.log('Failed to add order: ', errorData);
                    setRequestMessage('Failed to Add Fav');
                    setRequestStatus('error');
                }

            } catch (error) {

                setRequestMessage('Network Error');
                setRequestStatus('error');

            console.error('An error occurred:', error);
            }
    };


   
    return(
        <div className='Bookspage'>

            <RequestStatus status={requestStatus} message={requestMessage} />

            <Pageintro 
                pagename={"Book Center"} 
                intro={"Here You can read and write reviews and summaries, opinions and thoughts about the books."}
            ></Pageintro>

            <div className='bookcenter'>

                <div className='bookpreview_container'>

                    <div className='bookpreview'>
                        <Bookcard
                            id={id}
                            name={name}
                            price={price}
                            writer={writer}
                            src = {src}
                            allowreview={false}
                            ></Bookcard>
                    </div>

                    <div className='preview_button'>

                        <button
                            onClick={() => {
                                showReviewMenu ? setShowReviewMenu(false) : setShowReviewMenu(true) ;
                                setBookID(id) ;
                            }}
                        >Add Review</button>
                        
                        <button
                            onClick={placeOrder}
                        >Buy Book</button>

                        <button
                            onClick={addfav}
                        >Add to Favourite</button>
                    </div>
                </div>

                {reviews && <div className='bookreviews'>
                    <h1>See what Users are Saying about Book</h1>

                   {showReviewMenu && <div className='reviews'> 
                        <div className='review input'>
                            <p>Write Your Thoughts Here</p>
                            <textarea rows="6" cols="40" value={inputValue} onChange={handleChange}></textarea>

                            <div className='reviews_button'>
                                <button onClick={addreview}>Submit</button>
                            </div>
                        </div>    
                    </div>}
                
                    <div className='reviews'>
                        {reviews.map((review , index) => (
                           <Review username={review.username} text={review.text} id={review.id} key={index}></Review>
                        ))}
                    </div>
                
                </div>}
            </div>

            
           
        </div>
    );
}

export default Bookspage;