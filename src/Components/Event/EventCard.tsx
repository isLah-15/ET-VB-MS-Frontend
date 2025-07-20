interface EventCardProps {
  eventName: string;
  eventDate: string;
  category: string;
  description: string;
  ticketPrice: number;
  imageUrl: string;
  tag?: string;
  handleBook?: () => void;
}

export default function EventCard({
  eventName,
  eventDate,
  category,
  description,
  ticketPrice,
  imageUrl,
  tag,
  handleBook,
}: EventCardProps) {
  return (
    <div className="bg-zinc-950 border-4 border-yellow-400 rounded-2xl shadow-circus overflow-hidden hover:shadow-amber-500/50 transition-shadow duration-300 max-w-sm font-circus">
      <div className="relative">
        <img
          src={imageUrl}
          alt={eventName}
          className="w-full h-48 object-cover border-b-4 border-yellow-500"
        />
        {tag && (
          <span className="absolute top-2 right-2 bg-red-700 text-white text-xs px-2 py-1 rounded-full shadow-md uppercase tracking-wider">
            {tag}
          </span>
        )}
      </div>

      <div className="p-4 space-y-3 text-yellow-100">
        <h3 className="text-2xl font-bold tracking-wide text-amber-300">{eventName}</h3>
        <p className="text-sm text-yellow-300">{eventDate} • {category}</p>
        <p className="text-yellow-200 text-sm">{description}</p>

        <div className="flex justify-between items-center mt-4">
          <span className="text-lg font-extrabold text-red-500 drop-shadow-glow">Ksh {ticketPrice}</span>
          <button
            onClick={handleBook}
            className="bg-gradient-to-r from-yellow-400 to-red-500 text-black px-4 py-2 rounded-full hover:from-red-500 hover:to-yellow-400 transition-colors text-sm font-bold uppercase shadow-lg"
          >
            🎟️ Book Now
          </button>
        </div>
      </div>
    </div>
  );
}
