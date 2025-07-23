import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { toast } from "sonner";
import { useEffect } from "react";
import { userAPI } from "../../../../Features/Auth/UserAPI";


type UpdateProfileInputs = {
    firstName: string;
    lastName: string;
    image_url: string;
};

const schema = yup.object({
    firstName: yup.string().max(50, "Max 50 characters").required("First name is required"),
    lastName: yup.string().max(50, "Max 50 characters").required("Last name is required"),
    image_url: yup.string().url("Invalid URL").required("Image URL is required"),
});

interface User {
    userId: string | number;
    firstName?: string;
    lastName?: string;
    image_url?: string;
}

interface UpdateProfileProps {
    user: User;
    refetch?: () => void;
}

const UpdateProfile = ({ user, refetch }: UpdateProfileProps) => {
    const [updateUser, { isLoading }] = userAPI.useUpdateUserMutation(
        { fixedCacheKey: "updateUser" }
    );

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm<UpdateProfileInputs>({
        resolver: yupResolver(schema),
        defaultValues: {
            firstName: user?.firstName || "",
            lastName: user?.lastName || "",
            image_url: user?.image_url || "",
        },
    });

    // Update form values when user changes
    useEffect(() => {
        if (user) {
            setValue("firstName", user.firstName || "");
            setValue("lastName", user.lastName || "");
            setValue("image_url", user.image_url || "");
        } else {
            reset();
        }
    }, [user, setValue, reset]);

    const onSubmit: SubmitHandler<UpdateProfileInputs> = async (data) => {
        try {
            console.log(data, user.userId );
            await updateUser({ userId: Number(user.userId), ...data })

            toast.success("Profile updated successfully!");
            if (refetch) {
                refetch(); // Call refetch if provided
            }
            reset();
            (document.getElementById('update_profile_modal') as HTMLDialogElement)?.close();
        } catch (error) {
            console.log("Error updating profile:", error);
            toast.error("Failed to update profile. Please try again.");
        }
    };

    return (
  <dialog id="update_profile_modal" className="modal sm:modal-middle">
    <div className="modal-box bg-gradient-to-br from-zinc-800 via-gray-700 to-gray-900 text-yellow-100 w-full max-w-xs sm:max-w-lg mx-auto rounded-2xl border-2 border-yellow-700 shadow-[0_0_40px_rgba(255,255,0,0.2)] px-6 py-5">
      <h3 className="text-2xl font-bold text-orange-400 border-b border-yellow-600 pb-3 mb-5 tracking-wide uppercase">
        Update Profile
      </h3>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* First Name */}
        <div>
          <input
            type="text"
            {...register("firstName")}
            placeholder="First Name"
            className="w-full p-3 rounded-lg bg-yellow-100 text-gray-900 font-semibold border-2 border-yellow-600 placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          {errors.firstName && (
            <p className="text-sm text-red-500 italic mt-1">
              {errors.firstName.message}
            </p>
          )}
        </div>

        {/* Last Name */}
        <div>
          <input
            type="text"
            {...register("lastName")}
            placeholder="Last Name"
            className="w-full p-3 rounded-lg bg-yellow-100 text-gray-900 font-semibold border-2 border-yellow-600 placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          {errors.lastName && (
            <p className="text-sm text-red-500 italic mt-1">
              {errors.lastName.message}
            </p>
          )}
        </div>

        {/* Image URL */}
        <div>
          <input
            type="text"
            {...register("image_url")}
            placeholder="Image URL"
            className="w-full p-3 rounded-lg bg-yellow-100 text-gray-900 font-semibold border-2 border-yellow-600 placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          {errors.image_url && (
            <p className="text-sm text-red-500 italic mt-1">
              {errors.image_url.message}
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="modal-action flex flex-col sm:flex-row gap-3 mt-6">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full sm:w-auto px-6 py-2 bg-yellow-600 hover:bg-yellow-500 text-gray-900 font-bold rounded-lg border border-yellow-500 shadow-lg transition duration-200"
          >
            {isLoading ? (
              <>
                <span className="loading loading-spinner text-yellow-300 mr-2" />
                Updating...
              </>
            ) : (
              "Update"
            )}
          </button>

          <button
            type="button"
            onClick={() => {
              (document.getElementById("update_profile_modal") as HTMLDialogElement)?.close();
              reset();
            }}
            className="w-full sm:w-auto px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg border border-gray-500 shadow transition duration-200"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </dialog>
);


};

export default UpdateProfile;