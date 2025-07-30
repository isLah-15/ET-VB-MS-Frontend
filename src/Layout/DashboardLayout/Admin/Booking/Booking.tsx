
import { useState } from "react";
import { toast } from "sonner";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

import UpdateBooking from "./UpdateBooking";
import DeleteBooking from "./DeleteBooking";
import { bookingAPI, type TBooking } from "../../../../Features/Booking/BookingAPI";

const Booking = () => {
  const { data: bookingsData, isLoading, error, refetch } = bookingAPI.useGetBookingsQuery(undefined, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 60000,
  });

  const [selectedBooking, setSelectedBooking] = useState<TBooking | null>(null);
  const [bookingToDelete, setBookingToDelete] = useState<TBooking | null>(null);

  const [updateBooking, { isLoading: isUpdating }] = bookingAPI.useUpdateBookingMutation();
  const [deleteBooking, { isLoading: isDeleting }] = bookingAPI.useDeleteBookingMutation();

  const handleEdit = (booking: TBooking) => {
    setSelectedBooking(booking);
    (document.getElementById("update_booking_modal") as HTMLDialogElement)?.showModal();
  };

  const handleDelete = (booking: TBooking) => {
    setBookingToDelete(booking);
    (document.getElementById("delete_booking_modal") as HTMLDialogElement)?.showModal();
  };

  const handleUpdateBooking = async (updatedBooking: Partial<TBooking>) => {
    console.log("Updating with:", updatedBooking);
    if (!selectedBooking) return;
    try {
      const response = await updateBooking({
        bookingId: selectedBooking.bookingId,
        updatedBooking,
      }).unwrap();

      toast.success(`✅ Booking updated for: ${response.userId}`);
      (document.getElementById("update_booking_modal") as HTMLDialogElement)?.close();
      setSelectedBooking(null);
      refetch();
    } catch (error) {
      console.error(error);
      toast.error("❌ Failed to update booking.");
    }
  };

  const handleDeleteBooking = async () => {
    if (!bookingToDelete) return;
    try {
      await deleteBooking(bookingToDelete.bookingId).unwrap();
      toast.success(`🗑 Deleted booking for: ${bookingToDelete.userId}`);
      (document.getElementById("delete_booking_modal") as HTMLDialogElement)?.close();
      setBookingToDelete(null);
      refetch();
    } catch (error) {
      console.error(error);
      toast.error("❌ Failed to delete booking.");
    }
  };

  return (
    <div className="text-white font-sans">
      {/* Modals */}
      <UpdateBooking booking={selectedBooking} onUpdate={handleUpdateBooking} isUpdating={isUpdating} />
      <DeleteBooking booking={bookingToDelete} onDelete={handleDeleteBooking} isDeleting={isDeleting} />

      {/* Loading/Error */}
      {isLoading && (
        <p className="italic text-neutral-400 text-center animate-pulse tracking-wide">
          Loading bookings...
        </p>
      )}
      {error && (
        <p className="text-red-500 font-medium bg-neutral-800 p-3 rounded-md border border-red-700 text-center">
          ⚠️ Error fetching bookings.
        </p>
      )}

      {/* Bookings Table */}
      {bookingsData?.bookings?.length > 0 ? (
        <div className="overflow-x-auto border border-neutral-700 rounded-xl bg-neutral-900 shadow-sm">
          <div className="max-h-[500px] overflow-y-auto">
            <table className="table-auto w-full text-sm lg:text-base text-white">
              <thead className="sticky top-0 bg-neutral-800 z-10">
                <tr className="text-neutral-300 uppercase text-xs tracking-wider border-b border-neutral-700">
                  <th className="px-4 py-3 text-left">User</th>
                  <th className="px-4 py-3 text-left">Event</th>
                  <th className="px-4 py-3 text-left">Tickets</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookingsData.bookings.map((booking: TBooking) => (
                  <tr
                    key={booking.bookingId}
                    className="hover:bg-neutral-800 border-b border-neutral-700 transition-colors"
                  >
                    <td className="px-4 py-2 border-r border-neutral-800">{booking.userId}</td>
                    <td className="px-4 py-2 border-r border-neutral-800">{booking.eventId}</td>
                    <td className="px-4 py-2 border-r border-neutral-800">{booking.quantity}</td>
                    <td className="px-4 py-2 border-r border-neutral-800">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium tracking-wide ${
                          booking.bookingStatus === "confirmed"
                            ? "bg-green-600 text-white"
                            : "bg-yellow-500 text-black"
                        }`}
                      >
                        {booking.bookingStatus}
                      </span>
                    </td>
                    <td className="px-4 py-2 flex space-x-2">
                      <button
                        className="p-2 rounded bg-neutral-200 text-black border border-neutral-400 hover:bg-white hover:scale-105 transition-transform"
                        onClick={() => handleEdit(booking)}
                      >
                        <FaEdit size={16} />
                      </button>
                      <button
                        className="p-2 rounded bg-red-700 text-white border border-red-500 hover:bg-red-600 hover:scale-105 transition-transform"
                        onClick={() => handleDelete(booking)}
                      >
                        <MdDeleteForever size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <p className="italic text-neutral-400 text-center tracking-wide">No bookings found.</p>
      )}
    </div>
  );
};

export default Booking;
