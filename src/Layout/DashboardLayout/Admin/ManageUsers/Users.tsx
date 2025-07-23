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
  <div className="text-rose-100 font-horror">

    {/* Change Role Modal */}
    <ChangeRole user={selectedUser} />

    {/* Loading & Error States */}
    {isLoading && (
      <p className="italic text-rose-300 animate-pulse font-horror tracking-widest">
        🌀 Summoning users...
      </p>
    )}
    {error && (
      <p className="text-red-600 font-bold bg-red-900/40 p-3 rounded-lg shadow-md border border-red-800 font-horror">
        ⚠️ Failed to fetch souls!
      </p>
    )}

    {/* User Table */}
    {usersData && usersData.length > 0 ? (
      <div className="overflow-x-auto border-4 border-rose-700 rounded-2xl bg-gradient-to-br from-black via-zinc-900 to-red-950 p-4 shadow-[0_0_35px_rgba(255,0,0,0.2)]">

        <table className="table-auto w-full text-sm lg:text-base text-rose-100 font-horror">
          <thead>
            <tr className="bg-gradient-to-r from-rose-800 via-red-700 to-rose-900 text-zinc-100 uppercase tracking-[0.15em] border-b-4 border-rose-600 shadow-md">
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
              <tr
                key={user.userId}
                className="hover:bg-rose-900/30 border-b border-rose-800 transition-all duration-150 ease-in-out"
              >
                <td className="px-4 py-2 border-r border-rose-700">{user.firstName}</td>
                <td className="px-4 py-2 border-r border-rose-700">{user.lastName}</td>
                <td className="px-4 py-2 border-r border-rose-700">{user.email}</td>
                <td className="px-4 py-2 border-r border-rose-700">{user.role}</td>
                <td className="px-4 py-2 border-r border-rose-700">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-extrabold tracking-wider shadow-md 
                      ${user.isVerified ? "bg-green-700 text-white" : "bg-yellow-600 text-black"}
                    `}
                  >
                    {user.isVerified ? "✔ Verified" : "✖ Not Verified"}
                  </span>
                </td>
                <td className="px-4 py-2">
                  <button
                    className="px-3 py-1 rounded bg-gradient-to-br from-yellow-600 via-amber-500 to-yellow-400 text-black font-horror font-bold uppercase tracking-wide border border-yellow-600 hover:shadow-lg hover:scale-105 transition-transform"
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
      <p className="italic text-rose-300 tracking-wide font-horror">💀 No users in the ring of fire...</p>
    )}
  </div>
);



};

export default Users;