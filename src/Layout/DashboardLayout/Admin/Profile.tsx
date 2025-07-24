
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
      <p className="text-neutral-400 text-center py-10 font-sans italic">Loading...</p>
    ) : error ? (
      <p className="text-red-500 text-center py-10 font-sans font-medium">Error loading profile</p>
    ) : (
      <div className="bg-neutral-900 p-6 rounded-md shadow-sm border border-neutral-800 min-h-screen text-white font-sans">
        <h2 className="text-2xl font-semibold mb-4 text-center">User Information</h2>

        <div className="flex flex-col items-center mb-6 gap-4 border border-neutral-800 p-6 rounded-md bg-neutral-950">
          <img
            src={
              data?.image_url ||
              "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
            }
            alt="User Avatar"
            className="w-28 h-28 rounded-full border border-neutral-700 object-cover"
          />
          <div className="text-center space-y-1">
            <h3 className="text-lg font-semibold">{data?.firstName} {data?.lastName}</h3>
            <p className="text-sm text-neutral-400">User ID: {data?.userId}</p>
            <p className="text-sm text-neutral-400">Email: {data?.email}</p>
            <p className="text-sm text-neutral-400">Role: {data?.role}</p>
            <p className="text-sm text-neutral-400">
              Verified?{" "}
              <span className={data?.isVerified ? "text-green-500" : "text-red-500"}>
                {data?.isVerified ? "Yes" : "No"}
              </span>
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            className="px-5 py-2 bg-neutral-200 hover:bg-white text-black rounded transition"
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
            className="px-5 py-2 bg-red-600 hover:bg-red-500 text-white rounded transition"
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
        }}
        refetch={refetch}
      />
    )}
  </div>
);

}

export default Profile