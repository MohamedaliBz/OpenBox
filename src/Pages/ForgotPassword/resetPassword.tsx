import { NavLink } from "react-router-dom";
import Logo from "../../Components/CommonFormElement/logo";
import Title from "../../Components/CommonFormElement/title";
import { ResetPassForm } from "../../Components/ResetPasswordForm";

export default function ResetPassword() {
  return (
    <div className='login'>
        <Logo/>
        <form className='formLogin'>

            <Title title={'Reset Password'} subTitle={'Set the new password for your account so you can login and access all features.'}/>

            <div className='form'>
    
                <ResetPassForm nameButton='Update Password' />

                <div className='logg'>
                    <p className='msg'>Don’t have an account? </p>
                    <NavLink to="/signup"><button className='signup-btn' >Sign up</button></NavLink> 
                </div>
          </div>
        </form>
    </div>
  )
}