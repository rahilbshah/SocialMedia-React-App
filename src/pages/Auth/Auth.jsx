import React from 'react'
import './Auth.css'
import { useState } from 'react'
import Logo from '../../img/logo.png'
import { useDispatch,useSelector } from 'react-redux'
import { logIn, signUp } from '../../actions/AuthAction'
const Auth = () => {
    const loading=useSelector((state)=>state.authReducer.loading)
    const [isSignUp, setIsSignUp] = useState(true)
    const [data, setData] = useState({firstname:"",lastname:"",username:"",password:"",confirmpass:""})
    const [confirmPass, setConfirmPass] = useState(true)
    console.log(loading);
    const dispatch=useDispatch();

    const resetForm = () => {
        setData({firstname:"",lastname:"",username:"",password:"",confirmpass:""});
        setConfirmPass(true);
      };
    
      // handle Change in input
      const handleChange = (e) => {
        setData({...data,[e.target.name]:e.target.value})
      };
    
      // Form Submission
      const handleSubmit=(e)=>{
        e.preventDefault();

        if(isSignUp){
            if(data.password===data.confirmpass){
                dispatch(signUp(data))
            }else{
                setConfirmPass(false);
            }
        }else{
            dispatch(logIn(data))
        }
      }



    return (
        <div className="Auth">
            {/* Left Side */}
            <div className="a-left">
                <img src={Logo} alt="" />
                <div className="Webname">
                    <h1>RS Media</h1>
                    <h5>Explore The Ideas Throughout The World</h5>
                </div>
            </div>
            {/* Right Side */}
            <div className="a-right">
                <form className="infoForm authForm" onSubmit={handleSubmit} >
                   <h2>{isSignUp ? "Sign Up" : "LogIn"}</h2>
                   {isSignUp &&
                        <div>
                            <input type="text" placeholder='First Name' className='infoInput' name='firstname' onChange={handleChange} value={data.firstname} />
                            <input type="text" placeholder='Last Name' className='infoInput' name='lastname' onChange={handleChange} value={data.lastname} />
                        </div>
                     }
                    <div>
                        <input type="text" placeholder='Username' className='infoInput' name='username' onChange={handleChange} value={data.username} />
                    </div>
                    <div>
                        <input type="password" name="password" placeholder='Password' className='infoInput' onChange={handleChange} value={data.password} />
                        {isSignUp && 
                        <input type="password" name="confirmpass" placeholder='Confirm Password' className='infoInput' onChange={handleChange} value={data.confirmpass} />
                        }
                    </div>
                    <div style={{display:confirmPass && "none"}}>
                        <span style={{color:"var(--orange)",alignSelf:"center"}}>* Confirm Password is Not Matching</span>
                    </div>
                    <div>
                        <span>{isSignUp ? "Already Have an Account. " : "Don't have an account. "}
                          <span style={{cursor:"pointer",color:"var(--orange)"}} onClick={()=>{setIsSignUp((prev)=>!prev); resetForm()} } >{isSignUp?"LogIn" : "SignUp"}</span> </span>
                    </div>
                    <button className="button infoButton"type="submit" disabled={loading}>{loading? "Loading..." : isSignUp ? "SignUp" : "Login"}</button>
                </form>
            </div>
        </div>
    )
}
export default Auth