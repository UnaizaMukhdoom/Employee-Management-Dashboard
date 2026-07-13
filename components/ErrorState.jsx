function ErrorState({ message, onRetry }) {
  // Only show the "Try Again" button if a retry function was actually given
  const hasRetryButton = Boolean(onRetry);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-3 text-center px-4">
      <p className="text-red-600 font-medium">Something went wrong.</p>
      <p className="text-gray-500 text-sm">{message}</p>

      {hasRetryButton && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
        >
          Try Again
        </button>
      )}
    </div>
  );
}

export default ErrorState;