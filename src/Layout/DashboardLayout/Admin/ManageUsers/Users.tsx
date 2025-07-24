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
  <div className="text-white font-sans">

    {/* Change Role Modal */}
    <ChangeRole user={selectedUser} />

    {/* Loading & Error States */}
    {isLoading && (
      <p className="italic text-neutral-400 animate-pulse tracking-wide">
        Loading users...
      </p>
    )}
    {error && (
      <p className="text-red-500 font-medium bg-neutral-800 p-3 rounded-md border border-red-700">
        ⚠️ Failed to fetch users.
      </p>
    )}

    {/* User Table */}
    {usersData && usersData.length > 0 ? (
      <div className="overflow-x-auto border border-neutral-700 rounded-xl bg-neutral-900 p-4 shadow-sm">

        <table className="table-auto w-full text-sm lg:text-base text-white">
          <thead>
            <tr className="bg-neutral-800 text-neutral-300 uppercase text-xs tracking-wider border-b border-neutral-700">
              <th className="px-4 py-3 text-left">First Name</th>
              <th className="px-4 py-3 text-left">Last Name</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Role</th>
              <th className="px-4 py-3 text-left">Verified</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {usersData.map((user: TUser) => (
              <tr
                key={user.userId}
                className="hover:bg-neutral-800 border-b border-neutral-700 transition-colors"
              >
                <td className="px-4 py-2 border-r border-neutral-800">{user.firstName}</td>
                <td className="px-4 py-2 border-r border-neutral-800">{user.lastName}</td>
                <td className="px-4 py-2 border-r border-neutral-800">{user.email}</td>
                <td className="px-4 py-2 border-r border-neutral-800">{user.role}</td>
                <td className="px-4 py-2 border-r border-neutral-800">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium tracking-wide 
                      ${user.isVerified ? "bg-green-600 text-white" : "bg-yellow-500 text-black"}
                    `}
                  >
                    {user.isVerified ? "✔ Verified" : "✖ Not Verified"}
                  </span>
                </td>
                <td className="px-4 py-2">
                  <button
                    className="px-3 py-1 rounded bg-neutral-200 text-black font-medium text-sm tracking-wide border border-neutral-400 hover:bg-white hover:scale-105 transition-transform"
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
      <p className="italic text-neutral-400 tracking-wide">No users found.</p>
    )}
  </div>
);




};

export default Users;