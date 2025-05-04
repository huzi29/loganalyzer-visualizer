const Filters = ({ onChange }) => {
  return (
    <div className="flex flex-col p-2 sm:flex-row gap-4 bg-white shadow-md rounded-xl w-full max-w-2xl mx-auto">
      <div className="w-full sm:w-1/2">
        <label className="block mb-1 text-sm font-medium text-gray-700">Log Level</label>
        <select
          onChange={e => onChange({ level: e.target.value })}
          className="w-full p-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Levels</option>
          <option value="INFO">INFO</option>
          <option value="WARN">WARN</option>
          <option value="ERROR">ERROR</option>
        </select>
      </div>

      <div className="w-full sm:w-1/2">
        <label className="block mb-1 text-sm font-medium text-gray-700">Service</label>
        <select
          onChange={e => onChange({ service: e.target.value })}
          className="w-full p-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Services</option>
          <option value="auth">Auth</option>
          <option value="payments">Payments</option>
          <option value="notifications">Notifications</option>
        </select>
      </div>
    </div>
  );
}

export default Filters;