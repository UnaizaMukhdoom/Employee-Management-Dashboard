const navItems = [
  { label: "Dashboard", active: true },
  { label: "Employees" },
  { label: "Departments" },
  { label: "Companies" },
  { label: "Reports" },
  { label: "Settings" }
];

// The dark background that appears behind the sidebar on mobile
function MobileOverlay({ onClose }) {
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/40 z-40 md:hidden"
    />
  );
}

// The "Employee Hub" title + close button at the top
function SidebarHeader({ onClose }) {
  return (
    <div className="flex items-center justify-between mb-8 px-2">
      <span className="text-white font-semibold text-lg">Employee Hub</span>
      <button onClick={onClose} className="md:hidden text-gray-400 hover:text-white">
        ✕
      </button>
    </div>
  );
}

// One clickable item in the nav list (e.g. "Dashboard", "Employees")
function NavButton({ item }) {
  let buttonStyle;
  if (item.active) {
    buttonStyle = "bg-blue-600 text-white";
  } else {
    buttonStyle = "text-gray-300 hover:bg-gray-800";
  }

  return (
    <button className={`w-full text-left px-3 py-2 rounded-md text-sm ${buttonStyle}`}>
      {item.label}
    </button>
  );
}

// The "Manage your team" box at the bottom
function TeamCard() {
  return (
    <div className="bg-gray-800 rounded-lg p-4 text-sm text-gray-300">
      <p className="mb-2">Manage your team — add, remove, and update employee details.</p>
      <button className="w-full bg-blue-600 text-white rounded-md py-2 text-sm hover:bg-blue-700">
        Add Employee
      </button>
    </div>
  );
}

function Sidebar({ isOpen, onClose }) {
  // Decide the sidebar's slide position based on isOpen
  let slidePosition;
  if (isOpen) {
    slidePosition = "translate-x-0";
  } else {
    slidePosition = "-translate-x-full";
  }

  return (
    <>
      {isOpen && <MobileOverlay onClose={onClose} />}

      <aside
        className={`fixed md:static top-0 left-0 h-screen w-56 bg-gray-900 text-gray-300 p-4 flex flex-col z-50 transform transition-transform duration-200 ${slidePosition} md:translate-x-0`}
      >
        <SidebarHeader onClose={onClose} />

        <nav className="flex-1 space-y-1">
          {navItems.map((item) => (
            <NavButton key={item.label} item={item} />
          ))}
        </nav>

        <TeamCard />
      </aside>
    </>
  );
}

export default Sidebar;