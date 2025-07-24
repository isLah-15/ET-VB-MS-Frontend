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
    <div className="modal-box bg-zinc-950 text-rose-100 w-full max-w-sm sm:max-w-lg mx-auto rounded-2xl border border-rose-700 shadow-[0_0_20px_rgba(255,0,87,0.15)] font-horror p-6">
      <h3 className="text-2xl font-bold text-rose-400 mb-4 border-b border-rose-700 pb-2 uppercase tracking-widest">
        Change Role
      </h3>
      <p className="text-sm mb-6 text-rose-200">
        Updating role for <span className="font-semibold">{user?.firstName} {user?.lastName}</span>
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="text-sm text-rose-300 tracking-wide uppercase mb-1 block">Select Role</label>
          <select
            {...register("role")}
            className="w-full bg-zinc-900 border border-rose-700 rounded-md px-3 py-2 text-rose-100 focus:outline-none focus:ring-1 focus:ring-rose-500"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          {errors.role && (
            <span className="text-xs text-red-400 italic mt-1 block">{errors.role.message}</span>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-2 pt-4">
          <button
            type="submit"
            className="bg-rose-700 hover:bg-rose-600 text-white font-semibold px-4 py-2 rounded-md shadow-sm tracking-wider uppercase transition duration-150 disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="loading loading-spinner text-rose-200" />
                Updating...
              </span>
            ) : "Update Role"}
          </button>

          <button
            type="button"
            onClick={() => {
              (document.getElementById('role_modal') as HTMLDialogElement)?.close();
              reset();
            }}
            className="bg-transparent border border-rose-600 hover:bg-zinc-800 text-white font-medium px-4 py-2 rounded-md transition duration-150"
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