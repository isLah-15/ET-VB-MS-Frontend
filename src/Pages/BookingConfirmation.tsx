import { useParams } from "react-router-dom";

export default function BookingConfirmation() {
  const { bookingId } = useParams();

  return (
    <div className="p-10 text-center">
      <h1 className="text-4xl text-green-600 font-bold">🎉 Booking Confirmed!</h1>
      <p className="mt-4">Your booking ID is <strong>{bookingId}</strong>.</p>
      <p>Thank you for booking with us!</p>
    </div>
  );
}
