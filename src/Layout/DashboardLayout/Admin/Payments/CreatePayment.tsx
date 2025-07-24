import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "sonner";
import { paymentAPI } from "../../../../Features/Payment/PaymentAPI";


type CreatePaymentInputs = {
  bookingId: number;
  userId: number;
  transactionId: number;
  amount: number;
  paymentStatus: "pending" | "completed" | "failed";
  paymentMethod: "credit_card" | "paypal" | "m_pesa";
};

const schema = yup.object({
  bookingId: yup.number().required("Booking ID is required"),
  userId: yup.number().required("User ID is required"),
  transactionId: yup.number().required("Transaction ID is required"),
  amount: yup.number().required("Amount is required").min(1),
  paymentStatus: yup
    .mixed<"pending" | "completed" | "failed">()
    .oneOf(["pending", "completed", "failed"])
    .required("Status is required"),
  paymentMethod: yup
    .mixed<"credit_card" | "paypal" | "m_pesa">()
    .oneOf(["credit_card", "paypal", "m_pesa"])
    .required("Payment method is required"),
});

const CreatePayment = () => {
  const [createPayment, { isLoading }] = paymentAPI.useCreatePaymentMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreatePaymentInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<CreatePaymentInputs> = async (data) => {
    try {
      await createPayment(data).unwrap();
      toast.success("✅ Payment created successfully!");
      reset();
      (document.getElementById("create_payment_modal") as HTMLDialogElement)?.close();
    } catch (error) {
      console.error("Error creating payment:", error);
      toast.error("❌ Failed to create payment. Please try again.");
    }
  };

  return (
    <dialog id="create_payment_modal" className="modal sm:modal-middle">
      <div className="modal-box bg-gray-600 text-white w-full max-w-xs sm:max-w-2xl mx-auto rounded-lg">
        <h3 className="font-bold text-lg mb-4">Create New Payment</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">

          <input type="number" {...register("bookingId")} placeholder="Booking ID" className="input text-lg p-2 bg-white text-black rounded" />
          {errors.bookingId && <span className="text-sm text-red-500">{errors.bookingId.message}</span>}

          <input type="number" {...register("userId")} placeholder="User ID" className="input text-lg p-2 bg-white text-black rounded" />
          {errors.userId && <span className="text-sm text-red-500">{errors.userId.message}</span>}

          <input type="number" {...register("transactionId")} placeholder="Transaction ID" className="input text-lg p-2 bg-white text-black rounded" />
          {errors.transactionId && <span className="text-sm text-red-500">{errors.transactionId.message}</span>}

          <input type="number" {...register("amount")} placeholder="Amount" className="input text-lg p-2 bg-white text-black rounded" />
          {errors.amount && <span className="text-sm text-red-500">{errors.amount.message}</span>}

          <select {...register("paymentStatus")} className="select bg-white text-black rounded">
            <option value="">Select Status</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="failed">Failed</option>
          </select>
          {errors.paymentStatus && <span className="text-sm text-red-500">{errors.paymentStatus.message}</span>}

          <select {...register("paymentMethod")} className="select bg-white text-black rounded">
            <option value="">Select Method</option>
            <option value="credit_card">Credit Card</option>
            <option value="paypal">PayPal</option>
            <option value="m_pesa">M-Pesa</option>
          </select>
          {errors.paymentMethod && <span className="text-sm text-red-500">{errors.paymentMethod.message}</span>}

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
              onClick={() => (document.getElementById("create_payment_modal") as HTMLDialogElement)?.close()}
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default CreatePayment;
