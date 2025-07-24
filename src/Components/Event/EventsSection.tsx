import { useState } from "react";
import { motion } from "framer-motion";
import EventSidebar from "./EventSidebar";
import EventCard from "./EventCard";
import { useNavigate } from "react-router-dom";
import EventModal from "./EventModal";
import { useSelector } from "react-redux";
import type { RootState } from "../../App/Store";
import { useGetEventsQuery } from "../../Features/Events/EventAPI";

type EventType = {
  eventId: number;
  eventName: string;
  eventDate: string;
  category: string;
  description: string;
  ticketPrice: number;
  imageUrl: string;
  tag: string;
  venueId: number;
};

const allEvents: EventType[] = [
  {
    eventId: 69,
    eventName: "Freak Parade",
    eventDate: "2025-08-05",
    category: "Parade",
    description: "The streets come alive with the weird and wonderful.",
    ticketPrice: 750,
    imageUrl: "src/Assets/Images/FreakParade.jpg",
    tag: "🎪 Live Soon",
    venueId: 1,
  },
  {
    eventId: 70,
    eventName: "Haunted Funhouse",
    eventDate: "2025-08-10",
    category: "Horror",
    description: "Dare to laugh and scream inside our cursed carnival maze.",
    ticketPrice: 950,
    imageUrl: "src/Assets/Images/Haunted House.jpg",
    tag: "👻 New",
    venueId: 2,
  },
  {
    eventId: 71,
    eventName: "Circus Rave",
    eventDate: "2025-08-15",
    category: "Circus",
    description: "DJ Clownz and laser lights under the big top.",
    ticketPrice: 1200,
    imageUrl: "src/Assets/Images/Circus Rave.jpg",
    tag: "🎉 Party",
    venueId: 3,
  },
];

const categories = ["All"];

export default function FeaturedEvents() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);

  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user);

  const eventsData = useGetEventsQuery();
  console.log(eventsData )

 if (eventsData.data?.events) {
  eventsData.data.events.forEach((event) => {
    if (!categories.includes(event.category)) {
      categories.push(event.category);
    }
  });
}

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const handleBook = (event: EventType) => {
    console.log(user.token)

    if (user.token) {
      setSelectedEvent(event); // Show modal
    } else {
      navigate("/login"); // Redirect to login
    }
  };

 const filteredEvents =
  selectedCategory === "All"
    ? eventsData.data?.events ?? []
    : (eventsData.data?.events ?? []).filter(
        (event) => event.category === selectedCategory
      );


  return (
    <section className="bg-gradient-to-r from-pink-50 to-yellow-50 py-10 px-6">
      <h2 className="text-4xl font-bold text-center text-rose-700 font-circus mb-8">
        🎟️ Featured Events
      </h2>

      {/* Toggle Button */}
      <div className="mb-4 text-center">
        <button
          className="bg-red-500 text-white px-4 py-2 rounded"
          onClick={toggleSidebar}
        >
          {isSidebarOpen ? "Close Categories" : "Open Categories"}
        </button>
      </div>

      <div className="flex gap-6">
        {/* Sidebar */}
        <EventSidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          categories={categories}
          selected={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        {/* Event Cards */}
        <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        >
        {filteredEvents.map((event) => (
        <EventCard
        key={event.eventId}
        {...event}
        handleBook={() => handleBook(event)}
        />
        ))}
</motion.div>
      </div>

      {/* Event Modal */}
      {selectedEvent && (
  <EventModal
    event={selectedEvent}
    eventId={selectedEvent.eventId}
    ticketPrice={selectedEvent.ticketPrice}
    closeModal={() => setSelectedEvent(null)}
  />
)}
    </section>
  );
}
