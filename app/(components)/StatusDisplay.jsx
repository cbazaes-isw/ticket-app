const StatusDisplay = ({ status }) => {
  const map = {
    "not started": "bg-red-200",
    started: "bg-yellow-200",
    done: "bg-green-200",
    default: "bg-slate-200",
  };

  const color = map[status] || map["default"];

  return (
    <span
      className={`inline-block rounded-full px-2 py-1 text-xs font-semibold text-gray-700 ${color}`}
    >
      {status}
    </span>
  );
};

export default StatusDisplay;
