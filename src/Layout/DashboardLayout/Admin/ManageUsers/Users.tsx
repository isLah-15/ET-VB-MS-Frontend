import { useState } from "react";



import ChangeRole from "./ChangeRole";
import { userAPI, type TUser } from "../../../../Features/Auth/UserAPI";

const Users = () => {
    const { data: usersData, isLoading, error } = userAPI.useGetUsersQuery(
        undefined, // No parameters needed for this query
        {
            refetchOnMountOrArgChange: true, // Refetch data when component mounts or arguments change
            pollingInterval: 60000, // Poll every 60 seconds to keep data fresh
        }
    );

    // State for the user to update role
    const [selectedUser, setSelectedUser] = useState<TUser | null>(null);

    console.log(usersData)

    return (
    <div>

        {/* Change Role Modal */}
        <ChangeRole user={selectedUser} />

        {/* Display Users */}
        {isLoading && <p className="text-yellow-200 italic">Loading users...</p>}
        {error && <p className="text-red-500 font-bold">Error fetching users</p>}
        {usersData && usersData.length > 0 ? (
            <div className="overflow-x-auto border-2 border-yellow-700 rounded-xl shadow-[0_0_25px_rgba(255,255,0,0.15)] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 p-4">
                <table className="table table-xs text-yellow-100 w-full">
                    <thead>
                        <tr className="bg-yellow-800 text-black text-md lg:text-lg uppercase tracking-wider border-b-2 border-yellow-600">
                            <th className="px-4 py-3">First Name</th>
                            <th className="px-4 py-3">Last Name</th>
                            <th className="px-4 py-3">Email</th>
                            <th className="px-4 py-3">Role</th>
                            <th className="px-4 py-3">Verified</th>
                            <th className="px-4 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usersData.map((user: TUser) => (
                            <tr key={user.userId} className="hover:bg-yellow-900 border-b border-yellow-700 transition-all duration-150 ease-in-out">
                                <td className="px-4 py-2 border-r border-yellow-700 lg:text-base">{user.firstName}</td>
                                <td className="px-4 py-2 border-r border-yellow-700 lg:text-base">{user.lastName}</td>
                                <td className="px-4 py-2 border-r border-yellow-700 lg:text-base">{user.email}</td>
                                <td className="px-4 py-2 border-r border-yellow-700 lg:text-base">{user.role}</td>
                                <td className="px-4 py-2 border-r border-yellow-700 lg:text-base">
                                    <span className={`badge px-3 py-1 rounded-full text-xs font-bold ${user.isVerified ? "bg-green-700 text-white" : "bg-yellow-600 text-black"}`}>
                                        {user.isVerified ? "Verified" : "Not Verified"}
                                    </span>
                                </td>
                                <td className="px-4 py-2">
                                    <button
                                        className="btn btn-sm bg-yellow-700 hover:bg-yellow-600 text-black border border-yellow-500 font-bold uppercase tracking-wide"
                                        onClick={() => {
                                            setSelectedUser(user);
                                            (document.getElementById('role_modal') as HTMLDialogElement)?.showModal();
                                        }}
                                    >
                                        Change Role
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        ) : (
            <p className="text-yellow-300 italic">No users found.</p>
        )}
    </div>
);

};

export default Users;