import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { signOut } from '../redux/reducers/authSlice';
import PageTitle from '../components/PageTitle';

const SignOut = () => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const wasAuthenticatedRef = useRef(isAuthenticated);
    const dispatch = useDispatch();

    useEffect(() => {
        if (isAuthenticated) dispatch(signOut());
    });

    if (!wasAuthenticatedRef.current) return <Navigate to="/" replace />;

    return (
        <>
            <PageTitle title="Sign Out" />
            <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
                <div className="text-center">
                    <p className="text-base font-semibold text-blue-700">
                        You Have Successfully Signed Out
                    </p>
                    <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                        Thank you for using Auth System
                    </h1>
                    <p className="mt-6 text-base leading-7 text-gray-600">
                        We hope to see you again soon. If you need to access
                        your account again, simply sign in.
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <Link
                            to="/signin"
                            className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                        >
                            Sign In Again
                        </Link>
                        <Link
                            to="/"
                            className="text-sm font-semibold text-gray-900"
                        >
                            Go back home <span aria-hidden="true">&rarr;</span>
                        </Link>
                    </div>
                </div>
            </main>
        </>
    );
};

export default SignOut;
