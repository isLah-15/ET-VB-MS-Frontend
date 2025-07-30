import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "sonner";
import { bookingAPI } from "../../../../Features/Booking/BookingAPI";


// Booking input type (same as TBookingInput)
type CreateBookingInputs = {
  userId: number;
  eventId: number;
  quantity: number;
  totalAmount: number;
  bookingStatus: "pending" | "confirmed" | "cancelled";
};

// Validation schema
const schema = yup.object({
  userId: yup.number().required("User ID is required").positive(),
  eventId: yup.number().required("Event ID is required").positive(),
  quantity: yup.number().required("Quantity is required").min(1),
  totalAmount: yup.number().required("Total amount is required").min(0),
  bookingStatus: yup
    .mixed<CreateBookingInputs["bookingStatus"]>()
    .oneOf(["pending", "confirmed", "cancelled"])
    .required("Booking status is required"),
});

const CreateBooking = () => {
  const [createBooking, { isLoading }] = bookingAPI.useCreateBookingMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateBookingInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<CreateBookingInputs> = async (data) => {
    try {
      await createBooking(data).unwrap();
      toast.success("Booking created successfully!");
      reset();
      (document.getElementById("create_booking_modal") as HTMLDialogElement)?.close();
    } catch (error) {
      console.error("Error creating booking:", error);
      toast.error("Failed to create booking. Please try again.");
    }
  };

  return (
    <dialog id="create_booking_modal" className="modal sm:modal-middle">
      <div className="modal-box bg-gray-600 text-white w-full max-w-xs sm:max-w-2xl mx-auto rounded-lg">
        <h3 className="font-bold text-lg mb-4">Create New Booking</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">

          <input type="number" {...register("userId")} placeholder="User ID" className="input p-2 bg-white text-black rounded" />
          {errors.userId && <span className="text-sm text-red-500">{errors.userId.message}</span>}

          <input type="number" {...register("eventId")} placeholder="Event ID" className="input p-2 bg-white text-black rounded" />
          {errors.eventId && <span className="text-sm text-red-500">{errors.eventId.message}</span>}

          <input type="number" {...register("quantity")} placeholder="Quantity" className="input p-2 bg-white text-black rounded" />
          {errors.quantity && <span className="text-sm text-red-500">{errors.quantity.message}</span>}

          <input type="number" {...register("totalAmount")} placeholder="Total Amount" className="input p-2 bg-white text-black rounded" />
          {errors.totalAmount && <span className="text-sm text-red-500">{errors.totalAmount.message}</span>}

          <select {...register("bookingStatus")} className="select bg-white text-black rounded">
            <option value="">Select Status</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="cancelled">Cancelled</option>
          </select>
          {errors.bookingStatus && <span className="text-sm text-red-500">{errors.bookingStatus.message}</span>}

          <div className="modal-action">
            <button type="submit" className="btn btn-primary" disabled={isLoading}>
              {isLoading ? (
                <>
                  <span className="loading loading-spinner text-primary" /> Creating...
                </>
              ) : "Create"}
            </button>
            <button
              type="button"
              className="btn"
              onClick={() => (document.getElementById("create_booking_modal") as HTMLDialogElement)?.close()}
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default CreateBooking;
