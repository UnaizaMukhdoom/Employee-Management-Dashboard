import { Users, Building2, MapPin, Briefcase } from "lucide-react";

function DashboardCards({ employees }) {
  //total employees
  const totalEmployees = employees.length;

  //different companies
  const uniqueCompanies = new Set(employees.map((emp) => emp.company.name));
  const totalCompanies = uniqueCompanies.size;

  //different cities 
  const uniqueCities = new Set(employees.map((emp) => emp.address.city));
  const totalCities = uniqueCities.size;

  // employees are "active"
  const activeEmployeesList = employees.filter((emp) => emp.id % 3 !== 0);
  const activeEmployees = activeEmployeesList.length;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <Card
        label="Total Employees"
        value={totalEmployees}
        icon={<Users size={20} />}
        color="bg-purple-100 text-purple-600"
      />
      <Card
        label="Total Companies"
        value={totalCompanies}
        icon={<Building2 size={20} />}
        color="bg-blue-100 text-blue-600"
      />
      <Card
        label="Total Cities"
        value={totalCities}
        icon={<MapPin size={20} />}
        color="bg-green-100 text-green-600"
      />
      <Card
        label="Active Employees"
        value={activeEmployees}
        icon={<Briefcase size={20} />}
        color="bg-orange-100 text-orange-600"
      />
    </div>
  );
}

function Card({ label, value, icon, color }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-3">
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color}`}>
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-2xl font-semibold">{value}</p>
      </div>
    </div>
  );
}

export default DashboardCards;