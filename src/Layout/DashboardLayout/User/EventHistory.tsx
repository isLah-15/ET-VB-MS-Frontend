import { useSelector } from "react-redux";
import { useGetBookingByUserIdQuery } from "../../../Features/Booking/BookingAPI";
import type { RootState } from "../../../App/Store";
import { useGetEventsQuery } from "../../../Features/Events/EventAPI";

// Define an interface for the Event structure to improve type safety
interface Event {
  eventId: number;
  eventName: string;
  eventDate: string;
  // Add other properties of an event if needed, e.g., venue: { venueName: string }
}

// Define an interface for the Booking structure
interface Booking {
  bookingId: number;
  eventId: number;
  quantity: number;
  totalAmount: number;
  bookingStatus: string;
  // Add other properties of a booking if needed
}

export default function EventHistory() {
  const user = useSelector((state: RootState) => state.user.user);
  const userId = user?.user_id;

  // Provide a skip option to the query so it doesn't run until userId is available
  const {
    data: bookingsData, // Renamed to bookingsData to avoid conflict with the array below
    isLoading: loadingBookings,
    isError: errorBookings,
  } = useGetBookingByUserIdQuery(userId, {
    skip: !userId, // Skip the query if userId is null or undefined
  });

  // Access the nested 'bookings' array, defaulting to an empty array
  const bookings: Booking[] = bookingsData?.bookings || [];

  const {
    data: eventsData, // Renamed to eventsData
    isLoading: loadingEvents,
    isError: errorEvents,
  } = useGetEventsQuery();

  // Access the nested 'events' array, defaulting to an empty array
  const events: Event[] = eventsData?.events || [];

  console.log("Bookings:", bookings);

  if (loadingBookings || loadingEvents) {
    return (
      <p className="text-center mt-10 text-gray-400">Loading event history...</p>
    );
  }

  // Check for errors or if data is not available after loading
  if (errorBookings || errorEvents || !userId) {
    return (
      <p className="text-center mt-10 text-red-500">
        Failed to load your booking history or user not found.
      </p>
    );
  }

  const getEventDetails = (eventId: number) => {
    return events.find((event) => event.eventId === eventId);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-center mb-6 text-rose-600">
        🎟️ Your Event History
      </h2>

      {bookings.length === 0 ? (
        <p className="text-center text-gray-500">
          You haven't booked any events yet.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full bg-base-100 shadow rounded-lg">
            <thead>
              <tr className="text-rose-500 font-bold">
                <th>Event</th>
                {/* <th>Venue</th> */}
                <th>Date</th>
                <th>Quantity</th>
                <th>Total (KES)</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking: Booking) => {
                const event = getEventDetails(booking.eventId);

                return (
                  <tr key={booking.bookingId}>
                    <td>{event?.eventName || "N/A"}</td>
                    {/* <td>{event?.venue?.venueName || "Unknown Venue"}</td> */}
                    <td>
                      {event?.eventDate
                        ? new Date(event.eventDate).toLocaleDateString()
                        : "N/A"}
                    </td>
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