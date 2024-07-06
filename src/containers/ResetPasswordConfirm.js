import React from 'react';

const ResetPasswordConfirm = () => (
	<>
		<main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
			<div className="text-center">
				<p className="text-base font-semibold text-blue-600">
					One Last Step to Change Password!
				</p>
				<h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
					Password change confirmation
				</h1>
				<p className="mt-6 text-base leading-7 text-gray-600">
					To confirm your recent password change, click the button
					below.
				</p>
				<div className="mt-10 flex items-center justify-center gap-x-6">
					<button
						href="#"
						className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
					>
						Confirm change
					</button>
					<a
						href="mailto:matigomez2173@gmail.com"
						className="text-sm font-semibold text-gray-900"
					>
						Contact support <span aria-hidden="true">&rarr;</span>
					</a>
				</div>
			</div>
		</main>
	</>
);

export default ResetPasswordConfirm;
