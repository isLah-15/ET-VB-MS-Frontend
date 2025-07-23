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
        <div className="modal-box bg-gradient-to-br from-zinc-800 via-gray-700 to-gray-900 text-yellow-100 w-full max-w-xs sm:max-w-lg mx-auto rounded-xl border-2 border-yellow-700 shadow-[0_0_30px_rgba(255,255,0,0.2)]">
            <h3 className="font-extrabold text-xl mb-4 tracking-wide text-orange-400 border-b border-yellow-600 pb-2">
                Update Profile
            </h3>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <input
                    type="text"
                    {...register("firstName")}
                    placeholder="First Name"
                    className="input rounded w-full p-3 bg-yellow-100 text-gray-900 font-semibold border-2 border-yellow-600 focus:ring-yellow-500 placeholder:text-gray-600"
                />
                {errors.firstName && (
                    <span className="text-sm text-red-500 italic">{errors.firstName.message}</span>
                )}

                <input
                    type="text"
                    {...register("lastName")}
                    placeholder="Last Name"
                    className="input rounded w-full p-3 bg-yellow-100 text-gray-900 font-semibold border-2 border-yellow-600 focus:ring-yellow-500 placeholder:text-gray-600"
                />
                {errors.lastName && (
                    <span className="text-sm text-red-500 italic">{errors.lastName.message}</span>
                )}

                <input
                    type="text"
                    {...register("image_url")}
                    placeholder="Image URL"
                    className="input rounded w-full p-3 bg-yellow-100 text-gray-900 font-semibold border-2 border-yellow-600 focus:ring-yellow-500 placeholder:text-gray-600"
                />
                {errors.image_url && (
                    <span className="text-sm text-red-500 italic">{errors.image_url.message}</span>
                )}

                <div className="modal-action flex flex-col sm:flex-row gap-2">
                    <button
                        type="submit"
                        className="btn w-full sm:w-auto bg-yellow-700 hover:bg-yellow-600 text-black font-bold border border-yellow-500 shadow-md uppercase tracking-wider"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <span className="loading loading-spinner text-yellow-300" /> Updating...
                            </>
                        ) : "Update"}
                    </button>
                    <button
                        className="btn w-full sm:w-auto bg-gray-700 hover:bg-gray-600 text-white border border-gray-500 shadow-sm"
                        type="button"
                        onClick={() => {
                            (document.getElementById('update_profile_modal') as HTMLDialogElement)?.close();
                            reset();
                        }}
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