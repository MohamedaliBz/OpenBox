import { NavLink } from "react-router-dom"
import "./index.css"
import Logo from "../../Components/CommonFormElement/logo"
import Title from "../../Components/CommonFormElement/title"
import { MyForm } from "../../Components/LoginForm"


export default function Login() {
  return (
    <div className='login'>
        <Logo/>
        <form className='formLogin'>

            <Title title={'Log in to your account'} subTitle={'Welcome back! Please enter your details.'}/>

            <div className='form'>
    
                <MyForm nameButton='Sign in'>
                    <div className='msgRemember'>
                        <div className='check'>
                            <input type="checkbox" />
                            <p className='msg'>Remember for 30 day</p> 
                        </div>
                        <NavLink to="/forgotPassword"><button className='forgot' >Forgot password</button></NavLink>
                    </div>
                </MyForm >

                <div className='log'>
                    <p className='msg'>Don’t have an account? </p>
                    <NavLink to="/signup"><button className='signup-btn' >Sign up</button></NavLink> 
                </div>
          </div>
        </form>
    </div>
  )
}