import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import authAPI from '../redux/actions/authService';
import PageTitle from '../components/PageTitle';
import { DangerAlert, SuccessAlert } from '../components/Alerts';
import SpinLoader from '../components/SpinLoader';
import { classNames } from '../helpers';

const ResetPassword = () => {
	const [error, setError] = useState({});
	const [disabled, setDisabled] = useState(false);
	const [success, setSuccess] = useState(false);
	const [userEmail, setUserEmail] = useState('');

	useEffect(() => {
		setDisabled(false);
	}, [error]);

	const sendPasswordResetEmail = async (form) => {
		const formData = new FormData(form);

		const email = formData.get('email');
		setUserEmail(email);

		const response = await authAPI.sendPasswordResetEmail(email);

		if (response.success) {
			setError(null);
			setSuccess(true);
			form.reset();
		} else {
			setError(response);
		}
	};

	const handleSubmit = (event) => {
		setSuccess(false);
		setDisabled(true);

		event.preventDefault();
		const form = event.target;

		sendPasswordResetEmail(form);
	};

	return (
		<>
			<PageTitle title="Reset Password" />
			<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
				<div className="sm:mx-auto sm:w-full sm:max-w-sm">
					<p className="text-base font-semibold text-blue-600">
						Forgot Your Password? Don't worry
					</p>
					<h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
						Password recovery
					</h1>
					<p className="mt-6 text-base leading-7 text-gray-600">
						Please enter your email address below. We'll send you
						instructions on how to reset your password.
					</p>
				</div>

				<div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
					{error && error[0] && <DangerAlert detail={error[0]} />}
					{success && userEmail && (
						<SuccessAlert
							detail={`Email sent successfully to: ${userEmail}`}
						/>
					)}
					<form
						onSubmit={(e) => handleSubmit(e)}
						className="space-y-6"
					>
						<div>
							<label
								htmlFor="email"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Email address
								<span className="mt-2 text-sm font-medium leading-6 text-red-600">
									{' '}
									*{' '}
								</span>
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
							<button
								type="submit"
								disabled={disabled}
								className={classNames(
									'flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
									disabled
										? 'bg-gray-600'
										: 'bg-blue-600 hover:bg-blue-500 focus-visible:outline-blue-600'
								)}
							>
								{disabled ? (
									<>
										<SpinLoader />
										Sending...
									</>
								) : (
									<>Send Reset Instructions</>
								)}
							</button>
						</div>
					</form>
					<p className="mt-6 text-center text-sm text-gray-500">
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

export default ResetPassword;
