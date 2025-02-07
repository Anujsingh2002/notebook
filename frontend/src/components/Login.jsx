import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = (props) => {
    const [credentials,setCredentials]=useState({email:"aps@gmail.com",password:"asd"});
    let navigate = useNavigate();

    const handleSubmit = async(e)=>{
        e.preventDefault();

         //server side
         const response = await fetch(`https://notebook-backend-994b.onrender.com/api/auth/login`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({email:credentials.email,password:credentials.password})
        });
        const jsn = await response.json();
        // console.log(jsn)
        if(jsn.success){
            //save authtoken to localstorage and redirect to homepage
            localStorage.setItem('token',jsn.authToken);
            navigate("/");
            props.showAlert("Logged In Successfully","success");
        }
        else{
            props.showAlert("wrong credentials","danger");
            // alert("wrong credentials");
        }

    }

        const handleChange= (e)=>{
            setCredentials({...credentials,[e.target.name]:e.target.value});
        }
    return (
        <div className='mt-2'>
            <h2 className='mb-5'>Login to Continue</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" onChange={handleChange} value={credentials.email} id="email" name="email" aria-describedby="emailHelp"/>
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" onChange={handleChange} value={credentials.password} id="password" name="password"/>
                </div>
                <button type="submit" className="btn btn-primary" >Login</button>
            </form>
        </div>
    )
}

export default Login
