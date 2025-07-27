import { useSelector } from "react-redux";
import { useGetBookingByUserIdQuery } from "../../../Features/Booking/BookingAPI";
import type { RootState } from "../../../App/Store";
import { useGetEventsQuery } from "../../../Features/Events/EventAPI";

export default function EventHistory() {
  const user = useSelector((state: RootState) => state.user.user);
  const userId = user?.user_id;

  const { data: bookings = [], isLoading: loadingBookings, isError: errorBookings } = useGetBookingByUserIdQuery(userId);
  const { data: events = [], isLoading: loadingEvents, isError: errorEvents } = useGetEventsQuery();

  if (loadingBookings || loadingEvents) {
    return <p className="text-center mt-10 text-gray-400">Loading event history...</p>;
  }

  if (errorBookings || errorEvents || !bookings || !events) {
    return <p className="text-center mt-10 text-red-500">Failed to load your booking history.</p>;
  }

  const getEventDetails = (eventId: number) => {
    return events.find((event: any) => event.eventId === eventId);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-center mb-6 text-rose-600">🎟️ Your Event History</h2>

      {bookings.length === 0 ? (
        <p className="text-center text-gray-500">You haven't booked any events yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full bg-base-100 shadow rounded-lg">
            <thead>
              <tr className="text-rose-500 font-bold">
                <th>Event</th>
                <th>Venue</th>
                <th>Date</th>
                <th>Quantity</th>
                <th>Total (KES)</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking: any) => {
                const event = getEventDetails(booking.eventId);

                return (
                  <tr key={booking.bookingId}>
                    <td>{event?.eventName || "N/A"}</td>
                    {/* <td>{event?.venue?.venueName || "Unknown Venue"}</td> */}
                    <td>{event?.eventDate ? new Date(event.eventDate).toLocaleDateString() : "N/A"}</td>
                    <td>{booking.quantity}</td>
                    <td>{booking.totalAmount}</td>
                    <td>{booking.bookingStatus}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
