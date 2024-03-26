import { NavLink } from "react-router-dom"
import Logo from "../../Components/CommonFormElement/logo"
import Title from "../../Components/CommonFormElement/title"
import { ForgotPassForm } from "../../Components/ForgotPass"
import '../ForgotPassword/forgotPassword.css'
export default function Forgotpassword() {
  return (
    <div className='login'>
        <Logo/>
        <form className='formLogin'>
            <Title title={'Forgot Passwordt'} subTitle={'Enter your email for the verification process , we will send 4 digits code to your email.'}/>   
            <div className='form'>
                <ForgotPassForm nameButton="Continue"/>
                <div className='logg'>
                  <p className='msg'>Already have an account?</p>
                  <NavLink to="/login"><button className='signup-btn' >Log in</button></NavLink> 
              </div>
          </div>
        </form>
    </div>
  )
}