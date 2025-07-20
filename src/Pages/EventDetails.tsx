// pages/EventDetails.tsx
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function EventDetails() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState<any>(null);

  useEffect(() => {
    fetch(`http://localhost:8081/event/${eventId}`)
      .then((res) => res.json())
      .then(setEvent);
  }, [eventId]);

  if (!event) return <div>Loading...</div>;

  return (
    <section className="p-6">
      <h2 className="text-3xl font-bold">{event.eventName}</h2>
      <img src={event.imageUrl} className="w-96 my-4 rounded" />
      <p>{event.description}</p>
      <p>Date: {event.eventDate}</p>
      <p>Price: Ksh {event.ticketPrice}</p>

      <button
        className="mt-6 bg-green-500 text-white px-4 py-2 rounded"
        onClick={() => navigate(`/checkout/${event.eventId}`)}
      >
        Book Tickets
      </button>
    </section>
  );
}
