import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
    const [credentials,setCredentials]=useState({name:"",email:"",password:"",cpassword:""});
    let navigate = useNavigate();
    
    const handleSubmit = async(e)=>{
        e.preventDefault();
        const {name,email,password}=credentials;
         //server side
         const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password})
        });
        const jsn = await response.json();
        console.log(jsn)
        if(jsn.success){
            //save authtoken to localstorage and redirect to homepage
            localStorage.setItem('token',jsn.authToken);
            navigate("/");
            props.showAlert("Account created Successfully","success");
        }
        else{
            props.showAlert("Invalid Entries","danger");
            // alert("wrong credentials");
        }

    }

        const handleChange= (e)=>{
            setCredentials({...credentials,[e.target.name]:e.target.value});
        }
    return (
        <div className='container mt-2'>
            <h2 className='mb-5'>Create an account to Continue</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" name="name" id="name" onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" name="email" id="email" onChange={handleChange} aria-describedby="emailHelp" />
                    {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control"  name="password" id="password" onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" name="cpassword" id="cpassword" onChange={handleChange} />
                </div>
                <button type="submit" className="btn btn-primary">Signup</button>
            </form>
        </div>
    )
}

export default Signup