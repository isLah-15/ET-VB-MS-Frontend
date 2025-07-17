interface EventCardProps {
  eventName: string;
  eventDate: string;
  category: string;
  description: string;
  ticketPrice: number;
  imageUrl: string;
  tag?: string;
}

export default function EventCard({
  eventName,
  eventDate,
  category,
  description,
  ticketPrice,
  imageUrl,
  tag,
}: EventCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 max-w-sm">
      <div className="relative">
        <img
          src={imageUrl}
          alt={eventName}
          className="w-full h-48 object-cover"
        />
        {tag && (
          <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full shadow-md">
            {tag}
          </span>
        )}
      </div>

      <div className="p-4 space-y-2">
        <h3 className="text-xl font-bold text-gray-800">{eventName}</h3>
        <p className="text-sm text-gray-500">{eventDate} • {category}</p>
        <p className="text-gray-700 text-sm">{description}</p>

        <div className="flex justify-between items-center mt-4">
          <span className="text-lg font-bold text-red-600">Ksh {ticketPrice}</span>
          <button className="bg-yellow-400 text-black px-4 py-2 rounded-full hover:bg-yellow-300 transition-colors text-sm font-semibold">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}
