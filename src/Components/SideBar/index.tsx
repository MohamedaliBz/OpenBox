import box from '../../Assets/images/box.png'
import home from '../../Assets/icons/dashboard.svg'
import cart from '../../Assets/icons/cart.svg'
import supplier from '../../Assets/icons/supplier.svg'
import order from '../../Assets/icons/Order.svg'
import settings from '../../Assets/icons/settings.svg'
import logout from '../../Assets/icons/logout.svg'
import user from '../../Assets/icons/user.svg'
import clients from '../../Assets/icons/client-7.svg'
import {Element, Element1  } from '../SideBarElements'
import {NavLink, useNavigate } from 'react-router-dom'
import supabase from '../../Utils/supabase'
import { message } from 'antd'

export default function SideBar() {
   const navigate = useNavigate()
   const handlelogout = async()=>{
      const { error } = await supabase.auth.signOut()
      if (error) {
         console.log(error)
      } else {
         message.success("Login out successful")
         navigate('/login')
      }
   }
   const links = [
      { to: "/dashboard", icon: home, name: "Dashboard" },
      { to: "/inventory", icon: cart , name: "Inventory" },
      { to: "/suppliers", icon: supplier, name: "Suppliers" },
      { to: "/supplierorders", icon: order, name: "Supplier Orders" },
      { to: "/clients", icon: clients, name: "Clients" },
      { to: "/clientorders", icon: order, name: "Client Orders" },
      { to: "/users", icon: user, name: "Users" },
    ];
    const getClassName = (path: string) => window.location.pathname === path ? "text-[#1570EF]" : "text-[#5D6679]";

  return (

      <div className="rounded-tl-none rounded-tr-lg rounded-br-lg rounded-bl-none bg-white box-border w-[280px] h-[860px] flex flex-col items-start justify-between pt-6 px-6 pb-6 text-grey-grey-600 border-r-[1px] border-solid border-grey-grey-50">
         <div className="flex flex-col items-start justify-start gap-[20px]">
            <img className="w-[68px] relative h-[51px] object-contain" alt="small-logo" src={box}/>
            <div className="w-[232px] flex flex-row items-center justify-start py-2 px-4 box-border">
               <div className="flex-1 flex flex-col items-start justify-center gap-[10px]">

                  {links.map(link => (
                     <NavLink key={link.to} to={link.to} className={getClassName(link.to)}>
                        <Element icon={link.icon} name={link.name} />
                     </NavLink>
                  ))}

               </div>
            </div>
         </div>
         <div className="flex flex-col items-start justify-start text-[#5D6679]">
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