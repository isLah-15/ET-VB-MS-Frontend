import { X } from "lucide-react";

interface EventSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCategory: (category: string) => void;
  categories: string[];
  selected: string;
}

export default function EventSidebar({
  isOpen,
  onClose,
  onSelectCategory,
  categories,
  selected,
}: EventSidebarProps) {
  if (!isOpen) return null; // Don't render sidebar at all if closed

  return (
    <div className="fixed inset-0 z-40 flex">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black opacity-30"
        onClick={onClose}
      ></div>

      {/* Sidebar */}
      <div className="relative ml-auto w-64 bg-white shadow-lg z-50">
        <div className="flex justify-between items-center px-4 py-4 border-b">
          <h3 className="text-lg font-bold text-red-600">Filter by Category</h3>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-red-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-4 py-4 space-y-4 max-h-[calc(100vh-80px)] overflow-y-auto">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                onSelectCategory(category);
                onClose();
              }}
              className={`block w-full text-left px-4 py-2 rounded-md font-medium ${
                selected === category
                  ? "bg-yellow-300 text-red-700"
                  : "bg-yellow-100 hover:bg-yellow-200 text-gray-800"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
