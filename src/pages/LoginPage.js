import './LoginPage.css'
import React from 'react';
import { useState , useRef } from 'react';
import RequestStatus from '../components/RequestStatus';
import { API_BASE_URL } from '../apiConfig';

var email = "" ;
var password = "";

const storedToken = localStorage.getItem('token');


function LoginPage() {  

        
    if(storedToken){
        window.location.href = "/user";
    }

    const [requestStatus, setRequestStatus] = useState(null);
    const [requestMessage, setRequestMessage] = useState(null);

    const [emailError , setemailError] = useState("");
    const [passwordError , setPasswordError] = useState("");
    
    const emailValidation = useRef();
    const passwordValidation = useRef();

    const getemail = (event) => {    email = event.target.value;  }
    const getPassword = (event) => {    password = event.target.value;  }


    async function signin(data){
        try {
        
        setRequestStatus('loading');
        setRequestMessage('Logging In');

        const fetchData = await fetch(`${API_BASE_URL}/login/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                    },
                body: data
            });
        const response = await fetchData.json();
        
        console.log(response);

        if(response.refresh){
            setRequestStatus('success');
            setRequestMessage('Logged In Successfully');

            //store token in local storage
            localStorage.setItem('token', response.refresh);
            localStorage.setItem('access', response.access);
            localStorage.setItem('email', email);
            localStorage.setItem('username' , response.user.name);
            localStorage.setItem('user_id' , response.user.id);

        

            window.location.href = "/user";

        }else if(response.error){
            setRequestStatus('error');
            setRequestMessage(response.error);
            setPasswordError(response.error);   
            passwordValidation.current.style.display = "block";
            return;
        }

        } catch (error) {
            setRequestStatus('error');
            setRequestMessage('Error Connecting with Server');
        }
    }   


    function loginfunction(event){
       
        event.preventDefault();
  
        // email Validation

        if(email.length === 0){
            setemailError("Please Enter email");
            emailValidation.current.style.display = "block";
            return;
        }else if(email.match(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/)===null){
            setemailError("Please Enter Valid email"); 
            emailValidation.current.style.display = "block";
            return;
        }else {
            setemailError("");
            emailValidation.current.style.display = "none";
        }

        // Password Validation

        if(password.length === 0){
            setPasswordError("Please Enter Password");
            passwordValidation.current.style.display = "block";
            return;
        }else {
            setPasswordError("");
            passwordValidation.current.style.display = "none";
        }

        // Send data to backend
        console.log(email);
        console.log(password);

        const data = JSON.stringify({
            email: email ,
            password: password
        });

        signin(data);
        
    }

    return(
        <div className='loginpage'>

            <RequestStatus status={requestStatus} message={requestMessage} />

            <div className='login_header'>
                <h1>Sign In</h1>
                <p>A reader lives a thousand lives.</p>

            </div>

            <form className='login'>
                
                <div className='input-container'>
                    <input className="form_input" type="text" id="email" name="email" 
                            placeholder="Your Email" required="" onChange={getemail}/>  
                    <div className="field-validation-error" id="email-validation" ref={emailValidation}>
                        <p>{emailError}</p>
                    </div>
                </div>

                <div className='input-container'>
                    <input className="form_input" type="password" id="password" name="password"
                            placeholder="Your Password" required="" onChange={getPassword} />

                    <div className="field-validation-error" id="password-validation" ref={passwordValidation}>
                        <p>{passwordError}</p>
                    </div>
                </div>

                <div className="submit-btn-continer" onClick={loginfunction} >
                    <button>Sign In</button>
                </div>
                

            </form>    
                
        </div>
    );

}

export default LoginPage;