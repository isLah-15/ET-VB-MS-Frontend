import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useEffect } from "react";
import { toast } from "react-toastify";
import type { TBooking } from "../../../../Features/Booking/BookingAPI";


type UpdateBookingProps = {
  booking: TBooking | null;
  onUpdate: (updatedBooking: Partial<TBooking>) => Promise<void>;
  isUpdating: boolean;
};

type UpdateBookingInputs = {
  userId: number;
  eventId: number;
  quantity: number;
  totalAmount: number;
  bookingStatus: "pending" | "confirmed" | "cancelled";
};

const schema = yup.object({
  userId: yup.number().required("User ID is required"),
  eventId: yup.number().required("Event ID is required"),
  quantity: yup.number().min(1, "Minimum 1 ticket").required("Quantity is required"),
  totalAmount: yup.number().min(0, "Amount must be positive").required("Total amount is required"),
  bookingStatus: yup
    .mixed<"pending" | "confirmed" | "cancelled">()
    .oneOf(["pending", "confirmed", "cancelled"])
    .required("Booking status is required"),
});

const UpdateBooking = ({ booking, onUpdate, isUpdating }: UpdateBookingProps) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<UpdateBookingInputs>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (booking) {
      setValue("userId", booking.userId);
      setValue("eventId", booking.eventId);
      setValue("quantity", booking.quantity);
      setValue("totalAmount", booking.totalAmount);
      setValue("bookingStatus", booking.bookingStatus);
    } else {
      reset();
    }
  }, [booking, setValue, reset]);

  const onSubmit: SubmitHandler<UpdateBookingInputs> = async (data) => {
    if (!booking) {
      toast.error("No booking selected.");
      return;
    }

    try {
      await onUpdate({ ...data, bookingId: booking.bookingId });
      toast.success("Booking updated successfully!");
      reset();
      (document.getElementById("update_booking_modal") as HTMLDialogElement)?.close();
    } catch (error) {
      console.error("Failed to update booking:", error);
      toast.error("Update failed. Try again.");
    }
  };

  return (
    <dialog id="update_booking_modal" className="modal sm:modal-middle">
      <div className="modal-box bg-gray-600 text-white w-full max-w-xs sm:max-w-xl mx-auto rounded-lg">
        <h3 className="font-bold text-lg mb-4">Update Booking</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">

          <input type="number" {...register("userId")} placeholder="User ID" className="input p-2 bg-white text-black rounded" />
          {errors.userId && <span className="text-sm text-red-500">{errors.userId.message}</span>}

          <input type="number" {...register("eventId")} placeholder="Event ID" className="input p-2 bg-white text-black rounded" />
          {errors.eventId && <span className="text-sm text-red-500">{errors.eventId.message}</span>}

          <input type="number" {...register("quantity")} placeholder="Quantity" className="input p-2 bg-white text-black rounded" />
          {errors.quantity && <span className="text-sm text-red-500">{errors.quantity.message}</span>}

          <input type="number" {...register("totalAmount")} placeholder="Total Amount" className="input p-2 bg-white text-black rounded" />
          {errors.totalAmount && <span className="text-sm text-red-500">{errors.totalAmount.message}</span>}

          <select {...register("bookingStatus")} className="select p-2 bg-white text-black rounded">
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="cancelled">Cancelled</option>
          </select>
          {errors.bookingStatus && <span className="text-sm text-red-500">{errors.bookingStatus.message}</span>}

          <div className="modal-action">
            <button type="submit" className="btn btn-primary" disabled={isUpdating}>
              {isUpdating ? (
                <>
                  <span className="loading loading-spinner text-white" /> Updating...
                </>
              ) : "Update"}
            </button>
            <button
              type="button"
              className="btn"
              onClick={() => {
                (document.getElementById("update_booking_modal") as HTMLDialogElement)?.close();
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

export default UpdateBooking;
