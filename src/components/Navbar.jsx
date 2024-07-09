import React from 'react';
import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
} from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { classNames } from '../helpers'
import logo from '../assets/img/logo.png';

const guestLinks = [
    { name: 'Home', to: '/', current: true },
    { name: 'Sign In', to: '/signin', current: false },
    { name: 'Sign Up', to: '/signup', current: false },
    { name: 'Reset Password', to: '/password/reset', current: false },
];

const userLinks = [
    { name: 'Home', to: '/', current: true },
    { name: 'My Account', to: '/my_account', current: false },
    { name: 'Sign Out', to: '/signout', current: false },
];

const userStaffLinks = [
    { name: 'Home', to: '/', current: true },
    { name: 'My Account', to: '/my_account', current: false },
    { name: 'All Users', to: '/all_users', current: false },
    { name: 'Sign Out', to: '/signout', current: false },
];

export default function Navbar() {
    const { isAuthenticated, is_staff } = useSelector((state) => state.auth);

    let navigation = isAuthenticated ? userLinks : guestLinks;

    if (isAuthenticated && is_staff) {
        navigation = userStaffLinks;
    }

    return (
        <Disclosure as="nav" className="bg-white border-b-2 border-blue-100">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        {/* Mobile menu button*/}
                        <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-blue-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon
                                aria-hidden="true"
                                className="block h-6 w-6 group-data-[open]:hidden"
                            />
                            <XMarkIcon
                                aria-hidden="true"
                                className="hidden h-6 w-6 group-data-[open]:block"
                            />
                        </DisclosureButton>
                    </div>
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex flex-shrink-0 items-center">
                            <Link to="/">
                                <img
                                    alt="Your Company"
                                    src={logo}
                                    className="h-8 w-auto"
                                />
                            </Link>
                        </div>
                        <div className="hidden sm:ml-6 sm:block">
                            <div className="flex space-x-4">
                                {navigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        to={item.to}
                                        aria-current={
                                            item.current ? 'page' : undefined
                                        }
                                        className={classNames(
                                            item.current
                                                ? 'bg-blue-800 text-white'
                                                : 'text-blue-700 hover:bg-blue-600 hover:text-white',
                                            'rounded-md px-3 py-2 text-sm font-medium'
                                        )}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <DisclosurePanel className="sm:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2">
                    {navigation.map((item) => (
                        <DisclosureButton
                            key={item.name}
                            as={Link}
                            to={item.to}
                            aria-current={item.current ? 'page' : undefined}
                            className={classNames(
                                item.current
                                    ? 'bg-blue-800 text-white'
                                    : 'text-blue-700 hover:bg-blue-600 hover:text-white',
                                'block rounded-md px-3 py-2 text-base font-medium'
                            )}
                        >
                            {item.name}
                        </DisclosureButton>
                    ))}
                </div>
            </DisclosurePanel>
        </Disclosure>
    );
}
