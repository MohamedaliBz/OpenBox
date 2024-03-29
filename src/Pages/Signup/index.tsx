import { NavLink } from "react-router-dom"
import Logo from "../../Components/CommonFormElement/logo"
import Title from "../../Components/CommonFormElement/title"
import { SignupForm } from "../../Components/SignupForm"

export default function createAccount() {
  return (
    <div className='login'>
        <Logo/>
        <div className='formLogin'>

            <Title title={'Create an account'} subTitle={'Start your 30-day free trial.'}/>
            <div className='form'>

              <SignupForm nameButton="Get started"/>

              <div className='log'>
                  <p className='msg'>Already have an account?</p>
                  <NavLink to="/login"><button className='signup-btn' >Log in</button></NavLink> 
              </div>
          </div>
        </div>
    </div>
  )
}