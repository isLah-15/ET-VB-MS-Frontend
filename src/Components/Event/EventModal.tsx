import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import type { RootState } from "../../App/Store";
import { useCreateBookingMutation } from "../../Features/Booking/BookingAPI";
import { useCreatePaymentMutation } from "../../Features/Payment/PaymentAPI";
import type { EventType } from "../../Types/EventTypes";

interface EventModalProps {
  eventId: number;
  event: EventType;
  ticketPrice: number;
  closeModal: () => void;
}

const EventModal: React.FC<EventModalProps> = ({ eventId, ticketPrice, closeModal }) => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user);
  const [quantity, setQuantity] = useState(1);
  const [createBooking, { isLoading: bookingLoading }] = useCreateBookingMutation();
  const [createPayment, { isLoading: paymentLoading }] = useCreatePaymentMutation();

  const handleBooking = async () => {
    if (!user?.user?.user_id) {
      toast.error("You must be logged in to book an event.");
      return;
    }

    const userId = user.user.user_id;
    const totalAmount = quantity * ticketPrice;

    try {
      
      // 1. Create the booking
      const bookingRes = await createBooking({
        userId,
        eventId,
        quantity,
        totalAmount,
        bookingStatus: "pending",
      }).unwrap();
      console.log(bookingRes)

       console.log(
        bookingRes.newBooking.bookingId,
        userId,
        totalAmount
        )
      // 2. Create payment for the booking
      const paymentRes = await createPayment({
        bookingId: bookingRes.newBooking.bookingId,
        userId: userId,
        transactionId: Math.floor(100000 + Math.random() * 900000), // Mock
        amount: totalAmount,
        paymentStatus: "completed",
        paymentMethod: "m_pesa", // default
      }).unwrap();

      toast.success("Booking and payment successful!");

      // ✅ Redirect to summary or dashboard
      // navigate("/my-tickets");
      console.log(eventId,bookingRes,paymentRes)
      navigate("/my-tickets", {
          state: {
             event: eventId,
             booking: bookingRes,
             payment: paymentRes,
          },
      });

    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong. Try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-[90%] max-w-md">
        <h2 className="text-xl font-bold mb-4">Confirm Your Booking</h2>

        <div className="space-y-3">
          <p><span className="font-semibold">Ticket Price:</span> Ksh {ticketPrice}</p>

          <label className="block">
            <span className="font-semibold">Quantity:</span>
            <input
              type="number"
              min={1}
              className="border rounded px-2 py-1 w-full mt-1"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            />
          </label>

          <p><span className="font-semibold">Total:</span> Ksh {ticketPrice * quantity}</p>
        </div>

        <div className="flex justify-between items-center mt-6 gap-3">
          <button
            className="border border-gray-400 rounded px-4 py-2 bg-white text-gray-700 hover:bg-gray-100"
            onClick={closeModal}
            disabled={bookingLoading || paymentLoading}
          >
            Cancel
          </button>
          <button onClick={handleBooking} disabled={bookingLoading || paymentLoading}>
            {bookingLoading || paymentLoading ? "Processing..." : "Confirm & Pay"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventModal;
