import React, { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import authAPI from '../redux/actions/authService';
import PageTitle from '../components/PageTitle';
import { SuccessModal, ErrorModal } from '../components/Modal';
import { DangerAlert } from '../components/Alerts';
import SpinLoader from '../components/SpinLoader';
import { classNames } from '../helpers';

const modalTypes = {
	success: 'success',
	error: 'error',
};

function Modal({ type, open, setOpen }) {
	switch (type) {
		case modalTypes.success:
			return (
				<SuccessModal
					open={open}
					setOpen={setOpen}
					title={'Password Successfully Changed'}
				>
					Congratulations! Your password has been successfully
					changed. You can now securely log in to your account using
					your new password. If you have any questions or need further
					assistance, please don't hesitate to contact our support
					team.
				</SuccessModal>
			);
		case modalTypes.error:
			return (
				<ErrorModal
					open={open}
					setOpen={setOpen}
					title={'Password Change Error'}
				>
					We encountered an issue while changing your password. Please
					contact our support team for assistance. We apologize for
					any inconvenience this may have caused.
				</ErrorModal>
			);
		default:
			return <></>;
	}
}

const ResetPasswordConfirm = () => {
	const { uid, token } = useParams();
	const [error, setError] = useState({});
	const [disabled, setDisabled] = useState(false);
	const [changed, setChanged] = useState(false);
	const [modalType, setModalType] = useState('');
	const [openModal, setOpenModal] = useState(false);

	useEffect(() => {
		setDisabled(false);
	}, [error]);

	const confirmResetPassword = async (credentials) => {
		const response = await authAPI.confirmResetPassword(credentials);

		if (response.changed) {
			setError(null);
			setChanged(true);
			setModalType(modalTypes.success);
			setOpenModal(true);
		} else if (response.uid || response.token) {
			setError(null);
			setModalType(modalTypes.error);
			setOpenModal(true);
		} else {
			setError(response);
		}
	};

	const handleSubmit = (event) => {
		setChanged(false);
		setDisabled(true);

		event.preventDefault();
		const form = event.target;
		const formData = new FormData(form);

		const credentials = {
			uid: uid,
			token: token,
			new_password: formData.get('new_password'),
			re_new_password: formData.get('re_new_password'),
		};

		confirmResetPassword(credentials);
	};

	if (changed && !openModal) return <Navigate to="/" replace />;

	return (
		<>
			<PageTitle title="Password Reset Confirm" />
			<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
				<div className="sm:mx-auto sm:w-full sm:max-w-sm">
					<p className="text-base font-semibold text-blue-600">
						One Last Step to Change Password!
					</p>
					<h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
						Password change confirmation
					</h1>
					<p className="mt-6 text-base leading-7 text-gray-600">
						To confirm your recent password change, please enter
						your new password below and click the button below.
					</p>
				</div>

				<div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
					<form
						onSubmit={(e) => handleSubmit(e)}
						className="space-y-6"
					>
						{error && error.non_field_errors && (
							<DangerAlert
								className="col-span-full"
								detail={error.non_field_errors}
							/>
						)}
						<div>
							<label
								htmlFor="new_password"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								New Password
								<span className="mt-2 text-sm font-medium leading-6 text-red-600"> * </span>
							</label>
							{error && error.new_password && (
								<p className="mt-2 text-sm font-medium leading-6 text-red-600">
									{error.new_password}
								</p>
							)}
							<div className="mt-2">
								<input
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
									disabled={disabled}
									id="new_password"
									name="new_password"
									type="password"
									autoComplete="current-password"
									required
								/>
							</div>
						</div>

						<div>
							<label
								htmlFor="re_new_password"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Re New Password
								<span className="mt-2 text-sm font-medium leading-6 text-red-600"> * </span>
							</label>
							{error && error.re_new_password && (
								<p className="mt-2 text-sm font-medium leading-6 text-red-600">
									{error.re_new_password}
								</p>
							)}
							<div className="mt-2">
								<input
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
									disabled={disabled}
									id="re_new_password"
									name="re_new_password"
									type="password"
									autoComplete="current-password"
									required
								/>
							</div>
						</div>

						<div className="mt-10 flex items-center justify-center gap-x-6">
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
										Changing...
									</>
								) : (
									<>Confirm change</>
								)}
							</button>
							<a
								href="mailto:matigomez2173@gmail.com"
								className="text-sm font-semibold text-gray-900"
							>
								Contact support{' '}
								<span aria-hidden="true">&rarr;</span>
							</a>
						</div>
					</form>
				</div>
				<Modal
					type={modalType}
					open={openModal}
					setOpen={setOpenModal}
				/>
			</div>
		</>
	);
};

export default ResetPasswordConfirm;
