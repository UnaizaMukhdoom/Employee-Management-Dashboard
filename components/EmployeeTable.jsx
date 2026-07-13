export default function EmployeeTable({ employees, onViewDetails }) {
  if (employees.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-8 text-center text-gray-500">
        No employees found.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left border-b border-gray-200 text-gray-500 text-xs uppercase">
            <th className="px-4 py-3">ID</th>
            <th className="px-4 py-3">Employee</th>
            <th className="px-4 py-3">Email</th>
            <th className="px-4 py-3">Phone</th>
            <th className="px-4 py-3">Company</th>
            <th className="px-4 py-3">City</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => {
            const isActive = emp.id % 3 !== 0;
            return (
              <tr key={emp.id} className="border-b border-gray-100 last:border-0">
                <td className="px-4 py-3">{emp.id}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <img
                      src={`https://ui-avatars.com/api/?name=${encodeURIComponent(emp.name)}&size=32`}
                      alt={emp.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="font-medium text-gray-900">{emp.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-600">{emp.email}</td>
                <td className="px-4 py-3 text-gray-600">{emp.phone}</td>
                <td className="px-4 py-3 text-gray-600">{emp.company.name}</td>
                <td className="px-4 py-3 text-gray-600">{emp.address.city}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {isActive ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="px-4 py-3">
                <button
        onClick={() => onViewDetails(emp)}
              className="px-3 py-1.5 border border-blue-600 text-blue-600 rounded-md text-xs font-medium hover:bg-blue-50">
        View Details
                 </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}