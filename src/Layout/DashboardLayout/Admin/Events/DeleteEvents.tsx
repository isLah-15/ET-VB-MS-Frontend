import type { TEvent } from "../../../../Features/Events/EventAPI";


type DeleteEventProps = {
  event: TEvent | null;
  onDelete: () => void;
  isDeleting: boolean;
};

const DeleteEvent = ({ event, onDelete, isDeleting }: DeleteEventProps) => {
  const closeModal = () => {
    (document.getElementById('delete_event_modal') as HTMLDialogElement)?.close();
  };

  return (
    <dialog id="delete_event_modal" className="modal sm:modal-middle">
      <div className="modal-box bg-gray-600 text-white w-full max-w-xs sm:max-w-lg mx-auto rounded-lg">
        <h3 className="font-bold text-lg mb-4">Delete Event</h3>
        <p className="mb-6">
          Are you sure you want to delete <span className="font-semibold">{event?.eventName}</span>?
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

export default DeleteEvent;
