/* eslint-disable react/jsx-props-no-spreading */

import { Menu, Transition } from '@headlessui/react';
import {
  Fragment,
} from 'react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import { useNavigate } from 'react-router-dom';
import Cookies from '../services/cookies';

function MoveInactiveIcon(props: any) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M10 4H16V10" stroke="#0D9488" strokeWidth="2" />
      <path d="M16 4L8 12" stroke="#0D9488" strokeWidth="2" />
      <path d="M8 6H4V16H14V12" stroke="#0D9488" strokeWidth="2" />
    </svg>
  );
}

function MoveActiveIcon(props: any) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M10 4H16V10" stroke="#ffffff" strokeWidth="2" />
      <path d="M16 4L8 12" stroke="#ffffff" strokeWidth="2" />
      <path d="M8 6H4V16H14V12" stroke="#ffffff" strokeWidth="2" />
    </svg>
  );
}
interface IUserMenu{
  name: string
}

export default function UserMenu({ name = '' }: IUserMenu) {
  const navigate = useNavigate();
  return (

    <Menu as="div" className="relative inline-block text-left">

      <Menu.Button className="inline-flex w-full justify-center rounded-md bg-teal-600 px-4 py-2 text-sm font-medium text-zinc-50 hover:bg-zinc-200 hover:text-teal-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-opacity-75">
        {name}
        <ChevronDownIcon
          className="ml-2 -mr-1 h-5 w-5 text-zinc-50 hover:text-teal-600"
          aria-hidden="true"
        />
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1 ">
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => {
                    Cookies.removeAuth();
                    navigate('/login');
                  }}
                  type="button"
                  className={`${
                    active ? 'bg-teal-600 text-white' : 'text-gray-900'
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  {active ? (
                    <MoveActiveIcon
                      className="mr-2 h-5 w-5"
                      aria-hidden="true"
                    />
                  ) : (
                    <MoveInactiveIcon
                      className="mr-2 h-5 w-5"
                      aria-hidden="true"
                    />
                  )}
                  Logout
                </button>

              )}
            </Menu.Item>

          </div>

        </Menu.Items>
      </Transition>
    </Menu>

  );
}
