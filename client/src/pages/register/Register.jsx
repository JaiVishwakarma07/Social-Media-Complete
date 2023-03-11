import React, { useState } from 'react'
import "./Register.scss"
import { Link } from 'react-router-dom'
import axios from "axios"

const Register = () => {

    const [inputs, setInputs] = useState({
        username: "",
        email: "",
        password: "",
        name: "",
    })
    const [err, setErr] = useState(null)

    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
    //console.log(inputs)

    const handleClick = async (e) => {
        e.preventDefault()
        try {
            await axios.post("http://locahost:8800/api/auth/register", inputs)
        } catch (err) {
            setErr(err.response.data);
        }
    }

    return (
        <div className="register">
            <div className="card">
                <div className="left">
                    <h1>Jai Social</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor inci
                        didunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitati
                        on ullamco laboris nisi ut aliquip ex ea commodo consequat..</p>
                    <span>Do have a account?</span>
                    <Link to="/login">
                        <button>Login</button>
                    </Link>
                </div>
                <div className="right">
                    <h1>Register</h1>
                    <form>
                        <input type="text" placeholder="Username" name="username" onChange={handleChange} />
                        <input type="email" placeholder="Email" name="email" onChange={handleChange} />
                        <input type="password" placeholder="Password" name="password" onChange={handleChange} />
                        <input type="text" placeholder="Name" name="name" onChange={handleChange} />
                        {err && err}
                        <button onClick={handleClick}>Register</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register;