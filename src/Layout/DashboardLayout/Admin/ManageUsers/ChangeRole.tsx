import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { toast } from "sonner";
import { useEffect } from "react";
import { userAPI, type TUser } from "../../../../Features/Auth/UserAPI";


type ChangeRoleProps = {
    user: TUser | null;
};

type ChangeRoleInputs = {
    role: "user" | "admin";
};

const schema = yup.object({
    role: yup.string().oneOf(["user", "admin"]).required("Role is required"),
});

const ChangeRole = ({ user }: ChangeRoleProps) => {
    console.log(user)
    
    const [updateUser, { isLoading }] = userAPI.useUpdateUserMutation(
        { fixedCacheKey: "updateUser" }
    );

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm<ChangeRoleInputs>({
        resolver: yupResolver(schema),
        defaultValues: {
            role: user ? (user.role as "user" | "admin") : "user", // Default to user's current role or "user"
        },
    });

    // Update form value when user changes
    // (so the modal always shows the correct role)
    useEffect(() => {
        if (user) {
            setValue("role", user.role as "user" | "admin"); // Set the role based on the user object
        } else {
            reset();
        }
    }, [user, setValue, reset]);

    const onSubmit: SubmitHandler<ChangeRoleInputs> = async (data) => {
        try {
            if (!user) {
                toast.error("No user selected for role change.");
                return;
            }
            console.log("id => ", user.userId, "role => ", data.role )
            await updateUser({ userId: user.userId, role: data.role })
            toast.success("Role updated successfully!");
            reset();
            (document.getElementById('role_modal') as HTMLDialogElement)?.close();
        } catch (error) {
            console.error("Error updating role:", error);
            toast.error("Failed to update role. Please try again.");
        }
    };

    return (
  <dialog id="role_modal" className="modal sm:modal-middle">
    <div className="modal-box bg-gradient-to-br from-zinc-900 via-gray-900 to-red-950 text-rose-100 w-full max-w-xs sm:max-w-lg mx-auto rounded-xl border-2 border-rose-700 shadow-[0_0_30px_rgba(255,0,87,0.3)] font-horror">
      <h3 className="font-extrabold text-xl mb-4 tracking-wide text-rose-400 border-b border-rose-600 pb-2 uppercase">
        Change Role for {user?.firstName} {user?.lastName}
      </h3>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <label className="text-rose-300 font-semibold uppercase tracking-wider">Select Role:</label>

        <select
          {...register("role")}
          className="select select-bordered w-full bg-rose-50 text-gray-900 font-bold border-rose-600 focus:ring-rose-500 focus:border-rose-500"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        {errors.role && (
          <span className="text-sm text-red-400 italic">{errors.role.message}</span>
        )}

        <div className="modal-action flex flex-col sm:flex-row gap-2">
          <button
            type="submit"
            className="btn w-full sm:w-auto bg-rose-700 hover:bg-rose-600 text-white font-bold border border-rose-500 shadow-md uppercase tracking-wider"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="loading loading-spinner text-rose-300" /> Updating...
              </>
            ) : "Update Role"}
          </button>

          <button
            className="btn w-full sm:w-auto bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-600 shadow-sm"
            type="button"
            onClick={() => {
              (document.getElementById('role_modal') as HTMLDialogElement)?.close();
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

export default ChangeRole;