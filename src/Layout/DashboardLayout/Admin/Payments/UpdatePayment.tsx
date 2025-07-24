import { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import type { TPayment } from "../../../../Features/Payment/PaymentAPI";


type UpdatePaymentProps = {
  payment: TPayment | null;
  onUpdate: (updatedPayment: Partial<TPayment>) => Promise<void>;
  isUpdating: boolean;
};

type UpdatePaymentInputs = {
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
  amount: yup.number().min(1).required("Amount is required"),
  paymentStatus: yup
    .mixed<"pending" | "completed" | "failed">()
    .oneOf(["pending", "completed", "failed"])
    .required("Payment status is required"),
  paymentMethod: yup
    .mixed<"credit_card" | "paypal" | "m_pesa">()
    .oneOf(["credit_card", "paypal", "m_pesa"])
    .required("Payment method is required"),
});

const UpdatePayment = ({ payment, onUpdate, isUpdating }: UpdatePaymentProps) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<UpdatePaymentInputs>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (payment) {
      setValue("bookingId", payment.bookingId);
      setValue("userId", payment.userId);
      setValue("transactionId", payment.transactionId);
      setValue("amount", payment.amount);
      setValue("paymentStatus", payment.paymentStatus);
      setValue("paymentMethod", payment.paymentMethod);
    } else {
      reset();
    }
  }, [payment, setValue, reset]);

  const onSubmit: SubmitHandler<UpdatePaymentInputs> = async (data) => {
    try {
      if (!payment) {
        toast.error("No payment selected for update.");
        return;
      }

      await onUpdate({ ...data, paymentId: payment.paymentId });
      toast.success("✅ Payment updated successfully!");
      reset();
      (document.getElementById("update_payment_modal") as HTMLDialogElement)?.close();
    } catch (error) {
      console.error("Update payment error:", error);
      toast.error("❌ Failed to update payment. Please try again.");
    }
  };

  return (
    <dialog id="update_payment_modal" className="modal sm:modal-middle">
      <div className="modal-box bg-gray-600 text-white w-full max-w-xs sm:max-w-2xl mx-auto rounded-lg">
        <h3 className="font-bold text-lg mb-4">Update Payment</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">

          <input type="number" {...register("bookingId")} placeholder="Booking ID" className="input bg-white text-black p-2 rounded" />
          {errors.bookingId && <span className="text-sm text-red-500">{errors.bookingId.message}</span>}

          <input type="number" {...register("userId")} placeholder="User ID" className="input bg-white text-black p-2 rounded" />
          {errors.userId && <span className="text-sm text-red-500">{errors.userId.message}</span>}

          <input type="number" {...register("transactionId")} placeholder="Transaction ID" className="input bg-white text-black p-2 rounded" />
          {errors.transactionId && <span className="text-sm text-red-500">{errors.transactionId.message}</span>}

          <input type="number" {...register("amount")} placeholder="Amount" className="input bg-white text-black p-2 rounded" />
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
                (document.getElementById("update_payment_modal") as HTMLDialogElement)?.close();
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

export default UpdatePayment;
