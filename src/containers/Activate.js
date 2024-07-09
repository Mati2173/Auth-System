import React, { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import authAPI from '../redux/actions/authService';
import PageTitle from '../components/PageTitle';
import { SuccessModal, WarningModal, ErrorModal } from '../components/Modal';
import SpinLoader from '../components/SpinLoader';
import { classNames } from '../helpers';

const modalTypes = {
	success: 'success',
	warning: 'warning',
	error: 'error',
};

function Modal({ type, open, setOpen }) {
	switch (type) {
		case modalTypes.success:
			return (
				<SuccessModal
					open={open}
					setOpen={setOpen}
					title={'Account Successfully Activated'}
				>
					Congratulations! Your account has been successfully
					activated. You can now sign in and start using our site.
					Enjoy all the features and services we offer. If you have
					any questions or need support, feel free to reach out to our
					customer service team.
				</SuccessModal>
			);
		case modalTypes.warning:
			return (
				<WarningModal
					open={open}
					setOpen={setOpen}
					title={'Account Already Activated'}
				>
					Your account has already been activated. You can sign in and
					start using our site immediately. If you have any questions
					or need support, feel free to reach out to our customer
					service team.
				</WarningModal>
			);
		case modalTypes.error:
			return (
				<ErrorModal
					open={open}
					setOpen={setOpen}
					title={'Activation Error'}
				>
					We encountered an issue while activating your account.
					Please contact our support team for assistance. We apologize
					for any inconvenience this may have caused.
				</ErrorModal>
			);
		default:
			return <></>;
	}
}

const Activate = () => {
	const { uid, token } = useParams();
	const [disabled, setDisabled] = useState(false);
	const [activated, setActivated] = useState(false);
	const [modalType, setModalType] = useState('');
	const [openModal, setOpenModal] = useState(false);

	const activateUser = async (credentials) => {
		const userResponse = await authAPI.activateUser(credentials);

		if (userResponse.activated) {
			setActivated(true);
			setModalType(modalTypes.success);
		} else if (userResponse.alreadyActive) {
			setModalType(modalTypes.warning);
		} else {
			setModalType(modalTypes.error);
		}
		
		setDisabled(false);
		setOpenModal(true);
	};

	const handleClick = () => {
		setDisabled(true);

		const credentials = { uid: uid, token: token };

		activateUser(credentials);
	};

	if (activated && !openModal) return <Navigate to="/" replace />;

	return (
		<main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
			<PageTitle title="Activate User" />
			<div className="text-center">
				<p className="text-base font-semibold text-blue-600">
					One Last Step to Get Started!
				</p>
				<h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
					Activate your account
				</h1>
				<p className="mt-6 text-base leading-7 text-gray-600">
					To complete your registration, please click the button below
					to activate your account.
				</p>
				<div className="mt-10 flex items-center justify-center gap-x-6">
					<button
						disabled={disabled}
						onClick={handleClick}
						className={classNames(
							'flex rounded-md px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
							disabled
								? 'bg-gray-600'
								: 'bg-blue-600 hover:bg-blue-500 focus-visible:outline-blue-600'
						)}
					>
						{disabled ? (
							<>
								<SpinLoader />
								Activating...
							</>
						) : (
							<>Activate</>
						)}
					</button>
					<a
						href="mailto:matigomez2173@gmail.com"
						className="text-sm font-semibold text-gray-900"
					>
						Contact support <span aria-hidden="true">&rarr;</span>
					</a>
				</div>
			</div>
			<Modal type={modalType} open={openModal} setOpen={setOpenModal} />
		</main>
	);
};

export default Activate;
