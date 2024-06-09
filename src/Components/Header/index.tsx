import { Fragment, useState } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../../Context/AuthProvider';
import { Avatar, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { signOut } from '../../Model/Services/auth';
import { useMutation } from 'react-query';
import ProfileModalDetails from '../Modal/userProfile';

const userNotifications = [
  { name: 'notification 1' },
  { name: 'notification 2' },
  { name: 'notification 3' },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Header() {
  const navigate = useNavigate();
  const { mutate: handleLogout } = useMutation(signOut, {
    onSuccess: () => {
      message.success('Log out successful');
      navigate('/login');
    },
  });

  const { userProfile } = useAuth();
  const [isOpen, setIsOpen] = useState(false); // State to manage the modal open/close

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const userNavigation = [
    { name: 'Your Profile', action: () => setIsOpen(true) }, // Open modal on click
    { name: 'Log out', action: () => handleLogout() },
  ];

  return (
    <>
      <div className="w-[100%] h-[6rem] flex flex-row items-center justify-between py-0 px-8 box-border bg-white ml-1">
        {/* search bar */}
        <div className="group relative">
          <svg
            width="20"
            height="20"
            fill="currentColor"
            className="absolute left-3 top-1/2 -mt-2.5 text-slate-400 pointer-events-none group-focus-within:text-blue-500"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            />
          </svg>
          <input
            className="focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none w-[30rem] text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-10 ring-1 ring-slate-200 shadow-sm"
            type="text"
            aria-label="Filter projects"
            placeholder="Search product, supplier, order..."
          />
        </div>

        <div className="hidden md:block">
          <div className="ml-4 flex items-center md:ml-6">
            {/* Notification dropdown */}
            <Menu as="div" className="relative ml-3">
              <div>
                <Menu.Button className="relative rounded-full bg-gray-200 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-300">
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-blue ring-opacity-5 focus:outline-none">
                  {userNotifications.map((item) => (
                    <Menu.Item key={item.name}>
                      {({ active }) => (
                        <p
                          className={classNames(
                            active ? 'bg-gray-100' : '',
                            'block px-4 py-2 text-sm text-gray-700'
                          )}
                        >
                          {item.name}
                        </p>
                      )}
                    </Menu.Item>
                  ))}
                </Menu.Items>
              </Transition>
            </Menu>

            {/* Profile dropdown */}
            <Menu as="div" className="relative ml-3">
              <div>
                <Menu.Button className="relative flex max-w-xs items-center rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-300">
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Open user menu</span>
                  <Avatar size={34} src={userProfile?.profile_photo} alt={userProfile?.name} />
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  {userNavigation.map((item) => (
                    <Menu.Item key={item.name}>
                      {({ active }) => (
                        <a
                          onClick={item.action}
                          className={classNames(
                            active ? 'bg-gray-100' : '',
                            'block px-4 py-2 text-sm text-gray-700 cursor-pointer'
                          )}
                        >
                          {item.name}
                        </a>
                      )}
                    </Menu.Item>
                  ))}
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
      </div>

      {/* Modal for displaying user profile details */}
      {userProfile? (
        <ProfileModalDetails isOpen={isOpen} closeModal={() => setIsOpen(false)} userProfile={userProfile} />
      ): (
        <h1>..</h1>
      ) }
    </>
  );
}
