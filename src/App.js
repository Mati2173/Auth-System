import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './containers/Home';
import AllUsers from './containers/AllUsers';
import MyAccount from './containers/MyAccount'
import Signin from './containers/Signin';
import Signup from './containers/Signup';
import Activate from './containers/Activate';
import ResetPassword from './containers/ResetPassword';
import ResetPasswordConfirm from './containers/ResetPasswordConfirm';
import PageNotFound from './containers/Error404';
import Layout from './hocs/Layout';

const App = () => (
	<BrowserRouter>
		<Layout>
			<Routes>
				<Route path="/" Component={Home} />
				<Route path="/all_users" Component={AllUsers} /> 
				<Route path="/my_account" Component={MyAccount} />
				<Route path="/signin" Component={Signin} />
				<Route path="/signup" Component={Signup} />
				<Route path="/activate/:uid/:token" Component={Activate} />
				<Route path="/password/reset" Component={ResetPassword} />
				<Route path="/password/reset/confirm/:uid/:token" Component={ResetPasswordConfirm} />
				<Route path="*" Component={PageNotFound} />
			</Routes>
		</Layout>
	</BrowserRouter>
);

export default App;
