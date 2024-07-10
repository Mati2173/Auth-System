import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import authAPI from '../redux/actions/authService';
import PageTitle from '../components/PageTitle';
import { formatDate } from '../helpers';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import profileIcon from '../assets/img/profile-icon.jpg';

const tableHeaders = ['Full Name', 'Date Of Birth', 'Staff Status'];

const AllUsers = () => {
    const { isStaff, accessToken } = useSelector((state) => state.auth);
    const [users, setUsers] = useState([]);
    
    const getAllUsers = async () => {
        const usersResponse = await authAPI.getAllUsers(accessToken);
        setUsers(usersResponse.users);
    };

    useEffect(() => {
        if (isStaff) getAllUsers();
    }, [isStaff]);
    
    if (!isStaff && !accessToken) return <Navigate to="/" replace />;

    return (
        <div className="mx-auto max-w-4xl py-10 px-2 sm:px-0">
            <PageTitle title="All Users" />
            <div className="overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead className="text-base text-gray-700 bg-gray-50">
                        <tr>
                            {tableHeaders.map((header) => (
                                <th
                                    key={header}
                                    scope="col"
                                    className="px-6 py-3"
                                >
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {users &&
                            users.map((user) => (
                                <tr
                                    key={user.id}
                                    className="bg-white border-b hover:bg-gray-50"
                                >
                                    <th
                                        scope="row"
                                        className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap"
                                    >
                                        <img
                                            className="w-10 h-10 rounded-full"
                                            src={user.image || profileIcon}
                                            alt="Avatar"
                                        />
                                        <div className="ps-3">
                                            <div className="text-base font-semibold">
                                                {user.first_name} {user.last_name}
                                            </div>
                                            <div className="font-normal text-gray-500">
                                                {user.email}
                                            </div>
                                        </div>
                                    </th>
                                    <td className="px-6 py-4">
                                        {formatDate(user.date_of_birth)}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            {user.is_staff ? (
                                                <CheckCircleIcon className="h-6 w-6 text-green-600" />
                                            ) : (
                                                <XCircleIcon className="h-6 w-6 text-red-600" />
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;
