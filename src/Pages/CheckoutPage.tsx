import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function CheckoutPage() {
  const { eventId } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetch(`http://localhost:3000/event/${eventId}`)
      .then((res) => res.json())
      .then(setEvent);
  }, [eventId]);

  const handlePayment = async () => {
    const response = await fetch("http://localhost:3000/booking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Add token if auth is implemented
      },
      body: JSON.stringify({
        eventId: event.eventId,
        userId: 1, // Replace with logged-in user ID
        quantity,
        amount: quantity * event.ticketPrice,
        paymentMethod: "m_pesa", // hardcoded for now
      }),
    });

    const result = await response.json();
    if (response.ok) {
      navigate(`/confirmation/${result.bookingId}`);
    }
  };

  if (!event) return <div>Loading...</div>;

  return (
    <section className="p-6">
      <h2 className="text-2xl font-bold">Checkout for {event.eventName}</h2>
      <p>Price per ticket: Ksh {event.ticketPrice}</p>

      <div className="my-4">
        <label>Tickets:</label>
        <input
          type="number"
          value={quantity}
          min={1}
          max={event.ticketsAvailable}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="ml-2 border px-2 py-1 w-16"
        />
      </div>

      <p>Total: <strong>Ksh {quantity * event.ticketPrice}</strong></p>

      <button
        className="mt-6 bg-blue-600 text-white px-4 py-2 rounded"
        onClick={handlePayment}
      >
        Confirm & Pay
      </button>
    </section>
  );
}
