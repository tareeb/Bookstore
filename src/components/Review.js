
import { API_BASE_URL } from '../apiConfig';

import { useState , useEffect} from 'react';

const storedToken = localStorage.getItem('token');
const accessToken = localStorage.getItem('access');
const user_id = localStorage.getItem('user_id');


const Review = ({username , text , id}) => {

    const [showFullText, setShowFullText] = useState(false);
    const [comments , setComments] = useState([]);
    const [showCommentMenu , setShowCommentMenu] = useState(false);
    const [reviewID , setreviewID] = useState(-1)

    const [inputValue, setInputValue] = useState('');

    const handleChange = (event) => {
        setInputValue(event.target.value);
    };


    const handleClick = () => {
        showFullText ? setShowFullText(false) : setShowFullText(true);
    };

    const getcomments = () => {
        fetch(`${API_BASE_URL}/getcommentbyreview/${id}/`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setComments(data);
            })
            .catch(error => {
                console.error(error);
            });
    }

    const addcomment = async () => {
        if (inputValue){

            const data = { "user" : user_id , "review" : reviewID , "text" : inputValue}
            console.log(data , accessToken);

            try {
            const response = await fetch(`${API_BASE_URL}/addcomment/`, {
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
                getcomments();
            } else {
                const errorData = await response.json();
                console.log('Failed to add review:', errorData);
            }
            } catch (error) {
            console.error('An error occurred:', error);
            }
        }
    }


    return (
        <div className='review'>
            <h1>{username}</h1>
            {!showFullText && <p className='halftext'>{text.substring(0,200)}......</p>}
            {showFullText && <p className='fulltext'>{text}</p>}
            {!showFullText && <button className='readmore-button' onClick={handleClick}>Read More</button>}
            
            { showFullText && <div className='reviews_button'> 
                <button className="button" onClick={getcomments}>
                    Comments
                </button> 

                <button className='button' onClick={() => { setShowCommentMenu(true); setreviewID(id) }}>
                    Add Comment
                </button>

                <button className='button'  onClick={handleClick}>
                    Close
                </button>

            </div>}

            {
                showFullText && showCommentMenu && <div className='comments'>
                        <div className='comment menu'>
                            <input type="text" value={inputValue} onChange={handleChange} />
                            <button onClick={addcomment}>Submit</button>
                        </div>
                    </div>
            }

            {comments && showFullText && <div className='comments'>

                {comments.map((comment , index) => (
                    <div className='comment' key={index}>
                        <h1>{comment.username}</h1>
                        <p>{comment.text}</p>
                    </div>
                ))}

            
            </div>}

        </div>
    );
}

export default Review ;

