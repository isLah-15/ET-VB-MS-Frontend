import { useState } from "react";
import { toast } from "sonner";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

import { eventAPI, type TEvent } from "../../../../Features/Events/EventAPI";
import CreateEvent from "./CreateEvents";
import UpdateEvent from "./UpdateEvents";
import DeleteEvent from "./DeleteEvents";

const Events = () => {
  const { data: eventsData, isLoading, error, refetch } = eventAPI.useGetEventsQuery(undefined, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 60000,
  });

  const [selectedEvent, setSelectedEvent] = useState<TEvent | null>(null);
  const [eventToDelete, setEventToDelete] = useState<TEvent | null>(null);

  const [deleteEventById, { isLoading: isDeleting }] = eventAPI.useDeleteEventByIdMutation();
  const [updateEventById, { isLoading: isUpdating }] = eventAPI.useUpdateEventByIdMutation();

  console.log("555555", deleteEventById);
  // Edit handler
  const handleEdit = (event: TEvent) => {
    setSelectedEvent(event);
    (document.getElementById("update_event_modal") as HTMLDialogElement)?.showModal();
  };

const handleDelete = (event: TEvent) => {
    console.log("wwwwww")
    setEventToDelete(event);
     (document.getElementById("delete_event_modal") as HTMLDialogElement)?.showModal();
  };

  // Update event handler
  const handleUpdateEvent = async (updatedEvent: Partial<TEvent>) => {
    if (!selectedEvent) return;
    try {
      const response = await updateEventById({
        eventId: selectedEvent.eventId,
        updatedEvent,
      }).unwrap();

      toast.success(`✅ Updated event: ${response.eventName}`);
      (document.getElementById("update_event_modal") as HTMLDialogElement)?.close();
      setSelectedEvent(null);
      refetch();
    } catch (error) {
      console.error(error);
      toast.error("❌ Failed to update event.");
    }
  };

  // Delete event handler
  const handleDeleteEvent = async () => {

    if (!eventToDelete) return;

    console.log("44444", eventToDelete.eventId)
    try {
      await deleteEventById(eventToDelete.eventId ).unwrap();
      toast.success(`🗑 Deleted event: ${eventToDelete.eventName}`);
      (document.getElementById("delete_event_modal") as HTMLDialogElement)?.close();
      setEventToDelete(null);
      refetch();
    } catch (error) {
      console.error(error);
      toast.error("❌ Failed to delete event.");
    }
  };

  return (
    <div className="text-white font-sans">

      {/* Create Event Button */}
      <div className="flex justify-center my-4">
        <button
          className="px-5 py-2 text-sm font-medium tracking-wide bg-neutral-200 text-black rounded border border-neutral-400 hover:bg-white hover:scale-105 transition-transform"
          onClick={() =>
            (document.getElementById("create_event_modal") as HTMLDialogElement)?.showModal()
          }
        >
          Create Event
        </button>
      </div>

      {/* Modals */}
      <CreateEvent />
      <UpdateEvent event={selectedEvent} onUpdate={handleUpdateEvent} isUpdating={isUpdating} />
      <DeleteEvent event={eventToDelete} onDelete={handleDeleteEvent} isDeleting={isDeleting} />

      {/* Status Messages */}
      {isLoading && (
        <p className="italic text-neutral-400 text-center animate-pulse tracking-wide">
          Loading events...
        </p>
      )}
      {error && (
        <p className="text-red-500 font-medium bg-neutral-800 p-3 rounded-md border border-red-700 text-center">
          ⚠️ Error fetching events.
        </p>
      )}

      {/* Event Table */}
      {eventsData?.events?.length > 0 ? (
        <div className="overflow-x-auto border border-neutral-700 rounded-xl bg-neutral-900 p-4 shadow-sm">
          <table className="table-auto w-full text-sm lg:text-base text-white">
            <thead>
              <tr className="bg-neutral-800 text-neutral-300 uppercase text-xs tracking-wider border-b border-neutral-700">
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Category</th>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-left">Time</th>
                <th className="px-4 py-3 text-left">Venue</th>
                <th className="px-4 py-3 text-left">Price</th>
                <th className="px-4 py-3 text-left">Available</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {eventsData.events.map((event: TEvent) => (
                <tr
                  key={event.eventId}
                  className="hover:bg-neutral-800 border-b border-neutral-700 transition-colors"
                >
                  <td className="px-4 py-2 border-r border-neutral-800">{event.eventName}</td>
                  <td className="px-4 py-2 border-r border-neutral-800">{event.category}</td>
                  <td className="px-4 py-2 border-r border-neutral-800">
                    {new Date(event.eventDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 border-r border-neutral-800">
                    {event.startTime} - {event.endTime}
                  </td>
                  <td className="px-4 py-2 border-r border-neutral-800">{event.venueId}</td>
                  <td className="px-4 py-2 border-r border-neutral-800">${event.ticketPrice}</td>
                  <td className="px-4 py-2 border-r border-neutral-800">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium tracking-wide ${
                        event.isActive ? "bg-green-600 text-white" : "bg-yellow-500 text-black"
                      }`}
                    >
                      {event.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-4 py-2 flex space-x-2">
                    <button
                      className="p-2 rounded bg-neutral-200 text-black border border-neutral-400 hover:bg-white hover:scale-105 transition-transform"
                      onClick={() => handleEdit(event)}
                    >
                      <FaEdit size={16} />
                    </button>
                    <button
                      className="p-2 rounded bg-red-700 text-white border border-red-500 hover:bg-red-600 hover:scale-105 transition-transform"
                      onClick={() => handleDelete(event)}
                    >
                      <MdDeleteForever size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="italic text-neutral-400 text-center tracking-wide">
          No events found.
        </p>
      )}
    </div>
  );
};

export default Events;
