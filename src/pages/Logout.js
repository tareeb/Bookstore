import Pageintro from '../components/Pageinto';

const storedToken = localStorage.getItem('token');

function Logout() {

    if(!storedToken){
        window.location.href = "/home";
    }

    const logout = () => {
        console.log("logout");
        localStorage.removeItem('token');
        localStorage.removeItem('access');
        localStorage.removeItem('email');
        localStorage.removeItem('username');
        localStorage.removeItem('user_id');
        window.location.href = "/home";
    }

    return(
        <div className='Request Page'>
            <Pageintro 
                pagename={"Logging out ?"} 
                intro={"It was nice having you here. Hope to see you again soon. "}
            ></Pageintro>
            
            <div className='Request-Page' >
                <button onClick={logout}>Logout</button>
            </div>
        </div>
    );
}

export default Logout;