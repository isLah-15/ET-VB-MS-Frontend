// src/pages/TicketSummary.tsx
import React from "react";
import Barcode from "react-barcode";
import { useLocation } from "react-router-dom";
import type { EventType } from "../../Types/EventTypes";
import type { TBooking } from "../../Features/Booking/BookingAPI";
import type { TPayment } from "../../Features/Payment/PaymentAPI";
import { useGetEventByIdQuery } from "../../Features/Events/EventAPI";

interface TicketSummaryProps {
  event: EventType;
  booking: TBooking;
  payment: TPayment;
}

const TicketSummary: React.FC = () => {
  const location = useLocation();
  const { event, booking, payment } = location.state as TicketSummaryProps;

  const eventDetailsQuery = useGetEventByIdQuery(booking?.newBooking?.eventId);

  const ticketId = `TICKET-${booking?.newBooking?.bookingId}-${booking?.newBooking?.userId}`;

  const barcodeData = JSON.stringify({
    ticketId: `TICKET-${payment?.newPayment?.[0]?.transactionId}`,
    userId: booking?.newBooking?.userId,
    eventName: event?.data?.event?.eventName,
    quantity: booking?.newBooking?.quantity,
    totalAmount: booking?.newBooking?.totalAmount,
    paymentStatus: payment?.newPayment?.[0]?.paymentStatus,
  });

  if (eventDetailsQuery.isLoading)
    return <p className="text-center mt-10 text-neon animate-pulse">Loading ticket details...</p>;

  if (eventDetailsQuery.isError)
    return <p className="text-center mt-10 text-red-500 font-bold">❌ Failed to load event details.</p>;

  const eventDetails = eventDetailsQuery.data;

  return (
    <div className="relative min-h-screen bg-black text-white font-mono px-6 py-12">
      {/* Neon glowing header */}
      <h1 className="text-4xl font-extrabold text-center mb-12 text-neon-glow uppercase tracking-wide">
         The Carnival Ticket 
      </h1>

      {/* Collage Background */}
      <div className="absolute top-0 left-0 w-full h-full opacity-60 pointer-events-none z-0">
        <div className="grid grid-cols-3 gap-2 p-4">
          <img src="src\Assets\Images\download (42).jpg" alt="Collage 1" className="w-full h-40 object-cover rotate-3 grayscale" />
          <img src="src\Assets\Images\Circus at night.jpg" alt="Collage 2" className="w-full h-40 object-cover -rotate-2 sepia" />
          <img src="src\Assets\Images\download (43).jpg" alt="Collage 3" className="w-full h-40 object-cover rotate-1 contrast-150" />
          <img src="src\Assets\Images\download (44).jpg" alt="Collage 4" className="w-full h-40 object-cover rotate-6 brightness-90" />
          <img src="src\Assets\Images\download (45).jpg" alt="Collage 5" className="w-full h-40 object-cover -rotate-3" />
          <img src="src\Assets\Images\download (46).jpg" alt="Collage 6" className="w-full h-40 object-cover rotate-2 opacity-80" />
          <img src="src\Assets\Images\download (47).jpg" alt="Collage 7" className="w-full h-40 object-cover rotate-2 opacity-80" />
          <img src="src\Assets\Images\download (48).jpg" alt="Collage 8" className="w-full h-40 object-cover rotate-2 opacity-80" />
          <img src="src\Assets\Images\download (45).jpg" alt="Collage 9" className="w-full h-40 object-cover rotate-2 opacity-80" />
        </div>
      </div>

      {/* Ticket Summary Container */}
      <div className="relative z-10 max-w-4xl mx-auto bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] border border-fuchsia-600 shadow-[0_0_20px_5px_#ff00ff88] rounded-3xl p-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Event Details */}
          <div>
            <h2 className="text-xl font-bold text-red-400 mb-2">🎭 Event Details</h2>
            <p><span className="text-cyan-400">Name:</span> {eventDetails?.event?.eventName}</p>
            <p><span className="text-cyan-400">Venue:</span> {eventDetails?.event?.venue?.venueName}</p>
            <p><span className="text-cyan-400">Date:</span> {new Date(eventDetails?.event?.eventDate).toLocaleDateString()}</p>
          </div>

          {/* Booking Details */}
          <div>
            <h2 className="text-xl font-bold text-red-400 mb-2">🧾 Booking Details</h2>
            <p><span className="text-yellow-400">Booking ID:</span> {booking?.newBooking?.bookingId}</p>
            <p><span className="text-yellow-400">Quantity:</span> {booking?.newBooking?.quantity}</p>
            <p><span className="text-yellow-400">Total Paid:</span> KES {booking?.newBooking?.totalAmount}</p>
            <p><span className="text-yellow-400">Status:</span> {booking?.newBooking?.bookingStatus}</p>
          </div>

          {/* Payment Info */}
          <div>
            <h2 className="text-xl font-bold text-red-400 mb-2">💳 Payment Info</h2>
            <p><span className="text-lime-400">Method:</span> {payment?.newPayment?.[0]?.paymentMethod}</p>
            <p><span className="text-lime-400">Status:</span> {payment?.newPayment?.[0]?.paymentStatus}</p>
            <p><span className="text-lime-400">Transaction ID:</span> {payment?.newPayment?.[0]?.transactionId}</p>
          </div>

          {/* Barcode */}
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-xl font-bold text-fuchsia-400 mb-2">🧪 Entry Barcode</h2>
            <div className="bg-white p-2 rounded-md">
              <Barcode value={barcodeData} width={0.35} height={80} displayValue={false} />
            </div>
            <p className="mt-2 text-sm text-gray-400 italic">Scan this to enter the madness...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketSummary;
