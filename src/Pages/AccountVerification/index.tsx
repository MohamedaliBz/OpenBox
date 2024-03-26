import { NavLink } from "react-router-dom";
import Logo from "../../Components/CommonFormElement/logo";
import Title from "../../Components/CommonFormElement/title";
import VerificationForm from "../../Components/VerificationForm";

export default function AccountVerif() {
  return (
    <div className="login">
      <Logo/>
        <form className='formLogin'>
            <Title title={'Account verification'} subTitle={'Enter your 4 digits code that you received on your email.'}/>   
            <div className='form'>
              
                <VerificationForm nameButton="Continue" />

                
                <div className='logg'>
                  <p className='msg'>Already have an account?</p>
                  <NavLink to="/login"><button className='signup-btn' >Log in</button></NavLink> 
              </div>
          </div>
        </form>
    </div>
  )
}



