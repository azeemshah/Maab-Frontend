export enum MessageType {
  ERROR = "error",
  WARNING = "warning",
  INFO = "info",
  SUCCESS = "success",
}
export const Message: React.FC<{
  type: MessageType;
  message: string[] | string;
  onClose?: () => void;
}> = ({ type, message, onClose }) => {
  const getColorClasses = () => {
    switch (type) {
      case MessageType.ERROR:
        return "bg-red-100 text-red-700 border-red-400";
      case MessageType.WARNING:
        return "bg-yellow-100 text-yellow-700 border-yellow-400";
      case MessageType.INFO:
        return "bg-blue-100 text-blue-700 border-blue-400";
      case MessageType.SUCCESS:
        return "bg-green-100 text-green-700 border-green-400";
      default:
        return "";
    }
  };

  return (
    <div
      className={`border-l-4 p-4 mb-4 flex items-center justify-between ${getColorClasses()}`}
      role="alert"
    >
      {Array.isArray(message) ? (
        <ul className="list-disc list-inside">
          {message.map((msg, index) => (
            <li key={index}>{msg}</li>
          ))}
        </ul>
      ) : (
        <p>{message}</p>
      )}
      {onClose && (
        <button
          onClick={onClose}
          className="text-lg font-bold leading-none"
          aria-label="Close"
        >
          &times;
        </button>
      )}
    </div>
  );
};
