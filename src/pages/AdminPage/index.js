import React, { useCallback, useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../..";
import { Statuses } from "../../utils/consts.js";
import { fetchUsers } from "../../http/userAPI.js";

export const AdminPage = observer(() => {
    const { user } = useContext(Context);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [selectAll, setSelectAll] = useState(false);

    const getAndSetUsers = useCallback(async () => {
        const fetchedUsers = await fetchUsers();
        user.setUsers(fetchedUsers);
    }, [user]);

    useEffect(() => {
        const fetchData = async () => {
            getAndSetUsers();
        };

        fetchData();
    }, [getAndSetUsers]);

    const toggleSelectAll = () => {
        setSelectAll(!selectAll);
        if (!selectAll) {
            setSelectedUsers(user.users.map((user) => user.email));
        } else {
            setSelectedUsers([]);
        }
    };

    const handleUserCheckboxChange = (selectedEmail) => {
        if (selectedUsers.includes(selectedEmail)) {
            setSelectedUsers(
                selectedUsers.filter((email) => email !== selectedEmail)
            );
        } else {
            setSelectedUsers([...selectedUsers, selectedEmail]);
        }
    };

    const handleUpdateTable = (usersArray) => {
        if (usersArray.every((user) => user)) {
            getAndSetUsers();
        }
    };

    const handleBlockAndUnblock = async (changeOn) => {
        handleUpdateTable();
    };

    const handleBlock = async () => {
        const changeOn = Statuses.BLOCKED;
        handleBlockAndUnblock(changeOn);
    };

    const handleUnblock = async () => {
        const changeOn = Statuses.ACTIVE;
        handleBlockAndUnblock(changeOn);
    };

    const handleDelete = async () => {};

    return (
        <div>
            <div className="mt-4 mb-2">
                <button
                    onClick={handleDelete}
                    className="bg-red-500 text-white px-3 py-2 rounded-md me-2"
                >
                    delete
                </button>
                <button
                    onClick={handleUnblock}
                    className="bg-yellow-500 text-white px-3 py-2 rounded-md me-2"
                >
                    unblock
                </button>
                <button
                    onClick={handleBlock}
                    className="bg-blue-500 text-white px-3 py-2 rounded-md"
                >
                    block
                </button>
            </div>
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr>
                        <th>
                            <input
                                type="checkbox"
                                checked={selectAll}
                                onChange={toggleSelectAll}
                                className="form-checkbox h-5 w-5 text-gray-600"
                            />
                        </th>
                        <th className="py-2 px-4 border-b border-r text-left">
                            Name
                        </th>
                        <th className="py-2 px-4 border-b border-r text-left">
                            Email
                        </th>
                        <th className="py-2 px-4 border-b border-r text-left">
                            Status
                        </th>
                        <th className="py-2 px-4 border-b border-r text-left">
                            Role
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {user.users?.map((user) => (
                        <tr key={user.email}>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={selectedUsers.includes(user.email)}
                                    onChange={() =>
                                        handleUserCheckboxChange(user.email)
                                    }
                                    className="form-checkbox h-5 w-5 text-gray-600"
                                />
                            </td>
                            <td className="py-2 px-4 border-b border-r text-left">
                                {user.name}
                            </td>
                            <td className="py-2 px-4 border-b border-r text-left">
                                {user.email}
                            </td>
                            <td className="py-2 px-4 border-b border-r text-left">
                                {user.status}
                            </td>
                            <td className="py-2 px-4 border-b border-r text-left">
                                {user.role}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
});
