import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import PageTitle from '../components/PageTitle';

const Home = () => {
	const { user } = useSelector((state) => state.auth);

	const title = user
		? `Welcome ${user.first_name} ${user.last_name}`
		: 'Welcome to Auth System';

	return (
		<div className="bg-white">
			<PageTitle title="Home" />
			<div className="mx-auto max-w-2xl py-10">
				<div className="hidden sm:mb-8 sm:flex sm:justify-center">
					<div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
						Visit my GitHub profile{' '}
						<Link
							to="https://github.com/Mati2173"
							target="_blank"
							className="font-semibold text-blue-600"
						>
							<span
								aria-hidden="true"
								className="absolute inset-0"
							/>
							Mati2173 <span aria-hidden="true">&rarr;</span>
						</Link>
					</div>
				</div>
				<div className="text-center">
					<h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
						{title}
					</h1>
					<p className="mt-6 text-lg leading-8 text-gray-600">
						This is a test project for user authentication with
						Django Rest Framework and Djoser for the backend, and
						React with Redux for the frontend, providing a seamless
						and secure experience.
					</p>
					{!user && (
						<div className="mt-10 flex items-center justify-center gap-x-6">
							<Link
								to="/signup"
								className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
							>
								Sign up
							</Link>
							<Link
								to="/signin"
								className="text-sm font-semibold leading-6 text-gray-900"
							>
								Sign in <span aria-hidden="true">→</span>
							</Link>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Home;
