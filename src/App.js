import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { verifySession } from './redux/reducers/authSlice';
import Home from './containers/Home';
import AllUsers from './containers/AllUsers';
import MyAccount from './containers/MyAccount';
import SignIn from './containers/SignIn';
import SignUp from './containers/SignUp';
import SignOut from './containers/SignOut';
import Activate from './containers/Activate';
import ResetPassword from './containers/ResetPassword';
import ResetPasswordConfirm from './containers/ResetPasswordConfirm';
import PageNotFound from './containers/Error404';
import Layout from './hocs/Layout';

const App = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(verifySession());
	});

	return (
		<BrowserRouter>
			<Layout>
				<Routes>
					<Route path="/" Component={Home} />
					<Route path="/all_users" Component={AllUsers} />
					<Route path="/my_account" Component={MyAccount} />
					<Route path="/signin" Component={SignIn} />
					<Route path="/signup" Component={SignUp} />
					<Route path="/signout" Component={SignOut} />
					<Route path="/activate/:uid/:token" Component={Activate} />
					<Route path="/password/reset" Component={ResetPassword} />
					<Route path="/password/reset/confirm/:uid/:token" Component={ResetPasswordConfirm} />
					<Route path="*" Component={PageNotFound} />
				</Routes>
			</Layout>
		</BrowserRouter>
	);
};

export default App;
