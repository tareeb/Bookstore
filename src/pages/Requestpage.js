import '../pages/Requestpage.css'
import Pageintro from '../components/Pageinto';

function Request() {
    

    return(
        <div className='Request Page'>
            <Pageintro 
                pagename={"Please Login"} 
                intro={"Login in Now to Read Extensive Book Reviews and Buy the Book that will be best for you "}
            ></Pageintro>
            
            {/* <div className='Request-Page' >
                <a href='/login' className='login'>login</a>
                <a href='/signup'>Signup</a>
            </div> */}
        </div>
    );
}

export default Request;