import type { TBooking } from "../../../../Features/Booking/BookingAPI";

type DeleteBookingProps = {
  booking: TBooking | null;
  onDelete: () => void;
  isDeleting: boolean;
};

const DeleteBooking = ({ booking, onDelete, isDeleting }: DeleteBookingProps) => {
  const closeModal = () => {
    (document.getElementById('delete_booking_modal') as HTMLDialogElement)?.close();
  };

  return (
    <dialog id="delete_booking_modal" className="modal sm:modal-middle">
      <div className="modal-box bg-gray-700 text-white w-full max-w-xs sm:max-w-lg mx-auto rounded-lg">
        <h3 className="font-bold text-lg mb-4">Delete Booking</h3>
        <p className="mb-6">
          Are you sure you want to delete the booking for{" "}
          <span className="font-semibold">{booking?.bookingId}</span>?
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
          <button className="btn" type="button" onClick={closeModal}>
            Cancel
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default DeleteBooking;
