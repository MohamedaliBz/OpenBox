import box from '../../Assets/images/box.png';
import home from '../../Assets/icons/dashboard.svg';
import cart from '../../Assets/icons/cart.svg';
import supplier from '../../Assets/icons/supplier.svg';
import order from '../../Assets/icons/Order.svg';
import settings from '../../Assets/icons/settings.svg';
import logout from '../../Assets/icons/logout.svg';
import usericon from '../../Assets/icons/user.svg';
import clients from '../../Assets/icons/client-7.svg';
import { Element, Element1 } from '../SideBarElements';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthProvider'; // Import useAuth hook
import { Role } from '../../Utils/userRoles';
import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { signOut } from '../../Model/Services/auth';
import { message } from 'antd';

export default function SideBar() {
   const navigate = useNavigate()
   const {mutate : handlelogout} = useMutation(signOut , {
      onSuccess : ()=>{
         message.success('Log out successful')
         navigate('/login');
      },
   })

  const { userRole, user } = useAuth(); // Get userRole and user from context
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userRole.current || !user) {
      setLoading(false);
    }
  }, [userRole, user]);


  // Define the links with visibility based on user roles
  const links = [
    { to: "/dashboard", icon: home, name: "Dashboard", roles: [Role.Admin] },
    { to: "/inventory", icon: cart, name: "Inventory", roles: [Role.Admin, Role.StockManager, Role.WarehouseManager] },
    { to: "/suppliers", icon: supplier, name: "Suppliers", roles: [Role.Admin, Role.WarehouseManager] },
    { to: "/supplierorders", icon: order, name: "Supplier Orders", roles: [Role.Admin, Role.WarehouseManager] },
    { to: "/clients", icon: clients, name: "Clients", roles: [Role.Admin, Role.StockManager, Role.WarehouseManager] },
    { to: "/clientorders", icon: order, name: "Client Orders", roles: [Role.Admin, Role.StockManager] },
    { to: "/users", icon: usericon, name: "Users", roles: [Role.Admin] },
  ];

  const getClassName = (path: string) => window.location.pathname === path ? "text-[#1570EF]" : "text-[#5D6679]";

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="rounded-tl-none rounded-tr-lg rounded-br-lg rounded-bl-none bg-white box-border w-[280px] h-[860px] flex flex-col items-start justify-between pt-6 px-6 pb-6 text-grey-grey-600 border-r-[1px] border-solid border-grey-grey-50">
      <div className="flex flex-col items-start justify-start gap-[20px]">
        <img className="w-[68px] relative h-[51px] object-contain" alt="small-logo" src={box} />
        <div className="w-[232px] flex flex-row items-center justify-start py-2 px-4 box-border">
          <div className="flex-1 flex flex-col items-start justify-center gap-[10px]">
            {links.map(links => (
              userRole.current && links.roles.includes(userRole.current) && (
                <NavLink key={links.to} to={links.to} className={getClassName(links.to)}>
                  <Element icon={links.icon as string} name={links.name} />
                </NavLink>
              )
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col items-start justify-start text-[#5D6679]">
        <NavLink to={''} >
          <Element1 icon={settings} name={'Settings'} />
        </NavLink>
        <NavLink to={'/'} onClick={()=>{
          handlelogout()
        }}>
          <Element1 icon={logout} name={'Log Out'} />
        </NavLink>
      </div>
    </div>
  );
}
