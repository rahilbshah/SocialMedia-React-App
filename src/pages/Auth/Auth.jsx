import React from 'react'
import './Auth.css'
import Logo from '../../img/logo.png'
const Auth = () => {
    return (
        <div className="Auth">
            <div className="a-left">
                <img src={Logo} alt="" />
                <div className="Webname">
                    <h1>RS Media</h1>
                    <h5>Explore The Ideas Throughout The World</h5>
                </div>
            </div>
            <LogIn />
            {/* <Signup/> */}
        </div>
    )
}
function LogIn() {
    return (
        <div className="a-right">
            <form className="infoForm authForm" style={{padding:"2rem"}}>
                <h2>Log In</h2>

                <div>
                    <input type="text" placeholder="Username" className="infoInput" name="username"
                    />
                </div>

                <div>
                    <input type="password" className="infoInput" placeholder="Password" name="password"
                    />
                </div>

                <div>
                    <span>
                        Don't have an account. Sign up
                    </span>
                    <button className="button infoButton">Login</button>
                </div>
            </form>
        </div>
    );
}
const Signup = () => {
    return (
        <div className="a-right">
            <form className="infoForm authForm">
                <h2>Sign Up</h2>
                <div>
                    <input type="text" placeholder='First Name' className='infoInput' name='firstname' />
                    <input type="text" placeholder='Last Name' className='infoInput' name='lastname' />
                </div>
                <div>
                    <input type="text" placeholder='Username' className='infoInput' name='username' />
                </div>
                <div>
                    <input type="password" name="password" placeholder='Password' className='infoInput' />
                    <input type="text" name="confirmpass" placeholder='Confirm Password' className='infoInput' />
                </div>
                <div>
                    <span>Already Have an Account. Login</span>
                </div>
                <button className="button infoButton" type='submit'>SignUp</button>
            </form>
        </div>
    )
}
export default Auth