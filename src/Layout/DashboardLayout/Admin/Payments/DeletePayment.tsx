import type { TPayment } from "../../../../Features/Payment/PaymentAPI";


type DeletePaymentProps = {
  payment: TPayment | null;
  onDelete: () => void;
  isDeleting: boolean;
};

const DeletePayment = ({ payment, onDelete, isDeleting }: DeletePaymentProps) => {
  const closeModal = () => {
    (document.getElementById("delete_payment_modal") as HTMLDialogElement)?.close();
  };

  return (
    <dialog id="delete_payment_modal" className="modal sm:modal-middle">
      <div className="modal-box bg-gray-600 text-white w-full max-w-xs sm:max-w-lg mx-auto rounded-lg">
        <h3 className="font-bold text-lg mb-4">Delete Payment</h3>
        <p className="mb-6">
          Are you sure you want to delete the payment of{" "}
          <span className="font-semibold">${payment?.amount}</span> made via{" "}
          <span className="font-semibold">{payment?.paymentMethod}</span>?
        </p>
        <div className="modal-action flex gap-4">
          <button
            className="btn btn-error"
            onClick={onDelete}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <>
                <span className="loading loading-spinner text-primary" /> Deleting...
              </>
            ) : (
              "Yes, Delete"
            )}
          </button>
          <button
            className="btn"
            type="button"
            onClick={closeModal}
          >
            Cancel
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default DeletePayment;
