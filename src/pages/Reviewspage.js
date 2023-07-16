import Pageintro from "../components/Pageinto";
import './Reviewpage.css'
import {AiOutlineLike} from 'react-icons/ai'
// import reviews from "../data/reviews";
import { useEffect , useState } from "react";


var usernameValue = "" ;
var replyValue = "";


const getusernameValue = (event)=>{
   
    usernameValue = event.target.value;

    console.log(usernameValue);

};


const getreplyValue = (event)=>{
   
    replyValue = event.target.value;

    console.log(replyValue);
}; 


function submitreply (event, id, getReviews){
    event.preventDefault()
    console.log(event)
    // console.log(id);
    // console.log(usernameValue);
    // console.log(replyValue);

    if(usernameValue.length===0){
        alert("Username cannot be Empty");
        return;
    }else if(replyValue.length===0){
        alert("Reply cannot be Empty");
        return;
    }

    const randomid = 11 ;  // make it random
    if(id===0){

        const postUser = async () => { 
            const comment = {
                id: randomid ,
                userid : usernameValue ,
                comment :  replyValue ,
                likes : 0 ,
                reply : []
            }

            const config = {
                method: 'POST',
                body: JSON.stringify(comment),
                headers: {
                    'content-type': 'application/json',
                    'accept-type': 'application/json'
                }
            }

            const response = await fetch('http://localhost:3001/postcomment', config)
            const message = await response.json()
            console.log(message.message)
            getReviews()  
        }

        postUser(); 
    }
}

// function openreplymenu(id){

//     const TotalAddReviews = document.getElementsByClassName("AddReply");
    
//     for(var i=0 ; i<TotalAddReviews.length ; i++){
//         TotalAddReviews[i].innerHTML = "" ;
//     }

//     usernameValue = "" ;
//     replyValue = "" ;

//     const AddReview = document.getElementById("Addrev" + id);

//     const AddReviewhtml = 
    
//     "<form className=\"Replyform\"> " +

//         "<input  type=\"text\"  id=\"usernameinput\" placeholder=\"Enter Username\" onchange={getusernameValue()}> </input>" + 

//         "<input  type=\"text\"  id=\"reviewinput\"   placeholder=\"Add Review\" onchange={getreplyValue()}> </input>" +

//        "<button type=\"button\" onclick={submitreply(id)} >Submit</button>" +

//     "</form>";

//     AddReview.innerHTML = AddReviewhtml; 
    
// }


function Comment( {id , userid , comment , likes , reply}){
    if(reply.length===0){
        return(
            
            <div className="Comment">
                
                <div className="commentheader">
                    <div>
                        <h3>{userid}: </h3>
                        <p>{comment}</p>
                    </div>
                    <div className="replybtncontainer">
                        <div className="likescontainer">
                            <p>{likes}</p>
                            <AiOutlineLike></AiOutlineLike>
                        </div>
                        {/* <p onClick={() => openreplymenu(id)}>Reply</p> */}
                    </div>
                </div>
                
               

                <div className="AddReply" id={"Addrev" + id} >
                    {/* <form className="Replyform">
                            <input  type="text" 
                                    name="username"
                                    id="usernameinput"
                                    placeholder="Enter Username"
                                    onChange={getusernameValue}>
                            </input>

                            <input  type="text" 
                                    id="reviewinput"
                                    placeholder="Add Reply"
                                    onChange={getreplyValue}>
                                        
                            </input>

                            <button type="button" onClick={() => submitreply(id)}>Submit</button>
                    </form> */}
                </div>
                
                
            </div>
        );
    }
    else
    {
        return(
            <div className="Comment">
                <div className="commentheader">
                    <div>
                        <h3>{userid}: </h3>
                        <p>{comment}</p>
                    </div>
                    <div>
                        <div className="likescontainer">
                            <p>{likes}</p>
                            <AiOutlineLike></AiOutlineLike>
                        </div>
                        {/* <p onClick={() => openreplymenu(id)}>Reply</p> */}
                    </div>
                </div>

                <div className="AddReply" id={"Addrev" + id}>
                    {/* html will be added by function using innerhtml */}
                </div>

                {reply.map(
                    (reply , index) => (
                        <Comment key={index}
                                 id={reply.id}
                                 userid={reply.userid} 
                                 comment={reply.comment} 
                                 likes={reply.likes}
                                 reply={reply.reply}></Comment>
                    )
                )}
            </div>
        );
    }

}

function Reviewspage(){

    const [reviews , setreviews] = useState([]) 

    const getreviewsdata = async () => {
        const response = await fetch('http://localhost:3001/reviewsdata');
        const data = await response.json();
        console.log(data);
        setreviews(data);
        console.log(reviews);
    }

    useEffect(() => {   
        getreviewsdata();
    }, [])

    return(
        <div>
            <Pageintro pagename={"Reviews"}></Pageintro>

            
            <div className="Commentcontainer">

            <div className="AddComment" id={"Addrev" + "0"} >
                    <form className="Replyform" onSubmit={(event) => submitreply(event, 0, getreviewsdata)}>
                            <input  type="text" 
                                    name="username"
                                    id="usernameinput"
                                    placeholder="Enter Username"
                                    onChange={getusernameValue}>
                            </input>

                            <input  type="text" 
                                    id="reviewinput"
                                    placeholder="Add a Comment"
                                    onChange={getreplyValue}>
                                        
                            </input>

                            <button type='submit'>Submit</button>
                    </form>
                </div>


                {reviews.map(
                    (review , index) => (
                        <Comment 
                            key={index}
                            id={review.id}
                            userid={review.userid} 
                            comment={review.comment}
                            likes={review.likes}
                            reply={review.reply}>
                        </Comment>
                    )
                )}
                

            </div>
        </div>
    );
}

export default Reviewspage