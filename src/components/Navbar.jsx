import {
	Disclosure,
	DisclosureButton,
	DisclosurePanel,
	Menu,
	MenuButton,
	MenuItem,
	MenuItems,
} from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import logo from '../assets/img/logo192.png'

const navigation = [
	{ name: 'Home', to: '/', current: true },
	{ name: 'All Users', to: '/all_users', current: false },
	{ name: 'My Account', to: '/my_account', current: false },
	{ name: 'Sign In', to: '/signin', current: false },
	{ name: 'Sign Up', to: '/signup', current: false },
	{ name: 'Activate Account', to: '/activate/:uid/:token', current: false },
	{ name: 'Password Reset', to: '/password/reset', current: false },
	{ name: 'Password Reset Confirm', to: '/password/reset/confirm/:uid/:token', current: false },
	{ name: '404 Page', to: '/error-404', current: false },
];

function classNames(...classes) {
	return classes.filter(Boolean).join(' ');
}

export default function Navbar() {
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
							<Link to='/'>
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
					<div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
						{/* Profile dropdown */}
						<Menu as="div" className="relative ml-3">
							<div>
								<MenuButton className="relative flex rounded-full bg-blue-700 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-700">
									<span className="absolute -inset-1.5" />
									<span className="sr-only">
										Open user menu
									</span>
									<img
										alt=""
										src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
										className="h-8 w-8 rounded-full"
									/>
								</MenuButton>
							</div>
							<MenuItems
								transition
								className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
							>
								<MenuItem>
									<Link
										to="/my_account"
										className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-blue-100"
									>
										Your Profile
									</Link>
								</MenuItem>
								<MenuItem>
									<Link
										to="#"
										className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-blue-100"
									>
										Sign out
									</Link>
								</MenuItem>
							</MenuItems>
						</Menu>
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
