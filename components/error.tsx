
interface ErrorProps {
  hideModal: () => void;
  type: string;
  message: string
}

export default function Error({type, message, hideModal}: ErrorProps) {
  return (
    <div className="fixed inset-0 z-10 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col border border-gray-600 rounded-xl gap-1 py-2 px-4 bg-red-100 max-w-md text-red-700 text-sm">
          <span className="font-semibold">ERROR: {type}</span>
          <div className="flex flex-col border-t border-gray-400 items-center justify-between gap-4 pt-4 pb-2">

          <span>{message}</span>
          <button className="bg-red-600 px-4 py-1 rounded-md text-slate-100" onClick={() => hideModal()}>Close</button>
          </div>
        </div>
      </div>
    </div>
  )
}