import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import authAPI from '../redux/actions/authService';
import PageTitle from '../components/PageTitle';
import { SuccessModal } from '../components/Modal';
import { DangerAlert } from '../components/Alerts';
import SpinLoader from '../components/SpinLoader';
import { classNames } from '../helpers';
import profileIcon from '../assets/img/profile-icon.jpg';

const SignUp = () => {
	const [error, setError] = useState({});
	const [disabled, setDisabled] = useState(false);
	const [registered, setRegistered] = useState(false);
	const [openModal, setopenModal] = useState(false);
	const [selectedImage, setSelectedImage] = useState(null);

	useEffect(() => {
		setDisabled(false);
	}, [error]);

	const handleImageChange = (event) => {
		if (event.target.files && event.target.files[0]) {
			const file = event.target.files[0];

			const reader = new FileReader();

			reader.readAsDataURL(file);

			reader.onloadend = (e) => {
				setSelectedImage(reader.result);
			};
		}
	};

	const createUser = async (credentials) => {
		const userResponse = await authAPI.createUser(credentials);

		if (userResponse.registered) {
			setError(null);
			setopenModal(true);
			setRegistered(true);
		} else {
			setError(userResponse);
			window.scrollTo(0, 0);
		}
	};

	const handleSubmit = (event) => {
		setDisabled(true);

		event.preventDefault();
		const form = event.target;
		const formData = new FormData(form);

		const credentials = {
			email: formData.get('email'),
			password: formData.get('password'),
			re_password: formData.get('re-password'),
			first_name: formData.get('first-name'),
			last_name: formData.get('last-name'),
			date_of_birth: formData.get('bday'),
			image: formData.get('image'),
		};

		createUser(credentials);
	};

	if (registered && !openModal) return <Navigate to="/" replace />;

	return (
		<div className="bg-white">
			<PageTitle title="Sign Up" />
			<div className="sm:mx-auto sm:w-full sm:max-w-sm">
				<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
					Sign Up and Create Your Account
				</h2>
			</div>
			<div className="mx-auto max-w-2xl py-10 px-4 sm:px-0">
				<form onSubmit={(e) => handleSubmit(e)}>
					<div className="space-y-12">
						<div className="border-b border-gray-900/10 pb-12">
							<h2 className="text-base font-semibold leading-7 text-gray-900">
								Account Information
							</h2>
							<p className="mt-1 text-sm leading-6 text-gray-600">
								Please provide the necessary information to
								create your account. You will use these details
								to sign in.
							</p>
							<div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
								<div className="col-span-full">
									<label
										htmlFor="email"
										className="block text-sm font-medium leading-6 text-gray-900"
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
								<div className="col-span-full">
									<label
										htmlFor="password"
										className="block text-sm font-medium leading-6 text-gray-900"
									>
										Password
										<span className="mt-2 text-sm font-medium leading-6 text-red-600"> * </span>
									</label>
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
								<div className="col-span-full">
									<label
										htmlFor="re-password"
										className="block text-sm font-medium leading-6 text-gray-900"
									>
										Re Password
										<span className="mt-2 text-sm font-medium leading-6 text-red-600"> * </span>
									</label>
									{error && error.re_password && (
										<p className="mt-2 text-sm font-medium leading-6 text-red-600">
											{error.re_password}
										</p>
									)}
									<div className="mt-2">
										<input
											className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
											disabled={disabled}
											id="re-password"
											name="re-password"
											type="password"
											autoComplete="current-password"
											required
										/>
									</div>
								</div>
								{error && error.non_field_errors && (
									<DangerAlert
										className="col-span-full"
										detail={error.non_field_errors}
									/>
								)}
							</div>
						</div>

						<div className="border-b border-gray-900/10 pb-12">
							<h2 className="text-base font-semibold leading-7 text-gray-900">
								Personal Information
							</h2>
							<p className="mt-1 text-sm leading-6 text-gray-600">
								Provide your personal details to help us
								personalize your experience and communicate with
								you effectively.
							</p>

							<div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
								<div className="sm:col-span-3">
									<label
										htmlFor="first-name"
										className="block text-sm font-medium leading-6 text-gray-900"
									>
										First name
										<span className="mt-2 text-sm font-medium leading-6 text-red-600"> * </span>
									</label>
									{error && error.first_name && (
										<p className="mt-2 text-sm font-medium leading-6 text-red-600">
											{error.first_name}
										</p>
									)}
									<div className="mt-2">
										<input
											className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
											disabled={disabled}
											id="first-name"
											name="first-name"
											type="text"
											autoComplete="given-name"
											required
										/>
									</div>
								</div>

								<div className="sm:col-span-3">
									<label
										htmlFor="last-name"
										className="block text-sm font-medium leading-6 text-gray-900"
									>
										Last name
										<span className="mt-2 text-sm font-medium leading-6 text-red-600"> * </span>
									</label>
									{error && error.last_name && (
										<p className="mt-2 text-sm font-medium leading-6 text-red-600">
											{error.last_name}
										</p>
									)}
									<div className="mt-2">
										<input
											className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
											disabled={disabled}
											id="last-name"
											name="last-name"
											type="text"
											autoComplete="family-name"
											required
										/>
									</div>
								</div>

								<div className="col-span-full">
									<label
										htmlFor="street-address"
										className="block text-sm font-medium leading-6 text-gray-900"
									>
										Date Of Birth
										<span className="mt-2 text-sm font-medium leading-6 text-red-600"> * </span>
									</label>
									{error && error.date_of_birth && (
										<p className="mt-2 text-sm font-medium leading-6 text-red-600">
											This field may not be blank.
										</p>
									)}
									<div className="mt-2">
										<input
											className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
											disabled={disabled}
											id="bday"
											name="bday"
											type="date"
											autoComplete="bday"
											required
										/>
									</div>
								</div>

								<div className="col-span-full">
									<label
										htmlFor="photo"
										className="block text-sm font-medium leading-6 text-gray-900"
									>
										Photo
									</label>
									<div className="mt-2 flex items-center gap-x-3">
										<img
											alt="Avatar"
											src={selectedImage || profileIcon}
											className="h-16 w-16 rounded-full text-gray-300 object-cover"
										/>
										<div className="mt-2">
											<input
												id="image"
												disabled={disabled}
												name="image"
												type="file"
												accept="image/*"
												onChange={(e) =>
													handleImageChange(e)
												}
											/>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className="mt-6 flex items-center justify-end gap-x-6">
						<Link
							to="/"
							className="text-sm font-semibold leading-6 text-gray-900"
						>
							Cancel
						</Link>
						<button
							type="submit"
							disabled={disabled}
							className={classNames(
								'flex rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
								disabled
									? 'bg-gray-600'
									: 'bg-blue-600 hover:bg-blue-500 focus-visible:outline-blue-600'
							)}
						>
							{disabled ? (
								<>
									<SpinLoader />
									Signing up...
								</>
							) : (
								<>Sign up</>
							)}
						</button>
					</div>
				</form>
			</div>
			<SuccessModal
				open={openModal}
				setOpen={setopenModal}
				title={'Account Successfully Registered'}
			>
				Thank you for registering! Your account has been successfully
				created. Please check your email for a confirmation message to
				complete the registration process. If you do not receive the
				email, please check your spam folder or contact us for
				assistance.
			</SuccessModal>
		</div>
	);
};

export default SignUp;
