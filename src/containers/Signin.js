import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { signIn } from '../redux/reducers/authSlice';
import PageTitle from '../components/PageTitle';
import { DangerAlert } from '../components/Alerts';
import SpinLoader from '../components/SpinLoader';
import { classNames } from '../helpers';
import logo from '../assets/img/logo.png';

const SignIn = () => {
	const { isAuthenticated, error } = useSelector((state) => state.auth);
	const [disabled, setDisabled] = useState(false);
	const dispatch = useDispatch();

	useEffect(() => {
		setDisabled(false);
	}, [error]);

	const handleSubmit = async (event) => {
		setDisabled(true);
		
		event.preventDefault();
		const form = event.target;
		const formData = new FormData(form);

		const credentials = {
			email: formData.get('email'),
			password: formData.get('password'),
		};

		dispatch(signIn(credentials));
	};

	if (isAuthenticated) return <Navigate to="/" replace />;

	return (
		<>
			<PageTitle title="Sign In" />
			<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
				<div className="sm:mx-auto sm:w-full sm:max-w-sm">
					<img
						alt="Auth System"
						src={logo}
						className="mx-auto h-10 w-auto"
					/>
					<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
						Sign in to your account
					</h2>
				</div>
				<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
					{error && error.detail && (
						<DangerAlert detail={error.detail} />
					)}
					<form
						onSubmit={(e) => handleSubmit(e)}
						className="space-y-6"
					>
						<div>
							<label
								htmlFor="email"
								className="text-sm font-medium leading-6 text-gray-900"
							>
								Email address
								<span className="mt-2 text-sm font-medium leading-6 text-red-600"> * </span>
							</label>

							{error && error.email && (
								<p className="mt-2 text-sm font-medium leading-6 text-red-600">
									{error.email}
								</p>
							)}

							<div className="mt-2">
								<input
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
									disabled={disabled}
									id="email"
									name="email"
									type="email"
									autoComplete="email"
									required
								/>
							</div>
						</div>

						<div>
							<div className="flex items-center justify-between">
								<label
									htmlFor="password"
									className="block text-sm font-medium leading-6 text-gray-900"
								>
									Password
									<span className="mt-2 text-sm font-medium leading-6 text-red-600"> * </span>
								</label>
								<div className="text-sm">
									<Link
										to="/password/reset"
										className="font-semibold text-blue-600 hover:text-blue-500"
									>
										Forgot password?
									</Link>
								</div>
							</div>

							{error && error.password && (
								<p className="mt-2 text-sm font-medium leading-6 text-red-600">
									{error.password}
								</p>
							)}

							<div className="mt-2">
								<input
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
									disabled={disabled}
									id="password"
									name="password"
									type="password"
									autoComplete="current-password"
									required
								/>
							</div>
						</div>

						<div>
							<button
								disabled={disabled}
								className={classNames(
									'flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
									disabled
										? 'bg-gray-600'
										: 'bg-blue-600 hover:bg-blue-500 focus-visible:outline-blue-600'
								)}
							>
								{disabled ? (
									<>
										<SpinLoader />
										Signing in...
									</>
								) : (
									<>Sign in</>
								)}
							</button>
						</div>
					</form>
					<p className="mt-10 text-center text-sm text-gray-500">
						Don't have an account?{' '}
						<Link
							to="/signup"
							className="font-semibold leading-6 text-blue-600 hover:text-blue-500"
						>
							Sign Up
						</Link>
					</p>
				</div>
			</div>
		</>
	);
};

export default SignIn;
