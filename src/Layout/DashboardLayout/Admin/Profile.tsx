
import { useDispatch, useSelector } from 'react-redux';

import { useNavigate } from "react-router";
import type { RootState } from '../../../App/Store';
import { userAPI } from '../../../Features/Auth/UserAPI';
import { logout } from '../../../Features/Auth/UserSlice';
import UpdateProfile from './ManageUsers/UpdateProfile';


// import UpdateProfile from "./manageUsers/UpdateProfile";



const Profile = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector((state: RootState) => state.user);
    const user_id = user.user?.user_id;
    console.log('user id', user_id)

    const { data, isLoading, error, refetch } = userAPI.useGetUserByIdQuery(user_id ?? 0, {
        skip: !user_id, // Skip the query if user_id is not available
    });
    console.log("hhhh", data)


 return (
    <div>
        {isLoading ? (
            <p className="text-yellow-300 font-mono text-center py-10">Loading...</p>
        ) : error ? (
            <p className="text-red-500 font-mono text-center py-10">Error loading profile</p>
        ) : (
            <div className="bg-zinc-800 p-6 rounded-lg shadow-lg border border-yellow-700 min-h-screen text-yellow-100 font-mono">
                <h2 className="text-2xl font-extrabold mb-4 text-amber-300 text-center drop-shadow">
                    User Information
                </h2>

                <div className="flex flex-col items-center mb-6 gap-4 border border-yellow-800 p-6 rounded-lg bg-zinc-900 shadow-inner">
                    <img
                        src={
                            data?.image_url ||
                            "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
                        }
                        alt="User Avatar"
                        className="w-28 h-28 rounded-full border-4 border-amber-700 shadow-md object-cover"
                    />
                    <div className="text-center">
                        <h3 className="text-xl font-bold text-amber-300 mb-2">
                            Name: {data?.firstName} {data?.lastName}
                        </h3>
                        <p className="text-sm text-yellow-200">User ID: {data?.userId}</p>
                        <p className="text-sm text-yellow-200">Email: {data?.email}</p>
                        <p className="text-sm text-yellow-200">Role: {data?.role}</p>
                        <p className="text-sm text-yellow-200">
                            Verified?{" "}
                            <span className={data?.isVerified ? "text-green-400" : "text-red-400"}>
                                {data?.isVerified ? "Yes" : "No"}
                            </span>
                        </p>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        className="btn bg-amber-700 hover:bg-amber-600 text-white font-bold px-6 py-2 rounded shadow"
                        onClick={() => {
                            (
                                document.getElementById(
                                    "update_profile_modal"
                                ) as HTMLDialogElement
                            )?.showModal();
                        }}
                    >
                        Update Profile
                    </button>

                    <button
                        className="btn bg-red-700 hover:bg-red-600 text-white font-bold px-6 py-2 rounded shadow"
                        onClick={() => {
                            dispatch(logout());
                            navigate("/");
                        }}
                    >
                        Log Out
                    </button>
                </div>
            </div>
        )}

        {/* Modal */}
        {data && (
            <UpdateProfile
                user={{
                    userId: data.userId,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    image_url: data.image_url,
                    // add other fields if needed
                }}
                refetch={refetch}
            />
        )}
    </div>
);
}

export default Profile