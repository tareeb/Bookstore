import './SignupPage.css'
import React from 'react';
import { useState , useRef } from 'react';
import { API_BASE_URL } from '../apiConfig';
import RequestStatus from '../components/RequestStatus';

var fname = "" ;
var lname = "" ; 
var email = "" ;
var password = "";
var confirmPassword = "" ;

const storedToken = localStorage.getItem('token');

function SignupPage() {

    if(storedToken){
        window.location.href = "/user";
    }

    const [requestStatus, setRequestStatus] = useState('');
    const [requestMessage, setRequestMessage] = useState('');

    const [passwordError , setPasswordError] = useState("");
    const [usernameError , setUsernameError] = useState("");
    const [emailError , setEmailError] = useState("");

    const usernameValidation = useRef();
    const emailValidation = useRef();
    const passwordValidation = useRef();
    
    const getfName = (event) => {    fname = event.target.value; }
    const getlName = (event) => {    lname = event.target.value; }
    const getEmail = (event) => {    email = event.target.value; }
    const getPassword = (event) => {    password = event.target.value;  }
    const getConfirmPassword = (event) => {     confirmPassword = event.target.value;   }

    async function signup(data) {
        
        setRequestStatus('loading');
        setRequestMessage('Registering');

        try {
          const response = await fetch(`${API_BASE_URL}/register/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: data,
          });
          
          console.log(response);

          if (response.ok) {
            const responseData = await response.json();
            console.log(responseData);
            setRequestStatus('success');
            setRequestMessage('Registered Successfully');
          } else {
            setRequestStatus('error');
            setRequestMessage('Email Already Registered');
            console.error('Error:', response.status);
          }

        } catch (error) {
            
            setRequestStatus('error');
            setRequestMessage('Error Connecting with Server');

            console.log("hereee");
            console.error('Error:', error);
        }

      }
      

    function signupfunction(event){
       
        event.preventDefault();

        
        // Name Validation

        if(fname.length === 0){
            setUsernameError("Enter First Name"); 
            usernameValidation.current.style.display = "block";
            return;
        } 
        else if(fname.match(/^[a-zA-Z]+$/)===null){
            setUsernameError("Enter Valid first Name"); 
            usernameValidation.current.style.display = "block";
            return;
        }else if(lname.length === 0){
            setUsernameError("Enter Last Name"); 
            usernameValidation.current.style.display = "block";
            return;
        }else if(lname.match(/^[a-zA-Z]+$/)===null){
                setUsernameError("Enter Valid last Name"); 
                usernameValidation.current.style.display = "block";
                return;
        }else {
            setUsernameError("");
            usernameValidation.current.style.display = "none";
        }

        //email validation

        if(email.length === 0){
            setEmailError("Enter Email");
            emailValidation.current.style.display = "block";
            return;
        }else if(email.match(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/)===null){
            setEmailError("Enter Valid Email");
            emailValidation.current.style.display = "block";
            return;
        }else {
            setEmailError("");
            emailValidation.current.style.display = "none";
        }

        // Password Validation

        // <p className='info'>At least 10 Characters</p>
        //             <p className='info'>At least 1 Uppercase</p>
        //             <p className='info'>At least 1 Special Character</p>

        if(password.length === 0){
            setPasswordError("Please Enter Password");      //password inccorect
            passwordValidation.current.style.display = "block";
            return;
        }else if(password.length < 10){
            setPasswordError("Password must be atleast 10 characters");      //password inccorect
            passwordValidation.current.style.display = "block";
            return;
        }else if(password.match(/[A-Z]/)===null){
            setPasswordError("Password must contain atleast 1 uppercase");      //password inccorect
            passwordValidation.current.style.display = "block";
            return;
        }else if(password.match(/[!@#$%^&*]/)===null){
            setPasswordError("Password must contain atleast 1 special character");      //password inccorect
            passwordValidation.current.style.display = "block";
            return;
        }else if(password !== confirmPassword){
            setPasswordError("Password and Confirm Password must be same");      //password inccorect
            passwordValidation.current.style.display = "block";
            return;
        }else {
            setPasswordError("");
            passwordValidation.current.style.display = "none";
        }

        // Send data to backend
        console.log(fname);
        console.log(lname);
        console.log(email);
        console.log(password);
        console.log(confirmPassword);
        
        const data = JSON.stringify({
            name: fname + " " + lname,
            email: email ,
            password: password
        });

        signup(data);
        
    }

    return(
        <div className='signuppage'>
            <RequestStatus status={requestStatus} message={requestMessage} />
            <div className='signup_header'>
                <h1>Sign Up</h1>
                <p>Let's Embark Journey of Reading</p>
            </div>

            <form className='signup'>
                
                <div className='multi-input-container'>
                    <div className='input-container'>
                        <label>Enter Your Name</label>
                        <input className="form_input" type="text" id="firstname" name="firstname"
                                placeholder="first Name" required=""onChange={getfName} />
                    </div>
                    <div className='input-container'>
                        <input className="form_input" type="text" id="lastname" name="lastname"
                                placeholder="last Name" required="" onChange={getlName}/>
                    </div>

                    <div className="field-validation-error" id="name-validation" ref={usernameValidation}>
                        <p>{usernameError}</p>
                    </div>

                </div>

                <div className='input-container'>
                    <label>Enter Your Email</label>
                    <input className="form_input" type="text" id="email" name="email" 
                            placeholder="email" required="" onChange={getEmail}/>  
                    <div className="field-validation-error" id="email" ref={emailValidation}>
                        <p>{emailError}</p>
                    </div>
                </div>

                <div className='input-container'>
                    <label>Create a password</label>
                    <input className="form_input" type="password" id="password" name="password"
                            placeholder="Your Password" required="" onChange={getPassword} />
                    <input className="form_input" type="password" id="confirmpassword" name="confirmpassword"
                            placeholder="Confirm Password" required="" onChange={getConfirmPassword}/>

                    <p className='info'>At least 10 Characters</p>
                    <p className='info'>At least 1 Uppercase</p>
                    <p className='info'>At least 1 Special Character</p>
                    
                    <div className="field-validation-error" id="password-validation" ref={passwordValidation}>
                        <p>{passwordError}</p>
                    </div>
                </div>

                <div className="submit-btn-continer" onClick={signupfunction} >
                    <button>Create account</button>
                </div>
                

            </form>    
                
        </div>
    );

}

export default SignupPage;