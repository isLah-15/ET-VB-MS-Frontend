import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "sonner";
import { eventAPI } from "../../../../Features/Events/EventAPI";


type CreateEventInputs = {
  eventName: string;
  venueId: number;
  category: string;
  eventDate: string;
  startTime: string;
  endTime: string;
  description: string;
  ticketPrice: number;
  ticketsTotal: number;
  ticketsAvailable: number;
  imageUrl: string;
  isActive: boolean;
};

const schema = yup.object({
  eventName: yup.string().max(100).required("Event name is required"),
  venueId: yup.number().required("Venue ID is required"),
  category: yup.string().required("Category is required"),
  eventDate: yup.string().required("Event date is required"),
  startTime: yup.string().required("Start time is required"),
  endTime: yup.string().required("End time is required"),
  description: yup.string().max(1000).required("Description is required"),
  ticketPrice: yup.number().required("Ticket price is required").min(0),
  ticketsTotal: yup.number().required("Total tickets required").min(1),
  ticketsAvailable: yup.number().required("Available tickets required").min(0),
  imageUrl: yup.string().url("Must be a valid URL").required("Image URL is required"),
  isActive: yup.boolean().default(true),
});

const CreateEvent = () => {
  const [createEvent, { isLoading }] = eventAPI.useCreateEventMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateEventInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<CreateEventInputs> = async (data) => {
    try {
      await createEvent(data).unwrap();
      toast.success("Event created successfully!");
      reset();
      (document.getElementById("create_event_modal") as HTMLDialogElement)?.close();
    } catch (error) {
      console.error("Error creating event:", error);
      toast.error("Failed to create event. Please try again.");
    }
  };

  return (
    <dialog id="create_event_modal" className="modal sm:modal-middle">
      <div className="modal-box bg-gray-600 text-white w-full max-w-xs sm:max-w-2xl mx-auto rounded-lg">
        <h3 className="font-bold text-lg mb-4">Create New Event</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">

          <input {...register("eventName")} placeholder="Event Name" className="input text-lg p-2 bg-white text-black rounded" />
          {errors.eventName && <span className="text-sm text-red-500">{errors.eventName.message}</span>}

          <input type="number" {...register("venueId")} placeholder="Venue ID" className="input text-lg p-2 bg-white text-black rounded" />
          {errors.venueId && <span className="text-sm text-red-500">{errors.venueId.message}</span>}

          <input {...register("category")} placeholder="Category" className="input text-lg p-2 bg-white text-black rounded" />
          {errors.category && <span className="text-sm text-red-500">{errors.category.message}</span>}

          <input type="date" {...register("eventDate")} className="input text-lg p-2 bg-white text-black rounded" />
          {errors.eventDate && <span className="text-sm text-red-500">{errors.eventDate.message}</span>}

          <input type="time" {...register("startTime")} placeholder="Start Time" className="input text-lg p-2 bg-white text-black rounded" />
          {errors.startTime && <span className="text-sm text-red-500">{errors.startTime.message}</span>}

          <input type="time" {...register("endTime")} placeholder="End Time" className="input text-lg p-2 bg-white text-black rounded" />
          {errors.endTime && <span className="text-sm text-red-500">{errors.endTime.message}</span>}

          <textarea {...register("description")} placeholder="Event Description" className="textarea bg-white text-black rounded" />
          {errors.description && <span className="text-sm text-red-500">{errors.description.message}</span>}

          <input type="number" {...register("ticketPrice")} placeholder="Ticket Price" className="input text-lg p-2 bg-white text-black rounded" />
          {errors.ticketPrice && <span className="text-sm text-red-500">{errors.ticketPrice.message}</span>}

          <input type="number" {...register("ticketsTotal")} placeholder="Total Tickets" className="input text-lg p-2 bg-white text-black rounded" />
          {errors.ticketsTotal && <span className="text-sm text-red-500">{errors.ticketsTotal.message}</span>}

          <input type="number" {...register("ticketsAvailable")} placeholder="Available Tickets" className="input text-lg p-2 bg-white text-black rounded" />
          {errors.ticketsAvailable && <span className="text-sm text-red-500">{errors.ticketsAvailable.message}</span>}

          <input {...register("imageUrl")} placeholder="Image URL" className="input text-lg p-2 bg-white text-black rounded" />
          {errors.imageUrl && <span className="text-sm text-red-500">{errors.imageUrl.message}</span>}

          <label className="label cursor-pointer">
            <span className="label-text text-white mr-3">Active</span>
            <input type="checkbox" {...register("isActive")} className="checkbox checkbox-primary" defaultChecked />
          </label>

          <div className="modal-action">
            <button type="submit" className="btn btn-primary" disabled={isLoading}>
              {isLoading ? (
                <>
                  <span className="loading loading-spinner text-primary" /> Creating...
                </>
              ) : "Create"}
            </button>
            <button
              className="btn"
              type="button"
              onClick={() => (document.getElementById("create_event_modal") as HTMLDialogElement)?.close()}
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default CreateEvent;
