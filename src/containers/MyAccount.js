import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import PageTitle from '../components/PageTitle';
import { formatDate } from '../helpers';
import profileIcon from '../assets/img/profile-icon.jpg';

const MyAccount = () => {
    const { isAuthenticated, user } = useSelector((state) => state.auth);

    if (!isAuthenticated) return <Navigate to="/signin" />;

    const userInfo = [
        { name: 'First name', value: user.first_name },
        { name: 'Last name', value: user.last_name },
        { name: 'Email', value: user.email },
        { name: 'Date of birth', value: formatDate(user.date_of_birth) },
    ];

    return (
        <div className="bg-white">
            <PageTitle title="My Account" />
            <div className="mx-auto max-w-2xl py-10">
                <div>
                    <div className="px-4 sm:px-0">
                        <h3 className="text-base font-semibold leading-7 text-gray-900">
                            User Account Information
                        </h3>
                        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                            Account details
                        </p>
                    </div>
                    {userInfo.map((info) => (
                        <div
                            key={info.name}
                            className="mt-6 border-t border-gray-100"
                        >
                            <dl className="divide-y divide-gray-100">
                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900">
                                        {info.name}
                                    </dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                        {info.value}
                                    </dd>
                                </div>
                            </dl>
                        </div>
                    ))}
                    <div className="mt-6 border-t border-gray-100">
                        <dl className="divide-y divide-gray-100">
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900">
                                    Image
                                </dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    <img
                                        alt="Avatar"
                                        src={user.image || profileIcon}
                                        className="h-20 w-20 rounded-full flex-none bg-gray-50"
                                    />
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyAccount;
