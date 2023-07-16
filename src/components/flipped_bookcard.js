import './bookcard.css'
import {BsCart2 , BsHeart , BsSearch , BsEye} from 'react-icons/bs'


function FlippedBookcard({price , name , writer , src}){
    return(
        <div className='Bookcard'>
            
            <div className='Bookcard_content'>
                <h2>${price}</h2>
                <h1>{name}</h1>
                <p>{writer}</p>
            </div>

            <div className='Bookcard_image_container'>
                <img src={src}></img>
                <div className='Bookcard_icons'>
                    <div id='cart'><BsCart2></BsCart2></div>
                    <div id='like'><BsHeart></BsHeart></div>
                    <div id='search'><BsSearch></BsSearch></div>
                    <div id='compare'><BsEye></BsEye></div>
                </div>
            </div>

        </div>
    );
}

export default FlippedBookcard;