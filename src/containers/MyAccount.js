import React from 'react';

const user = {
	first_name: 'Leslie',
	last_name: 'Alexander',
	email: 'leslie.alexander@example.com',
	date_of_birth: '21/07/2003',
	image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
};

const MyAccount = () => {
	return (
		<div className="bg-white">
			<div className="mx-auto max-w-2xl py-10">
				<div>
					<div className="px-4 sm:px-0">
						<h3 className="text-base font-semibold leading-7 text-gray-900">
							User Account Information
						</h3>
						<p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
							Account details
						</p>
					</div>
					<div className="mt-6 border-t border-gray-100">
						<dl className="divide-y divide-gray-100">
							<div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
								<dt className="text-sm font-medium leading-6 text-gray-900">
									First name
								</dt>
								<dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
									{user.first_name}
								</dd>
							</div>
						</dl>
					</div>
					<div className="mt-6 border-t border-gray-100">
						<dl className="divide-y divide-gray-100">
							<div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
								<dt className="text-sm font-medium leading-6 text-gray-900">
									Last name
								</dt>
								<dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
									{user.last_name}
								</dd>
							</div>
						</dl>
					</div>
					<div className="mt-6 border-t border-gray-100">
						<dl className="divide-y divide-gray-100">
							<div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
								<dt className="text-sm font-medium leading-6 text-gray-900">
									Email address
								</dt>
								<dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
									{user.email}
								</dd>
							</div>
						</dl>
					</div>
					<div className="mt-6 border-t border-gray-100">
						<dl className="divide-y divide-gray-100">
							<div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
								<dt className="text-sm font-medium leading-6 text-gray-900">
									Date of birth
								</dt>
								<dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
									{user.date_of_birth}
								</dd>
							</div>
						</dl>
					</div>
					<div className="mt-6 border-t border-gray-100">
						<dl className="divide-y divide-gray-100">
							<div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
								<dt className="text-sm font-medium leading-6 text-gray-900">
									Image
								</dt>
								<dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
									<img
										alt=""
										src={user.image}
										className="h-20 w-20 rounded-full flex-none bg-gray-50"
									/>
								</dd>
							</div>
						</dl>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MyAccount;
