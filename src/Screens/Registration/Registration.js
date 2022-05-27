import React, { useState } from 'react'
import './Registration.css'
import { useDispatch } from 'react-redux';
//import { login } from '../../features/userSlice';
import { registerUser } from '../../apis/authentication';
import { useNavigate } from 'react-router-dom';
 
const Login = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cnic, setNIC] = useState("");
    const [address, setAddress] = useState("");
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");

    //const dispatch = useDispatch();

    const registered = (e) => {
        e.preventDefault();

        //localStorage.setItem("user", user);

        registerUser({name, cnic, email, password, address, country, city}).then((res) => res.json()).then((user) => {
            if(user){
                //localStorage.setItem("user", JSON.stringify(user));
                navigate('/');
            }
        }).catch((e) => console.log(e))
    }

    return (
        <div className="login">
            <form className="login__form" onSubmit={(e) => registered(e)}>
                <h1>Register Here!</h1>
                <input type="name" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                <input type="text" placeholder="Nic" value={cnic} onChange={(e) => setNIC(e.target.value)} />
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <input type="address" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
                <input type="country" placeholder="Country" value={country} onChange={(e) => setCountry(e.target.value)} />
                <input type="city" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
                <button type="submit" className="submit__btn">
                    Submit
                </button>
                <h4 className='not__registered'>Already Registered?? <a href='/'>Login here</a></h4>
            </form>
        </div>
    )
}

export default Login
