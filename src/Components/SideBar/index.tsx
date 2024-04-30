import box from '../../Assets/images/box.png'
import home from '../../Assets/icons/home.png'
import inventory from '../../Assets/icons/inventory.png'
import report from '../../Assets/icons/report.png'
import supplier from '../../Assets/icons/Suppliers.png'
import order from '../../Assets/icons/order.png'
import store from '../../Assets/icons/Manage Store.png'
import settings from '../../Assets/icons/settings.png'
import logout from '../../Assets/icons/Log Out.png'
import {Element, Element1  } from '../SideBarElements'
import {NavLink } from 'react-router-dom'

export default function SideBar() {

   const handlelogout =()=>{
      // logout with supabase
   }
  return (

      <div className="rounded-tl-none rounded-tr-lg rounded-br-lg rounded-bl-none bg-white box-border w-[280px] h-[860px] flex flex-col items-start justify-between pt-6 px-6 pb-8 text-grey-grey-600 border-r-[1px] border-solid border-grey-grey-50">
         <div className="flex flex-col items-start justify-start gap-[20px]">
            <img className="w-[68px] relative h-[51px] object-contain" alt="small-logo" src={box}/>
            <div className="w-[232px] flex flex-row items-center justify-start py-2 px-4 box-border">
               <div className="flex-1 flex flex-col items-start justify-center gap-[12px]">

                  <NavLink to="/">
                     <Element icon={home} name={'Dashobard'}  />
                  </NavLink>
                  <NavLink to="/inventory">
                     <Element icon={inventory} name={'Inventory'}  />
                  </NavLink>
                   <NavLink to="/">
                     <Element icon={report} name={'Reports'}  />
                  </NavLink>
                  <NavLink to="/">
                     <Element icon={supplier} name={'Suppliers'}  />
                  </NavLink>
                   <NavLink to="/">
                     <Element icon={order} name={'Orders'}  />
                  </NavLink> 
                  <NavLink to="/">
                     <Element icon={store} name={'Manage Store'}  />
                  </NavLink>

               </div>
            </div>
         </div>

         <div className="flex flex-col items-start justify-start gap-[12px]">
            <NavLink to={'/'} >
               <Element1 icon={settings} name={'Settings'} />
            </NavLink>
            <NavLink to={'/'} onClick={handlelogout}>
               <Element1 icon={logout} name={'Log Out'} />
            </NavLink>
         </div>
      </div>
  )
}