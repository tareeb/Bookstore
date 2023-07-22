import './navbar.css';
import {GrFacebookOption , GrTwitter , GrInstagram , GrDribbble} from 'react-icons/gr';
import {BiSearch ,BiMenu} from 'react-icons/bi';
import {Link} from 'react-router-dom';
import {useState} from 'react';


function gotosearchpage(str){
    window.location.href = `/search?query=${str}`;

}

function Search(){
    const [searchValue, setSearchValue] = useState('')
    return(
        <div className='search_bar'>
            <div className='search_input'>
                <input 
                    type='text'
                    onChange={(event) => setSearchValue(event.target.value)}
                    placeholder='Search' />
            </div>
            <div className='search_icon'>
                <BiSearch 
                    onClick={() => gotosearchpage(searchValue)}
                />
            </div>
        </div>
    );
}

const storedToken = localStorage.getItem('token');

function Navbar(){
    const [linkclasses, setlinkclasses] = useState(["link_container"]);

    const [loarderHeight , setLoaderHeight] = useState(0);
    const [loaderwidth , setLoaderwidth]    = useState(0);

    function togglemenu(){
        linkclasses.length === 1 
            ? setlinkclasses(['link_container', 'active'])
            : setlinkclasses(['link_container'])
    }

    function loader(){
        setLoaderHeight(3); //width of loading
        setLoaderwidth(100);

        setTimeout(function () {
            setLoaderHeight(0);
          }, 1000)

        setTimeout(function () {
            setLoaderwidth(0);
          }, 1000)
    }
    

    return(
        <div className='navbar'>
            <div className='top_part'>
                <div className='social_links'>
                    <div><GrFacebookOption></GrFacebookOption></div>
                    <div><GrTwitter></GrTwitter></div>
                    <div><GrInstagram></GrInstagram></div>
                    <div><GrDribbble></GrDribbble></div>
                </div>

                <div className='logo'>
                    <h1>Reviewing <span>COMPANY</span></h1>
                    <h2>The Book's World</h2>
                </div>

                <div className='searchbar_container'>
                    <Search></Search>
                </div>
            </div>

            <div className='menu_part'>
                <ul>

                    <li> <Link to="/home" onClick={loader}> HOME </Link></li>
                    <li> <Link to="/user" onClick={loader}> USER </Link></li>
                    <li> <Link to="#ABOUT" onClick={loader}> ABOUT </Link></li>
                    <li> <Link to="#TOP SELLER" onClick={loader}> TOP SELLER </Link></li>
                    <li> <Link to="#bookstore" onClick={loader}> BOOKS </Link></li>
                    {
                        storedToken ?
                        <li> <Link to="/Logout" onClick={loader}> LOGOUT </Link></li> :
                        <li> <Link to="/login" onClick={loader}> LOGIN </Link></li>   
                    }
                    {!storedToken && <li> <Link to="/signup" onClick={loader}> SIGNUP </Link></li>}

                </ul>

            </div>

            <div className='menu_mobile'>
                <div className='Button_Container'>
                    <button onClick={togglemenu}>  <BiMenu></BiMenu> Menu</button>

                </div>
                <div className={linkclasses.join(' ')}>
                    <ul>
                        <li> <Link to="/home" onClick={loader}> HOME </Link></li>
                        <li> <Link to="user" onClick={loader}> USER </Link></li>
                        <li> <Link to="#ABOUT" onClick={loader}> ABOUT </Link></li>
                        <li> <Link to="#TOP SELLER" onClick={loader}> TOP SELLER </Link></li>
                        <li> <Link to="#bookstore" onClick={loader}> BOOKS </Link></li>
                        {
                        storedToken ?
                            <li> <Link to="/Logout" onClick={loader}> LOGOUT </Link></li> :
                            <li> <Link to="/login" onClick={loader}> LOGIN </Link></li>   
                        }
                        {!storedToken && <li> <Link to="/signup" onClick={loader}> SIGNUP </Link></li>}
                        
                    </ul>
                </div>
            </div>

            <div className='pageloading'>
                    <div className='fillcolor' 
                         style={{width: `${loaderwidth}%` , height: `${loarderHeight}px`}}>
                    </div>
            </div>
            
        </div>
    );
}

export default Navbar ; 