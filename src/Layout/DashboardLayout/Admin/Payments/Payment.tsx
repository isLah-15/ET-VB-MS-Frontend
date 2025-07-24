import { useState } from "react";
import { toast } from "sonner";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";


import CreatePayment from "./CreatePayment";
import UpdatePayment from "./UpdatePayment";
import DeletePayment from "./DeletePayment";
import { paymentAPI, type TPayment } from "../../../../Features/Payment/PaymentAPI";

const Payments = () => {
  const { data: paymentsData, isLoading, error, refetch } = paymentAPI.useGetPaymentsQuery(undefined, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 60000,
  });

  const [selectedPayment, setSelectedPayment] = useState<TPayment | null>(null);
  const [paymentToDelete, setPaymentToDelete] = useState<TPayment | null>(null);

  const [deletePaymentById, { isLoading: isDeleting }] = paymentAPI.useDeletePaymentByIdMutation();
  const [updatePaymentById, { isLoading: isUpdating }] = paymentAPI.useUpdatePaymentByIdMutation();

  const handleEdit = (payment: TPayment) => {
    setSelectedPayment(payment);
    (document.getElementById("update_payment_modal") as HTMLDialogElement)?.showModal();
  };

  const handleDelete = (payment: TPayment) => {
    setPaymentToDelete(payment);
    (document.getElementById("delete_payment_modal") as HTMLDialogElement)?.showModal();
  };

  const handleUpdatePayment = async (updatedPayment: Partial<TPayment>) => {
    if (!selectedPayment) return;
    try {
      const response = await updatePaymentById({
        paymentId: selectedPayment.paymentId,
        updatedPayment,
      }).unwrap();

      toast.success(`✅ Updated payment of Ksh${response.amount}`);
      (document.getElementById("update_payment_modal") as HTMLDialogElement)?.close();
      setSelectedPayment(null);
      refetch();
    } catch (error) {
      console.error(error);
      toast.error("❌ Failed to update payment.");
    }
  };

  const handleDeletePayment = async () => {
    if (!paymentToDelete) return;
    try {
      await deletePaymentById(paymentToDelete.paymentId).unwrap();
      toast.success(`🗑 Deleted payment of Kshs${paymentToDelete.amount}`);
      (document.getElementById("delete_payment_modal") as HTMLDialogElement)?.close();
      setPaymentToDelete(null);
      refetch();
    } catch (error) {
      console.error(error);
      toast.error("❌ Failed to delete payment.");
    }
  };

  return (
    <div className="text-white font-sans">
      <div className="flex justify-center my-4">
        <button
          className="px-5 py-2 text-sm font-medium tracking-wide bg-neutral-200 text-black rounded border border-neutral-400 hover:bg-white hover:scale-105 transition-transform"
          onClick={() =>
            (document.getElementById("create_payment_modal") as HTMLDialogElement)?.showModal()
          }
        >
          Create Payment
        </button>
      </div>

      {/* Modals */}
      <CreatePayment />
      <UpdatePayment payment={selectedPayment} onUpdate={handleUpdatePayment} isUpdating={isUpdating} />
      <DeletePayment payment={paymentToDelete} onDelete={handleDeletePayment} isDeleting={isDeleting} />

      {isLoading && (
        <p className="italic text-neutral-400 text-center animate-pulse tracking-wide">
          Loading payments...
        </p>
      )}
      {error && (
        <p className="text-red-500 font-medium bg-neutral-800 p-3 rounded-md border border-red-700 text-center">
          ⚠️ Error fetching payments.
        </p>
      )}

      {paymentsData?.payments?.length > 0 ? (
        <div className="overflow-x-auto border border-neutral-700 rounded-xl bg-neutral-900 p-4 shadow-sm">
          <table className="table-auto w-full text-sm lg:text-base text-white">
            <thead>
              <tr className="bg-neutral-800 text-neutral-300 uppercase text-xs tracking-wider border-b border-neutral-700">
                <th className="px-4 py-3 text-left">Amount</th>
                <th className="px-4 py-3 text-left">Method</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">User</th>
                <th className="px-4 py-3 text-left">Booking</th>
                <th className="px-4 py-3 text-left">Transaction</th>
                <th className="px-4 py-3 text-left">Created</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paymentsData.payments.map((payment: TPayment) => (
                <tr
                  key={payment.paymentId}
                  className="hover:bg-neutral-800 border-b border-neutral-700 transition-colors"
                >
                  <td className="px-4 py-2 border-r border-neutral-800">Ksh {payment.amount}</td>
                  <td className="px-4 py-2 border-r border-neutral-800 capitalize">{payment.paymentMethod}</td>
                  <td className="px-4 py-2 border-r border-neutral-800">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium tracking-wide ${
                        payment.paymentStatus === "completed"
                          ? "bg-green-600 text-white"
                          : payment.paymentStatus === "pending"
                          ? "bg-yellow-500 text-black"
                          : "bg-red-600 text-white"
                      }`}
                    >
                      {payment.paymentStatus}
                    </span>
                  </td>
                  <td className="px-4 py-2 border-r border-neutral-800">User #{payment.userId}</td>
                  <td className="px-4 py-2 border-r border-neutral-800">Booking #{payment.bookingId}</td>
                  <td className="px-4 py-2 border-r border-neutral-800">{payment.transactionId}</td>
                  <td className="px-4 py-2 border-r border-neutral-800">
                    {new Date(payment.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 flex space-x-2">
                    <button
                      className="p-2 rounded bg-neutral-200 text-black border border-neutral-400 hover:bg-white hover:scale-105 transition-transform"
                      onClick={() => handleEdit(payment)}
                    >
                      <FaEdit size={16} />
                    </button>
                    <button
                      className="p-2 rounded bg-red-700 text-white border border-red-500 hover:bg-red-600 hover:scale-105 transition-transform"
                      onClick={() => handleDelete(payment)}
                    >
                      <MdDeleteForever size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="italic text-neutral-400 text-center tracking-wide">No payments found.</p>
      )}
    </div>
  );
};

export default Payments;
