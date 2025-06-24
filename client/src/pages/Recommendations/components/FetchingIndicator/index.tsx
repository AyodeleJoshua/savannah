import { IoMdCloseCircleOutline } from "react-icons/io";

export default function FetchingIndicator() {
  return (
    <div
      data-testid="loading-more-indicator"
      className="max-w-[200px] rounded-md bg-gray-200 p-4 text-2xl font-bold text-center fixed bottom-[10px] right-[45%] flex items-center justify-center gap-2 border-2 border-gray-300"
    >
      <p>Fetching...</p> <IoMdCloseCircleOutline size={20} />
    </div>
  );
}
